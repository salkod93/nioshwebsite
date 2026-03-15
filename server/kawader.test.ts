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

const sampleInput = {
  certificationPath: "Practitioner" as const,
  fullNameAr: "محمد أحمد",
  fullNameEn: "Mohammed Ahmed",
  dob: "1990-01-15",
  nationalId: "1234567890",
  nationality: "Saudi",
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
  oshCerts: "NEBOSH IGC – 2020\nNFPA Fire Safety – 2021",
  documents: {
    nationalId: sampleDoc,
    passport: sampleDoc,
    academicDegree: sampleDoc,
    transcript: sampleDoc,
    equivalency: sampleDoc,
    employmentLetter: sampleDoc,
    jobDescription: sampleDoc,
    gosi: sampleDoc,
    cv: sampleDoc,
    oshCertificates: sampleDoc,
  },
};

/**
 * Build a mock fieldKeys map that returns a predictable key for every label.
 * The key is derived from the label so we can assert on it in tests.
 */
function buildMockFieldKeys(): Record<string, string> {
  const labels = [
    "Kawader: Reference Number",
    "Kawader: Full Name (Arabic)",
    "Kawader: Date of Birth",
    "Kawader: National ID / Iqama",
    "Kawader: Nationality",
    "Kawader: Years of Experience",
    "Kawader: Certification Path",
    "Kawader: OSH Certificates",
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
    mockedAxios.get = vi.fn().mockImplementation((url: string) => {
      if (url.includes("/dealFields")) {
        const fields = Object.entries(mockFieldKeys).map(([name, key]) => ({ name, key }));
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

  it("uploads all 10 documents to S3 and returns success with a reference number", async () => {
    const { storagePut } = await import("./storage");
    const caller = appRouter.createCaller(createCtx());

    const result = await caller.kawader.submitAccreditation(sampleInput);

    expect(result.success).toBe(true);
    expect(result.refNumber).toMatch(/^KWD-\d{4}-\d{5}$/);
    expect(storagePut).toHaveBeenCalledTimes(10);
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

  it("creates a deal with core custom fields", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.kawader.submitAccreditation(sampleInput);

    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;
    const dealCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/deals") && !c[0].includes("Fields")
    );
    expect(dealCall).toBeDefined();

    const dealBody = dealCall![1];
    expect(dealBody.title).toContain("Mohammed Ahmed");
    expect(dealBody.title).toContain("Practitioner");
    expect(dealBody.title).toContain(result.refNumber);
    expect(dealBody.status).toBe("open");
    expect(dealBody.person_id).toBeDefined();
  });

  it("maps academic slot 1 fields individually onto the deal payload", async () => {
    const caller = appRouter.createCaller(createCtx());
    await caller.kawader.submitAccreditation(sampleInput);

    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;
    const dealCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/deals") && !c[0].includes("Fields")
    );
    expect(dealCall).toBeDefined();
    const dealBody = dealCall![1];

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
