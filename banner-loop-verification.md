# Seamless Banner Loop Verification

- Desktop preview: the fixed bottom banner is visible across the viewport and shows repeated “اطلاق تجريبي” labels without content overlap.
- Mobile preview (390 × 844): the banner remains fixed, readable, and does not obscure the primary page content.
- Automated verification: `pnpm test` passed with 19 tests across 5 test files, including the persistent-banner component test.
