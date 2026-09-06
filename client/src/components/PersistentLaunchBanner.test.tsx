import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PersistentLaunchBanner } from "./PersistentLaunchBanner";

describe("PersistentLaunchBanner", () => {
  it("renders the Arabic experimental-launch label in a persistent banner", () => {
    const markup = renderToStaticMarkup(<PersistentLaunchBanner langOverride="ar" />);

    expect(markup).toContain("اطلاق تجريبي");
    expect(markup).toContain("launch-banner");
    expect(markup.match(/launch-banner-group/g)).toHaveLength(2);
    expect(markup).toContain('aria-live="polite"');
  });

  it("uses the English experimental-launch label in English mode", () => {
    const markup = renderToStaticMarkup(<PersistentLaunchBanner langOverride="en" />);

    expect(markup).toContain("Soft Launch");
    expect(markup).not.toContain("اطلاق تجريبي");
    expect(markup).not.toContain("—");
    expect(markup).toContain('dir="ltr"');
  });
});
