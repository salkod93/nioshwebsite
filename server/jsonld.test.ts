import { describe, it, expect } from "vitest";
import {
  organizationSchema,
  webSiteSchema,
  homePageSchema,
  boardOfDirectorsPageSchema,
  kawaderPageSchema,
  vcoshAppSchema,
  vcoshPageSchema,
} from "../client/src/lib/jsonLdSchemas";

describe("JSON-LD Schemas", () => {
  it("organizationSchema has required fields", () => {
    expect(organizationSchema["@context"]).toBe("https://schema.org");
    expect(organizationSchema["@type"]).toBe("GovernmentOrganization");
    expect(organizationSchema.name).toContain("NIOSH");
    expect(organizationSchema.url).toBe("https://niosh.sa");
    expect(organizationSchema.logo).toBeDefined();
    expect(organizationSchema.logo.url).toContain("http");
    expect(organizationSchema.address).toBeDefined();
    expect(organizationSchema.address.addressCountry).toBe("SA");
    expect(organizationSchema.contactPoint).toHaveLength(1);
    expect(organizationSchema.contactPoint[0].email).toBe("info@niosh.sa");
    expect(organizationSchema.foundingDate).toBe("2024");
    expect(organizationSchema.parentOrganization).toBeDefined();
    expect(organizationSchema.parentOrganization.name).toContain("NCOSH");
  });

  it("webSiteSchema has required fields", () => {
    expect(webSiteSchema["@context"]).toBe("https://schema.org");
    expect(webSiteSchema["@type"]).toBe("WebSite");
    expect(webSiteSchema.name).toContain("NIOSH");
    expect(webSiteSchema.url).toBe("https://niosh.sa");
    expect(webSiteSchema.inLanguage).toContain("ar");
    expect(webSiteSchema.inLanguage).toContain("en");
    expect(webSiteSchema.publisher).toBeDefined();
  });

  it("homePageSchema has required fields", () => {
    expect(homePageSchema["@context"]).toBe("https://schema.org");
    expect(homePageSchema["@type"]).toBe("WebPage");
    expect(homePageSchema.url).toBe("https://niosh.sa");
    expect(homePageSchema.isPartOf).toBeDefined();
    expect(homePageSchema.about).toBeDefined();
  });

  it("boardOfDirectorsPageSchema has required fields", () => {
    expect(boardOfDirectorsPageSchema["@context"]).toBe("https://schema.org");
    expect(boardOfDirectorsPageSchema["@type"]).toBe("WebPage");
    expect(boardOfDirectorsPageSchema.url).toContain("/board-of-directors");
    expect(boardOfDirectorsPageSchema.name).toContain("Board of Directors");
    expect(boardOfDirectorsPageSchema.isPartOf).toBeDefined();
  });

  it("kawaderPageSchema has required fields", () => {
    expect(kawaderPageSchema["@context"]).toBe("https://schema.org");
    expect(kawaderPageSchema["@type"]).toBe("WebPage");
    expect(kawaderPageSchema.url).toContain("/kawader");
    expect(kawaderPageSchema.name).toContain("Kawader");
    expect(kawaderPageSchema.isPartOf).toBeDefined();
  });

  it("vcoshAppSchema has required SoftwareApplication fields", () => {
    expect(vcoshAppSchema["@context"]).toBe("https://schema.org");
    expect(vcoshAppSchema["@type"]).toBe("SoftwareApplication");
    expect(vcoshAppSchema.name).toContain("VCOSH");
    expect(vcoshAppSchema.applicationCategory).toBe("HealthApplication");
    expect(vcoshAppSchema.operatingSystem).toContain("iOS");
    expect(vcoshAppSchema.operatingSystem).toContain("Android");
    expect(vcoshAppSchema.offers).toBeDefined();
    expect(vcoshAppSchema.offers.price).toBe("0");
    expect(vcoshAppSchema.installUrl).toHaveLength(2);
    expect(vcoshAppSchema.inLanguage).toContain("ar");
    expect(vcoshAppSchema.inLanguage).toContain("en");
    expect(vcoshAppSchema.creator).toBeDefined();
  });

  it("vcoshPageSchema has required fields", () => {
    expect(vcoshPageSchema["@context"]).toBe("https://schema.org");
    expect(vcoshPageSchema["@type"]).toBe("WebPage");
    expect(vcoshPageSchema.url).toContain("/vcosh");
    expect(vcoshPageSchema.about).toBeDefined();
    expect(vcoshPageSchema.isPartOf).toBeDefined();
  });

  it("all schemas produce valid JSON", () => {
    const schemas = [
      organizationSchema,
      webSiteSchema,
      homePageSchema,
      boardOfDirectorsPageSchema,
      kawaderPageSchema,
      vcoshAppSchema,
      vcoshPageSchema,
    ];
    for (const schema of schemas) {
      const json = JSON.stringify(schema);
      expect(() => JSON.parse(json)).not.toThrow();
      const parsed = JSON.parse(json);
      expect(parsed["@context"]).toBe("https://schema.org");
    }
  });

  it("all @id references are consistent", () => {
    // WebSite publisher references Organization
    expect(webSiteSchema.publisher["@id"]).toBe(organizationSchema["@id"]);
    // HomePage isPartOf references WebSite
    expect(homePageSchema.isPartOf["@id"]).toBe(webSiteSchema["@id"]);
    // HomePage about references Organization
    expect(homePageSchema.about["@id"]).toBe(organizationSchema["@id"]);
    // VCOSH app creator references Organization
    expect(vcoshAppSchema.creator["@id"]).toBe(organizationSchema["@id"]);
    // VCOSH page about references VCOSH app
    expect(vcoshPageSchema.about["@id"]).toBe(vcoshAppSchema["@id"]);
  });
});
