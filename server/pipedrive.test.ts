import { describe, it, expect } from "vitest";
import axios from "axios";

describe("Pipedrive API credentials", () => {
  it("should successfully connect to Pipedrive API with provided credentials", async () => {
    const apiKey = process.env.PIPEDRIVE_API_KEY;
    const rawDomain = process.env.PIPEDRIVE_COMPANY_DOMAIN ?? "";

    expect(apiKey, "PIPEDRIVE_API_KEY must be set").toBeTruthy();
    expect(rawDomain, "PIPEDRIVE_COMPANY_DOMAIN must be set").toBeTruthy();

    // Support both full URL (https://company.pipedrive.com) and subdomain-only (company)
    const baseUrl = rawDomain.startsWith("http")
      ? rawDomain.replace(/\/$/, "")
      : `https://${rawDomain}.pipedrive.com`;

    // Use the standard api.pipedrive.com endpoint to avoid subdomain SSL issues
    const response = await axios.get(
      `https://api.pipedrive.com/v1/users/me`,
      {
        params: { api_token: apiKey },
        validateStatus: (status) => status < 500,
      }
    );

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data).toBeDefined();
  });
});
