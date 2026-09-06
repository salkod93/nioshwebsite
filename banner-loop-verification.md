# Seamless Banner Loop Verification

- Desktop preview: the fixed bottom banner is visible across the viewport and shows repeated “اطلاق تجريبي” labels without content overlap.
- Mobile preview (390 × 844): the banner remains fixed, readable, and does not obscure the primary page content.
- Automated verification: `pnpm test` passed with 19 tests across 5 test files, including the persistent-banner component test.

## Final Wording Verification

The revised banner has no dash separator after each label. In Arabic mode it shows “اطلاق تجريبي”; after switching the live preview to English, it showed “Soft Launch”. The updated test suite passed with 20 tests across 5 test files.
