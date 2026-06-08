# Contributing

Contributions are welcome — especially new workflows.

## Getting set up

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Adding a workflow

A workflow is a single entry in [`lib/workflows.ts`](lib/workflows.ts): an id, a name, a description, typed input fields, a system prompt, and a `buildPrompt` function. Keep workflows scoped to user-provided data — no scraping or ToS-violating sources.

## Before opening a pull request

- Run `pnpm lint` and `pnpm typecheck`.
- Keep pull requests focused.
- Open an issue first for larger changes.
