import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PersistentLaunchBanner } from "./PersistentLaunchBanner";

describe("PersistentLaunchBanner", () => {
  it("renders the Arabic experimental-launch label in a persistent banner", () => {
    const markup = renderToStaticMarkup(<PersistentLaunchBanner />);

    expect(markup).toContain("اطلاق تجريبي");
    expect(markup).toContain("launch-banner");
    expect(markup).toContain('aria-live="polite"');
  });
});
