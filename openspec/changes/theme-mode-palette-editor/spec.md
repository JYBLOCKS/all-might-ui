# Spec: User-controlled light/dark theme + palette editor

## Acceptance criteria
1. Default `ThemeSwitcher` renders mode select and color pickers for: `primary`, `secondary`, `accent`, `surface`, `text`, `muted`.
2. Default `ThemeSwitcher` does not require or render preset theme-name selection UI.
3. `ThemeProvider` persists and restores theme state (mode + palette) via `localStorage`.
4. Invalid/unavailable storage never crashes; provider falls back to safe internal values.
5. Changing mode updates `document.documentElement.dataset.themeMode`, `document.body.dataset.themeMode`, and `color-scheme`.
6. Changing a palette field updates corresponding `--vx-*` CSS variable.
7. Existing exports remain stable.

## Validation evidence slots
- [ ] Theme tests pass (`src/__tests__/theme.test.tsx`).
- [ ] Lint/build command output captured.
- [ ] Manual verification notes for CSS variable application.
