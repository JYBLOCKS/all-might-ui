# Change Proposal: User-controlled light/dark theme + palette editor

## User story
As a component-library user, I can choose light or dark mode and edit the theme palette with color pickers, so demos/components render with my selected colors and survive reloads.

## Problem
Current switcher still exposes preset theme-name selection in the default UI and does not persist full mode/palette safely across reloads.

## Decisions
- Keep public API stable: `ThemeProvider`, `ThemeSwitcher`, `useTheme`, `ThemePalette`, `ThemeProviderProps`, `ThemeSwitcherProps`.
- Default `ThemeSwitcher` UI exposes mode select + editable palette fields only.
- Persist mode + palette in `localStorage` with safe fallback on missing storage/invalid JSON.
- Keep internal fallback tokens for first render and invalid saved state.
