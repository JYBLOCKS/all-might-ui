# Change Proposal: Make `all-might-ui` publish-ready

## User story
As a consumer developer, I can install `all-might-ui`, import components and styles in common React bundlers, and get working types/runtime without deep imports.

## Problem
Current docs and some build/package settings are inconsistent for package identity and CSS export path.

## Decisions
- Keep package name `all-might-ui`.
- Keep public entrypoint at `src/lib/index.ts` only.
- Align build output + package exports for CSS.
- Preserve ESM/CJS/types outputs and React peer dependencies.
- Update README to consumer-first usage and maintainer pre-publish checklist.
