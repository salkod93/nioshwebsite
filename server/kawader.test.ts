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

    // Mock person search (no existing person)
    mockedAxios.get = vi.fn().mockResolvedValue({ data: { data: { items: [] } } });

    // Mock person creation
    mockedAxios.post = vi.fn()
      .mockResolvedValueOnce({ data: { data: { id: 101 } } }) // create person
      .mockResolvedValueOnce({ data: { data: { id: 201 } } }) // create deal
      .mockResolvedValueOnce({ data: { success: true } });    // add note
  });

  it("uploads all 10 documents to S3 and creates a Pipedrive person, deal, and note", async () => {
    const { storagePut } = await import("./storage");
    const caller = appRouter.createCaller(createCtx());

    const result = await caller.kawader.submitAccreditation(sampleInput);

    expect(result.success).toBe(true);

    // All 10 documents should be uploaded
    expect(storagePut).toHaveBeenCalledTimes(10);

    // Person search + person creation + deal creation + note creation = 4 calls
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledTimes(3);

    // Verify deal title contains name and path
    const dealCall = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls[1];
    expect(dealCall[1].title).toContain("Mohammed Ahmed");
    expect(dealCall[1].title).toContain("Practitioner");

    // Verify note contains all key info
    const noteCall = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls[2];
    expect(noteCall[1].content).toContain("محمد أحمد");
    expect(noteCall[1].content).toContain("NEBOSH IGC");
    expect(noteCall[1].content).toContain("King Saud University");
    expect(noteCall[1].content).toContain("cdn.example.com");
  });

  it("reuses existing Pipedrive person if found", async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({
      data: { data: { items: [{ item: { id: 999 } }] } },
    });
    mockedAxios.post = vi.fn()
      .mockResolvedValueOnce({ data: { data: { id: 201 } } }) // deal
      .mockResolvedValueOnce({ data: { success: true } });    // note

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.kawader.submitAccreditation(sampleInput);

    expect(result.success).toBe(true);
    // Should NOT create a new person (only deal + note = 2 POST calls)
    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    const dealCall = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(dealCall[1].person_id).toBe(999);
  });
});
