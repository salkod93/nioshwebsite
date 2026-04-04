import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

// Mock storagePut
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({
    url: "https://cdn.example.com/kawader/cv/test.pdf",
    key: "kawader/cv/test.pdf",
  }),
}));

// Mock axios
vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

// Set env vars
process.env.PIPEDRIVE_API_KEY = "test-api-key";
process.env.PIPEDRIVE_COMPANY_DOMAIN = "testcompany";

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const sampleDoc = {
  base64: Buffer.from("test-content").toString("base64"),
  fileName: "test.pdf",
  mimeType: "application/pdf",
};

const sampleOshCert = {
  name: "NEBOSH IGC",
  issuingBody: "NEBOSH",
  validity: "2025-12-31",
  file: sampleDoc,
};

const sampleInput = {
  certificationPath: "Practitioner" as const,
  commLang: "Arabic" as const,
  idType: "saudi_national" as const,
  fullNameAr: "محمد أحمد",
  fullNameEn: "Mohammed Ahmed",
  dob: "1990-01-15",
  nationalId: "1234567890",
  iqamaId: "",
  passportNumber: "",
  nationality: "",
  phone: "+966501234567",
  email: "mohammed.ahmed@example.com",
  experience: "5",
  academics: [
    {
      institution: "King Saud University",
      address: "Riyadh, Saudi Arabia",
      degreeTitle: "BSc Occupational Safety",
      enrollmentDate: "2008-09-01",
      graduationDate: "2012-06-30",
      educationLevel: "Bachelor's",
      country: "Saudi Arabia",
      city: "Riyadh",
    },
  ],
  oshCerts: [sampleOshCert],
  documents: {
    nationalId: sampleDoc,
    iqamaId: null,
    passport: null,
    academicDegree: sampleDoc,
    academicRecord: sampleDoc,
    equivalency: sampleDoc,
    employmentLetter: sampleDoc,
    gosi: sampleDoc,
    cv: sampleDoc,
  },
};

/**
 * Build a mock fieldKeys map that returns a predictable key for every label.
 * The key is derived from the label so we can assert on it in tests.
 */
function buildMockFieldKeys(): Record<string, string> {
  const labels = [
    "Kawader: Preferred Communication Language",
    "Kawader: Reference Number",
    "Kawader: Full Name (Arabic)",
    "Kawader: Date of Birth",
    "Kawader: ID Type",
    "Kawader: National ID",
    "Kawader: Iqama ID",
    "Kawader: Passport Number",
    "Kawader: Nationality",
    "Kawader: Years of Experience",
    "Kawader: Certification Path",
    "Kawader: Uploaded Documents",
    // Academic slot 1
    "Kawader: Academic 1 – Institution",
    "Kawader: Academic 1 – Institution Address",
    "Kawader: Academic 1 – Degree Title",
    "Kawader: Academic 1 – Education Level",
    "Kawader: Academic 1 – Enrollment Date",
    "Kawader: Academic 1 – Graduation Date",
    "Kawader: Academic 1 – Country",
    "Kawader: Academic 1 – City",
    // Academic slots 2-5 (empty but keys present)
    ...Array.from({ length: 4 }, (_, i) => {
      const slot = i + 2;
      return [
        `Kawader: Academic ${slot} – Institution`,
        `Kawader: Academic ${slot} – Institution Address`,
        `Kawader: Academic ${slot} – Degree Title`,
        `Kawader: Academic ${slot} – Education Level`,
        `Kawader: Academic ${slot} – Enrollment Date`,
        `Kawader: Academic ${slot} – Graduation Date`,
        `Kawader: Academic ${slot} – Country`,
        `Kawader: Academic ${slot} – City`,
      ];
    }).flat(),
    // OSH cert slot 1
    "Kawader: OSH Cert 1 – Name",
    "Kawader: OSH Cert 1 – Issuing Body",
    "Kawader: OSH Cert 1 – Validity",
    "Kawader: OSH Cert 1 – File URL",
  ];
  const map: Record<string, string> = {};
  for (const label of labels) {
    // Use a simplified key: lowercase letters and numbers only
    map[label] = label.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 40);
  }
  return map;
}

describe("kawader.submitAccreditation", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const mockFieldKeys = buildMockFieldKeys();

    // GET /dealFields – returns all fields as already existing (avoids POST for field creation)
    // Also includes options for enum fields so resolveEnumOptionId works correctly
    mockedAxios.get = vi.fn().mockImplementation((url: string) => {
      if (url.includes("/dealFields")) {
        const fields = Object.entries(mockFieldKeys).map(([name, key]) => {
          const enumOptions: Record<string, Array<{ id: number; label: string }>> = {
            [mockFieldKeys["Kawader: Certification Path"]]: [
              { id: 1, label: "Practitioner" },
              { id: 2, label: "Professional" },
            ],
            [mockFieldKeys["Kawader: Preferred Communication Language"]]: [
              { id: 10, label: "Arabic" },
              { id: 11, label: "English" },
            ],
            [mockFieldKeys["Kawader: ID Type"]]: [
              { id: 20, label: "Saudi National" },
              { id: 21, label: "Saudi Resident" },
              { id: 22, label: "International" },
            ],
          };
          return { name, key, options: enumOptions[key] ?? undefined };
        });
        return Promise.resolve({ data: { data: fields } });
      }
      if (url.includes("/persons/search")) {
        return Promise.resolve({ data: { data: { items: [] } } });
      }
      return Promise.resolve({ data: { data: [] } });
    });

    // POST: person create + deal create
    mockedAxios.post = vi.fn().mockResolvedValue({
      data: { data: { id: 999, key: "new_key" } },
    });
  });

  it("uploads documents to S3 and returns success with a reference number", async () => {
    const { storagePut } = await import("./storage");
    const caller = appRouter.createCaller(createCtx());

    const result = await caller.kawader.submitAccreditation(sampleInput);

    expect(result.success).toBe(true);
    expect(result.refNumber).toMatch(/^KWD-\d{4}-\d{5}$/);
    // 7 non-null docs + 1 OSH cert file = 8 uploads
    expect(storagePut).toHaveBeenCalledTimes(8);
  });

  it("creates a person with email and phone", async () => {
    const caller = appRouter.createCaller(createCtx());
    await caller.kawader.submitAccreditation(sampleInput);

    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;
    const personCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/persons")
    );
    expect(personCall).toBeDefined();
    expect(personCall![1].name).toBe("Mohammed Ahmed");
    expect(personCall![1].email[0].value).toBe("mohammed.ahmed@example.com");
    expect(personCall![1].phone[0].value).toBe("+966501234567");
  });

  it("creates a lead (not a deal) with core custom fields", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.kawader.submitAccreditation(sampleInput);

    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;

    // Must POST to /leads, not /deals
    const leadCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/leads") && !c[0].includes("Fields")
    );
    expect(leadCall).toBeDefined();

    // Must NOT have posted to /deals
    const dealCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/deals") && !c[0].includes("Fields")
    );
    expect(dealCall).toBeUndefined();

    const leadBody = leadCall![1];
    expect(leadBody.title).toContain("Mohammed Ahmed");
    expect(leadBody.title).toContain("Practitioner");
    expect(leadBody.title).toContain(result.refNumber);
    // Leads do not have a status field (unlike deals)
    expect(leadBody.status).toBeUndefined();
    expect(leadBody.person_id).toBeDefined();
    // Preferred communication language should be mapped as a resolved enum option ID
    const fk = buildMockFieldKeys();
    const commLangKey = fk["Kawader: Preferred Communication Language"];
    // Arabic resolves to option ID 10 in the mock
    expect(leadBody[commLangKey]).toBe(10);
  });

  it("maps OSH cert slot 1 fields onto the lead payload", async () => {
    const caller = appRouter.createCaller(createCtx());
    await caller.kawader.submitAccreditation(sampleInput);
    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;
    const leadCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/leads") && !c[0].includes("Fields")
    );
    expect(leadCall).toBeDefined();
    const leadBody = leadCall![1];
    const mockFieldKeys = buildMockFieldKeys();
    expect(leadBody[mockFieldKeys["Kawader: OSH Cert 1 – Name"]]).toBe("NEBOSH IGC");
    expect(leadBody[mockFieldKeys["Kawader: OSH Cert 1 – Issuing Body"]]).toBe("NEBOSH");
    expect(leadBody[mockFieldKeys["Kawader: OSH Cert 1 – Validity"]]).toBe("2025-12-31");
  });

  it("maps ID type field onto the lead payload", async () => {
    const caller = appRouter.createCaller(createCtx());
    await caller.kawader.submitAccreditation(sampleInput);
    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;
    const leadCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/leads") && !c[0].includes("Fields")
    );
    expect(leadCall).toBeDefined();
    const leadBody = leadCall![1];
    const mockFieldKeys = buildMockFieldKeys();
    // Saudi National resolves to option ID 20 in the mock
    expect(leadBody[mockFieldKeys["Kawader: ID Type"]]).toBe(20);
  });

  it("maps academic slot 1 fields individually onto the lead payload", async () => {
    const caller = appRouter.createCaller(createCtx());
    await caller.kawader.submitAccreditation(sampleInput);

    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;
    const leadCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/leads") && !c[0].includes("Fields")
    );
    expect(leadCall).toBeDefined();
    const dealBody = leadCall![1];

    const mockFieldKeys = buildMockFieldKeys();

    // Each sub-field should appear as a separate key on the deal payload
    expect(dealBody[mockFieldKeys["Kawader: Academic 1 – Institution"]]).toBe("King Saud University");
    expect(dealBody[mockFieldKeys["Kawader: Academic 1 – Institution Address"]]).toBe("Riyadh, Saudi Arabia");
    expect(dealBody[mockFieldKeys["Kawader: Academic 1 – Degree Title"]]).toBe("BSc Occupational Safety");
    expect(dealBody[mockFieldKeys["Kawader: Academic 1 – Education Level"]]).toBe("Bachelor's");
    expect(dealBody[mockFieldKeys["Kawader: Academic 1 – Enrollment Date"]]).toBe("2008-09-01");
    expect(dealBody[mockFieldKeys["Kawader: Academic 1 – Graduation Date"]]).toBe("2012-06-30");
    expect(dealBody[mockFieldKeys["Kawader: Academic 1 – Country"]]).toBe("Saudi Arabia");
    expect(dealBody[mockFieldKeys["Kawader: Academic 1 – City"]]).toBe("Riyadh");
  });

  it("reuses existing person found by email", async () => {
    mockedAxios.get = vi.fn().mockImplementation((url: string) => {
      if (url.includes("/dealFields")) {
        const mockFieldKeys = buildMockFieldKeys();
        const fields = Object.entries(mockFieldKeys).map(([name, key]) => ({ name, key }));
        return Promise.resolve({ data: { data: fields } });
      }
      if (url.includes("/persons/search")) {
        return Promise.resolve({ data: { data: { items: [{ item: { id: 777 } }] } } });
      }
      return Promise.resolve({ data: { data: [] } });
    });

    mockedAxios.put = vi.fn().mockResolvedValue({ data: { data: { id: 777 } } });
    mockedAxios.post = vi.fn().mockResolvedValue({ data: { data: { id: 888, key: "xyz" } } });

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.kawader.submitAccreditation(sampleInput);

    expect(result.success).toBe(true);

    // No POST to /persons (existing person reused)
    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;
    const personCreateCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/persons")
    );
    expect(personCreateCall).toBeUndefined();

    // PUT called to update existing person
    expect(mockedAxios.put).toHaveBeenCalled();
    const putCall = (mockedAxios.put as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(putCall[0]).toContain("/persons/777");
  });
});
