# all-might-ui

Reusable React + TypeScript component library, publish-ready for npm consumption.

## Install

```bash
npm install all-might-ui
```

## Usage

```tsx
import { Button, Card, ThemeProvider } from "all-might-ui";
import "all-might-ui/styles.css";

export function App() {
  return (
    <ThemeProvider>
      <Card title="Demo">
        <Button variant="primary">Save</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## Theme usage

```tsx
import { ThemeProvider, ThemeSwitcher } from "all-might-ui";

export function ThemedDemo() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
```

`ThemeSwitcher` provides light/dark mode and editable palette fields (`primary`, `secondary`, `accent`, `surface`, `text`, `muted`) with local persistence.

## Public contract

- Main entry: `all-might-ui`
- Styles entry: `all-might-ui/styles.css`
- ESM: `dist/index.js`
- CJS: `dist/index.cjs`
- Types: `dist/types/lib/index.d.ts`

## Bundler compatibility

Works with common React bundlers (Vite, Webpack, Next.js, etc.) as long as styles are imported once.

## Maintainer pre-publish checklist

1. Ensure clean workspace for release branch.
2. Run validations:
   - `bun run lint` (or `pnpm exec eslint .`)
   - `bun run test` (or `pnpm exec vitest run`)
   - `bun run build:lib` (or `pnpm exec tsc -b && pnpm exec vite build --mode library && pnpm exec tsc -p tsconfig.lib.json`)
3. Inspect build artifacts in `dist/`.
4. Run `npm pack --dry-run`.
5. (Optional) Install tarball in a throwaway React app and smoke test imports.
6. Publish later with explicit version + auth approval (`npm publish --access public`).

## Development

- Playground app routes live in `src/pages/*`.
- NPM entrypoint is `src/lib/index.ts` only.
- Keep React and ReactDOM as peer dependencies.
