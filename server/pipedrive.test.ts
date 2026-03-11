import { describe, it, expect, vi } from "vitest";
import axios from "axios";

// Mock axios so no live network calls are made
vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

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

describe("Pipedrive contact form integration", () => {
  it("creates a Pipedrive person and deal when contact form is submitted", async () => {
    // Mock: no existing person found
    mockedAxios.get = vi.fn().mockResolvedValue({ data: { data: { items: [] } } });
    // Mock: person creation, deal creation, note creation
    mockedAxios.post = vi.fn()
      .mockResolvedValueOnce({ data: { data: { id: 42 } } })   // create person
      .mockResolvedValueOnce({ data: { data: { id: 99 } } })   // create deal
      .mockResolvedValueOnce({ data: { success: true } });     // add note

    const caller = appRouter.createCaller(createCtx());
    const result = await caller.pipedrive.submitContact({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      message: "Hello from the contact form",
      companyName: "Test Company",
    });

    expect(result.success).toBe(true);
    expect(mockedAxios.post).toHaveBeenCalledTimes(3);

    // Verify deal title contains the name
    const dealCall = (mockedAxios.post as ReturnType<typeof vi.fn>).mock.calls[1];
    expect(dealCall[1].title).toContain("Test User");
  });
});
