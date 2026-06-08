# flowforge

[![CI](https://github.com/ahmifte/flowforge/actions/workflows/ci.yml/badge.svg)](https://github.com/ahmifte/flowforge/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)

A self-hostable, production-ready AI workflow automation runner with live streaming output, built on the [Vercel AI SDK](https://sdk.vercel.ai). Bring your own OpenAI key — it stays in your browser.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ahmifte/flowforge)

## Why this project?

Small teams lose hours every week to repetitive copy-paste work between tools. flowforge is a zero-config, batteries-included runner for pre-built AI automations: pick a workflow, fill in the inputs, and stream the result. It is intentionally simple to extend — a new automation is one entry in [`lib/workflows.ts`](lib/workflows.ts).

## Built-in workflows

- **Content Generator** — topic + notes to a structured draft
- **Cold Email Drafter** — compliant outreach drafts from your offer and a prospect description
- **Lead List Summarizer** — clean and prioritize a list you already own

## Responsible-use design

flowforge is deliberately scoped to data you provide or already own:

- **No scraping** of third-party sites, no bypassing logins or bot protection.
- Workflows operate only on inputs you paste or upload.
- The email drafter reminds you to include an unsubscribe and physical address (CAN-SPAM) before sending.

## Bring-your-own-key

Your OpenAI key is stored only in your browser (`localStorage`) and sent with each run request via a header. It is never logged or persisted on the server. This keeps your API costs yours and avoids reselling-AI concerns.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional: OPENAI_API_KEY for local dev only
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), add your key under **API key**, and run a workflow.

## Monetization

Two revenue streams from one codebase:

1. **Done-for-you setup** — sell automation setup as a fixed package plus a monthly maintenance retainer. A ready-to-use sales page lives at [`/services`](app/services/page.tsx) with packages, pricing, process, and FAQ, all driven by [`lib/service.ts`](lib/service.ts). Point the **Book a call** buttons at your scheduler with `NEXT_PUBLIC_BOOKING_URL` (or set `NEXT_PUBLIC_CONTACT_EMAIL` for a mailto fallback).
2. **Self-serve SaaS** (optional) — host it, keep the free BYO-key tier, and gate scheduling/history behind a paid tier.

### Selling the service

Edit your packages and copy in [`lib/service.ts`](lib/service.ts), set `NEXT_PUBLIC_BOOKING_URL`, and the live demo on the home page funnels visitors straight to `/services` and a booked call.

## Scripts

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm lint` / `pnpm typecheck`

## License

MIT — see [LICENSE](./LICENSE).
