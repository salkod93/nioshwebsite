import axios from "axios";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";

const PIPEDRIVE_API_BASE = "https://api.pipedrive.com/v1";

// Maximum number of academic qualification slots we pre-create fields for
const MAX_ACADEMICS = 5;

function getPipedriveApiKey(): string {
  const key = process.env.PIPEDRIVE_API_KEY;
  if (!key) throw new Error("PIPEDRIVE_API_KEY is not set");
  return key;
}

// ─── Zod Schemas ──────────────────────────────────────────────────────────────

const documentSchema = z.object({
  base64: z.string(),
  fileName: z.string(),
  mimeType: z.string(),
});

const academicSchema = z.object({
  institution: z.string(),
  address: z.string().optional(),
  degreeTitle: z.string(),
  enrollmentDate: z.string().optional(),
  graduationDate: z.string().optional(),
  educationLevel: z.string(),
  country: z.string(),
  city: z.string(),
});

function generateRefNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `KWD-${year}-${random}`;
}

const submitSchema = z.object({
  certificationPath: z.enum(["Practitioner", "Professional"]),
  commLang: z.enum(["Arabic", "English"]),
  fullNameAr: z.string().min(1),
  fullNameEn: z.string().min(1),
  dob: z.string().min(1),
  nationalId: z.string().min(1),
  nationality: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  experience: z.string().min(1),
  academics: z.array(academicSchema).min(1),
  oshCerts: z.string().optional(),
  documents: z.object({
    nationalId: documentSchema,
    passport: documentSchema,
    academicDegree: documentSchema,
    transcript: documentSchema,
    equivalency: documentSchema,
    employmentLetter: documentSchema,
    jobDescription: documentSchema,
    gosi: documentSchema,
    cv: documentSchema,
    oshCertificates: documentSchema,
  }),
});

// ─── Custom field definitions ─────────────────────────────────────────────────

// Per-academic sub-fields (one set per qualification slot)
const ACADEMIC_SUB_FIELDS: Array<{ suffix: string; field_type: string }> = [
  { suffix: "Institution",       field_type: "varchar" },
  { suffix: "Institution Address", field_type: "varchar" },
  { suffix: "Degree Title",      field_type: "varchar" },
  { suffix: "Education Level",   field_type: "varchar" },
  { suffix: "Enrollment Date",   field_type: "date"    },
  { suffix: "Graduation Date",   field_type: "date"    },
  { suffix: "Country",           field_type: "varchar" },
  { suffix: "City",              field_type: "varchar" },
];

// Core (non-academic) custom fields
const CORE_FIELD_DEFS: Array<{ label: string; field_type: string; options?: readonly string[] }> = [
  { label: "Kawader: Preferred Communication Language", field_type: "enum", options: ["Arabic", "English"] },
  { label: "Kawader: Reference Number",   field_type: "varchar" },
  { label: "Kawader: Full Name (Arabic)", field_type: "varchar" },
  { label: "Kawader: Date of Birth",      field_type: "date"    },
  { label: "Kawader: National ID / Iqama", field_type: "varchar" },
  { label: "Kawader: Nationality",        field_type: "varchar" },
  { label: "Kawader: Years of Experience", field_type: "double"  },
  { label: "Kawader: Certification Path", field_type: "enum",   options: ["Practitioner", "Professional"] },
  { label: "Kawader: OSH Certificates",   field_type: "text"    },
  { label: "Kawader: Uploaded Documents", field_type: "text"    },
];

/** Build the full label for an academic sub-field, e.g. "Kawader: Academic 1 – Institution" */
function academicFieldLabel(index: number, suffix: string): string {
  return `Kawader: Academic ${index} – ${suffix}`;
}

/** Collect all field definitions (core + per-slot academic) */
function allFieldDefs(): Array<{ label: string; field_type: string; options?: readonly string[] }> {
  const defs = [...CORE_FIELD_DEFS];
  for (let i = 1; i <= MAX_ACADEMICS; i++) {
    for (const sub of ACADEMIC_SUB_FIELDS) {
      defs.push({ label: academicFieldLabel(i, sub.suffix), field_type: sub.field_type });
    }
  }
  return defs;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function uploadDoc(
  base64: string,
  fileName: string,
  mimeType: string,
  folder: string
): Promise<string> {
  const buffer = Buffer.from(base64, "base64");
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `kawader/${folder}/${Date.now()}-${safe}`;
  const { url } = await storagePut(key, buffer, mimeType);
  return url;
}

/** Fetch all existing deal fields and return label → key map */
async function fetchDealFieldKeys(apiKey: string): Promise<Record<string, string>> {
  const res = await axios.get(`${PIPEDRIVE_API_BASE}/dealFields`, {
    params: { api_token: apiKey, limit: 500 },
  });
  const fields: Array<{ name: string; key: string }> = res.data?.data ?? [];
  const map: Record<string, string> = {};
  for (const f of fields) map[f.name] = f.key;
  return map;
}

/**
 * Ensure all Kawader custom deal fields exist in Pipedrive.
 * Creates any that are missing. Returns label → field key map.
 */
async function ensureCustomDealFields(apiKey: string): Promise<Record<string, string>> {
  const existing = await fetchDealFieldKeys(apiKey);
  const result: Record<string, string> = { ...existing };

  for (const def of allFieldDefs()) {
    if (existing[def.label]) continue; // already exists
    const body: Record<string, unknown> = {
      name: def.label,
      field_type: def.field_type,
    };
    if (def.options) {
      body.options = def.options.map((o) => ({ label: o }));
    }
    try {
      const res = await axios.post(`${PIPEDRIVE_API_BASE}/dealFields`, body, {
        params: { api_token: apiKey },
      });
      const created = res.data?.data;
      if (created?.key) result[def.label] = created.key;
    } catch (err) {
      console.error(`[Kawader] Failed to create deal field "${def.label}":`, err);
    }
  }

  return result;
}

/** For enum fields, resolve the option label to its numeric ID */
async function resolveEnumOptionId(
  fieldKey: string,
  optionLabel: string,
  apiKey: string
): Promise<number | null> {
  try {
    const res = await axios.get(`${PIPEDRIVE_API_BASE}/dealFields`, {
      params: { api_token: apiKey, limit: 500 },
    });
    const fields: Array<{ key: string; options?: Array<{ id: number; label: string }> }> =
      res.data?.data ?? [];
    const field = fields.find((f) => f.key === fieldKey);
    const option = field?.options?.find(
      (o) => o.label.toLowerCase() === optionLabel.toLowerCase()
    );
    return option?.id ?? null;
  } catch {
    return null;
  }
}

async function findPersonByEmail(email: string, apiKey: string): Promise<number | null> {
  try {
    const res = await axios.get(`${PIPEDRIVE_API_BASE}/persons/search`, {
      params: { term: email, fields: "email", exact_match: true, api_token: apiKey },
    });
    const items = res.data?.data?.items ?? [];
    return items.length > 0 ? items[0].item.id : null;
  } catch {
    return null;
  }
}

async function createOrFindPerson(
  fullNameEn: string,
  email: string,
  phone: string,
  apiKey: string
): Promise<number> {
  const existing = await findPersonByEmail(email, apiKey);
  if (existing) {
    await axios
      .put(
        `${PIPEDRIVE_API_BASE}/persons/${existing}`,
        {
          name: fullNameEn,
          email: [{ value: email, primary: true }],
          phone: [{ value: phone, primary: true }],
        },
        { params: { api_token: apiKey } }
      )
      .catch(() => {/* non-critical */});
    return existing;
  }
  const res = await axios.post(
    `${PIPEDRIVE_API_BASE}/persons`,
    {
      name: fullNameEn,
      email: [{ value: email, primary: true }],
      phone: [{ value: phone, primary: true }],
    },
    { params: { api_token: apiKey } }
  );
  return res.data.data.id;
}

async function createDeal(
  data: z.infer<typeof submitSchema>,
  docUrls: Record<string, string>,
  personId: number,
  apiKey: string,
  refNumber: string,
  fieldKeys: Record<string, string>
): Promise<number | null> {
  // Build uploaded documents text
  const docText = Object.entries(docUrls)
    .map(([k, url]) => `${k}: ${url}`)
    .join("\n");

  // Resolve enum option ID for certification path
  const certPathKey = fieldKeys["Kawader: Certification Path"];
  let certPathValue: number | string = data.certificationPath;
  if (certPathKey) {
    const optionId = await resolveEnumOptionId(certPathKey, data.certificationPath, apiKey);
    if (optionId !== null) certPathValue = optionId;
  }

  // Resolve enum option ID for preferred communication language
  const commLangKey = fieldKeys["Kawader: Preferred Communication Language"];
  let commLangValue: number | string = data.commLang;
  if (commLangKey) {
    const optionId = await resolveEnumOptionId(commLangKey, data.commLang, apiKey);
    if (optionId !== null) commLangValue = optionId;
  }

  // Build deal payload
  const dealPayload: Record<string, unknown> = {
    title: `[${refNumber}] Kawader Application – ${data.fullNameEn} (${data.certificationPath})`,
    status: "open",
    person_id: personId,
  };

  // ── Core custom fields ──
  const coreFieldMappings: Array<[string, unknown]> = [
    ["Kawader: Preferred Communication Language", commLangValue],
    ["Kawader: Reference Number",    refNumber],
    ["Kawader: Full Name (Arabic)",  data.fullNameAr],
    ["Kawader: Date of Birth",       data.dob],
    ["Kawader: National ID / Iqama", data.nationalId],
    ["Kawader: Nationality",         data.nationality],
    ["Kawader: Years of Experience", Number(data.experience)],
    ["Kawader: Certification Path",  certPathValue],
    ["Kawader: OSH Certificates",    data.oshCerts ?? ""],
    ["Kawader: Uploaded Documents",  docText],
  ];

  for (const [label, value] of coreFieldMappings) {
    const key = fieldKeys[label];
    if (key) dealPayload[key] = value;
  }

  // ── Per-field academic custom fields ──
  data.academics.forEach((acad, idx) => {
    const slot = idx + 1; // 1-based
    if (slot > MAX_ACADEMICS) return; // ignore beyond max

    const subFieldMappings: Array<[string, unknown]> = [
      ["Institution",         acad.institution],
      ["Institution Address", acad.address ?? ""],
      ["Degree Title",        acad.degreeTitle],
      ["Education Level",     acad.educationLevel],
      ["Enrollment Date",     acad.enrollmentDate ?? ""],
      ["Graduation Date",     acad.graduationDate ?? ""],
      ["Country",             acad.country],
      ["City",                acad.city],
    ];

    for (const [suffix, value] of subFieldMappings) {
      const label = academicFieldLabel(slot, suffix);
      const key = fieldKeys[label];
      if (key) dealPayload[key] = value;
    }
  });

  const dealRes = await axios.post(
    `${PIPEDRIVE_API_BASE}/deals`,
    dealPayload,
    { params: { api_token: apiKey } }
  );

  return dealRes.data?.data?.id ?? null;
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const kawaderRouter = router({
  submitAccreditation: publicProcedure
    .input(submitSchema)
    .mutation(async ({ input }) => {
      const apiKey = getPipedriveApiKey();

      // 1. Upload all documents to S3
      const docUrls: Record<string, string> = {};
      const docEntries = Object.entries(input.documents) as [
        keyof typeof input.documents,
        { base64: string; fileName: string; mimeType: string }
      ][];

      for (const [key, doc] of docEntries) {
        try {
          docUrls[key] = await uploadDoc(doc.base64, doc.fileName, doc.mimeType, key);
        } catch (err) {
          console.error(`[Kawader] Failed to upload ${key}:`, err);
          throw new Error(`Failed to upload document: ${key}`);
        }
      }

      // 2. Generate unique reference number
      const refNumber = generateRefNumber();

      // 3. Ensure all custom deal fields exist in Pipedrive
      let fieldKeys: Record<string, string> = {};
      try {
        fieldKeys = await ensureCustomDealFields(apiKey);
      } catch (err) {
        console.error("[Kawader] Failed to ensure custom fields:", err);
      }

      // 4. Find or create person with email + phone
      const personId = await createOrFindPerson(
        input.fullNameEn,
        input.email,
        input.phone,
        apiKey
      );

      // 5. Create deal with all mapped fields
      try {
        await createDeal(input, docUrls, personId, apiKey, refNumber, fieldKeys);
      } catch (err) {
        console.error("[Kawader] Pipedrive deal creation error:", err);
        // Don't fail the submission if Pipedrive is temporarily down
      }

      return { success: true, refNumber };
    }),
});
