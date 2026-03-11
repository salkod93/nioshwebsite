import axios from "axios";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";

const PIPEDRIVE_API_BASE = "https://api.pipedrive.com/v1";

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
  const random = Math.floor(10000 + Math.random() * 90000); // 5-digit
  return `KWD-${year}-${random}`;
}

const submitSchema = z.object({
  certificationPath: z.enum(["Practitioner", "Professional"]),
  fullNameAr: z.string().min(1),
  fullNameEn: z.string().min(1),
  dob: z.string().min(1),
  nationalId: z.string().min(1),
  nationality: z.string().min(1),
  phone: z.string().min(1),
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

async function findPersonByName(name: string, apiKey: string): Promise<number | null> {
  try {
    const res = await axios.get(`${PIPEDRIVE_API_BASE}/persons/search`, {
      params: { term: name, fields: "name", exact_match: false, api_token: apiKey },
    });
    const items = res.data?.data?.items ?? [];
    return items.length > 0 ? items[0].item.id : null;
  } catch {
    return null;
  }
}

async function createOrFindPerson(fullNameEn: string, apiKey: string): Promise<number> {
  const existing = await findPersonByName(fullNameEn, apiKey);
  if (existing) return existing;
  const res = await axios.post(
    `${PIPEDRIVE_API_BASE}/persons`,
    { name: fullNameEn },
    { params: { api_token: apiKey } }
  );
  return res.data.data.id;
}

async function createDealWithNote(
  data: z.infer<typeof submitSchema>,
  docUrls: Record<string, string>,
  personId: number,
  apiKey: string,
  refNumber: string
): Promise<void> {
  // Build note
  const academicLines = data.academics
    .map(
      (a, i) =>
        `  Qualification ${i + 1}: ${a.degreeTitle} — ${a.institution} (${a.educationLevel}), ${a.country}, ${a.city}` +
        (a.graduationDate ? ` | Graduated: ${a.graduationDate}` : "")
    )
    .join("\n");

  const docLines = Object.entries(docUrls)
    .map(([k, url]) => `  ${k}: ${url}`)
    .join("\n");

  const noteContent = [
    `=== KAWADER ACCREDITATION APPLICATION ===`,
    `Reference Number: ${refNumber}`,
    `Certification Path: ${data.certificationPath}`,
    ``,
    `--- Personal Information ---`,
    `Full Name (AR): ${data.fullNameAr}`,
    `Full Name (EN): ${data.fullNameEn}`,
    `Date of Birth: ${data.dob}`,
    `National ID / Iqama: ${data.nationalId}`,
    `Nationality: ${data.nationality}`,
    `Phone: ${data.phone}`,
    `Years of Experience: ${data.experience}`,
    ``,
    `--- Academic Qualifications ---`,
    academicLines,
    ``,
    `--- OSH Certificates & Courses ---`,
    data.oshCerts || "Not provided",
    ``,
    `--- Uploaded Documents ---`,
    docLines,
  ].join("\n");

  // Create deal
  const dealRes = await axios.post(
    `${PIPEDRIVE_API_BASE}/deals`,
    {
      title: `[${refNumber}] Kawader Application – ${data.fullNameEn} (${data.certificationPath})`,
      status: "open",
      person_id: personId,
    },
    { params: { api_token: apiKey } }
  );
  const dealId = dealRes.data?.data?.id;

  if (dealId) {
    await axios.post(
      `${PIPEDRIVE_API_BASE}/notes`,
      { content: noteContent, deal_id: dealId },
      { params: { api_token: apiKey } }
    );
  }
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

      // 3. Find or create person in Pipedrive
      const personId = await createOrFindPerson(input.fullNameEn, apiKey);

      // 4. Create deal with full note
      try {
        await createDealWithNote(input, docUrls, personId, apiKey, refNumber);
      } catch (err) {
        console.error("[Kawader] Pipedrive deal creation error:", err);
        // Don't fail the submission if Pipedrive is temporarily down
      }

      return { success: true, refNumber };
    }),
});
