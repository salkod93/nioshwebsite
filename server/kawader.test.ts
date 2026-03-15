import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

// Mock storagePut
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ url: "https://cdn.example.com/kawader/cv/test.pdf", key: "kawader/cv/test.pdf" }),
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

describe("kawader.submitAccreditation", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // GET /dealFields – returns existing fields (empty, so all will be created)
    // GET /persons/search – no existing person
    mockedAxios.get = vi.fn()
      .mockResolvedValueOnce({ data: { data: [] } })          // fetchDealFieldKeys (ensureCustomDealFields)
      .mockResolvedValueOnce({ data: { data: { items: [] } } }) // findPersonByEmail
      .mockResolvedValueOnce({ data: { data: [] } });          // resolveEnumOptionId (GET dealFields again)

    // POST calls: 10 custom field creates + 1 person create + 1 deal create
    mockedAxios.post = vi.fn().mockResolvedValue({ data: { data: { id: 999, key: "abc123" } } });
  });

  it("uploads all 10 documents to S3 and returns success with a reference number", async () => {
    const { storagePut } = await import("./storage");
    const caller = appRouter.createCaller(createCtx());

    const result = await caller.kawader.submitAccreditation(sampleInput);

    expect(result.success).toBe(true);
    expect(result.refNumber).toMatch(/^KWD-\d{4}-\d{5}$/);

    // All 10 documents should be uploaded
    expect(storagePut).toHaveBeenCalledTimes(10);
  });

  it("creates a person with email and phone, then creates a deal", async () => {
    const caller = appRouter.createCaller(createCtx());
    await caller.kawader.submitAccreditation(sampleInput);

    // Find the person creation POST call
    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;
    const personCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/persons")
    );
    expect(personCall).toBeDefined();
    expect(personCall![1].name).toBe("Mohammed Ahmed");
    expect(personCall![1].email[0].value).toBe("mohammed.ahmed@example.com");
    expect(personCall![1].phone[0].value).toBe("+966501234567");
  });

  it("creates a deal with all mapped custom fields", async () => {
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

  it("reuses existing person found by email", async () => {
    mockedAxios.get = vi.fn()
      .mockResolvedValueOnce({ data: { data: [] } })                             // fetchDealFieldKeys
      .mockResolvedValueOnce({ data: { data: { items: [{ item: { id: 777 } }] } } }) // findPersonByEmail → found
      .mockResolvedValueOnce({ data: { data: [] } });                            // resolveEnumOptionId

    // PUT to update existing person + POST for custom fields + POST for deal
    mockedAxios.put = vi.fn().mockResolvedValue({ data: { data: { id: 777 } } });
    mockedAxios.post = vi.fn().mockResolvedValue({ data: { data: { id: 888, key: "xyz" } } });

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.kawader.submitAccreditation(sampleInput);

    expect(result.success).toBe(true);
    // Person should NOT be created (no POST to /persons)
    const postCalls = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls;
    const personCreateCall = postCalls.find(
      (c) => typeof c[0] === "string" && c[0].includes("/persons")
    );
    expect(personCreateCall).toBeUndefined();

    // PUT should have been called to update existing person
    expect(mockedAxios.put).toHaveBeenCalled();
    const putCall = (mockedAxios.put as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(putCall[0]).toContain("/persons/777");
  });
});
