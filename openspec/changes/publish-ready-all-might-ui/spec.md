# Spec: Publish-ready npm package

## Acceptance criteria
1. README uses `all-might-ui` in install/import examples.
2. Vite library global name is aligned to an `AllMightUI` style name.
3. `package.json` `main`/`module`/`types`/`exports` match real build outputs.
4. `./styles.css` export points to the actual built CSS file.
5. `src/lib/index.ts` remains the sole npm entrypoint and does not import `src/pages/*`.
6. React/ReactDOM stay as peer dependencies.
7. Package metadata includes useful discoverability fields.
8. `npm pack --dry-run` succeeds and package contents are limited to intended artifacts.

## Validation evidence slots
- [ ] Build outputs verified (js/cjs/css/types).
- [ ] Lint/tests/build command outputs captured.
- [ ] `npm pack --dry-run` output captured.
