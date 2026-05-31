# Tasks

1. Refactor `src/components/Styles/Theme/index.tsx`
   - Remove default preset selector from `ThemeSwitcher` UI.
   - Add robust localStorage read/write for mode + palette.
   - Keep stable exports/types.
2. Update `src/components/Styles/Theme/Theme.css` only if needed for new layout.
3. Update Home theme demo copy/code only where needed.
4. Expand `src/__tests__/theme.test.tsx` with mode/palette/storage/fallback coverage.
5. Run targeted tests + lint + build equivalents and document known unrelated baseline failures.
