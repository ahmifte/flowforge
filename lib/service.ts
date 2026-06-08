import { env } from "@/lib/env";

// Single source of truth for the productized "done-for-you" service sold on top
// of flowforge. Edit prices, packages, and copy here — the sales page renders
// straight from this file.

export type ServicePackage = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  bestFor: string;
  features: string[];
  highlighted?: boolean;
};

export const PACKAGES: ServicePackage[] = [
  {
    id: "launch",
    name: "Launch",
    price: "$2,500",
    cadence: "one-time",
    tagline: "One automation, built and deployed.",
    bestFor: "A single, painful manual process you want gone this month.",
    features: [
      "1 production AI workflow (e.g. support triage, content drafting, lead summaries)",
      "Connected to your inputs and tools",
      "Deployed to your infrastructure — you own it",
      "Loom walkthrough + written handover docs",
      "2 weeks of post-launch fixes",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: "$6,000",
    cadence: "one-time",
    tagline: "A suite of automations or a full RAG assistant.",
    bestFor: "Teams ready to automate several workflows or ship an AI feature.",
    features: [
      "Up to 4 AI workflows, or one retrieval-augmented (RAG) assistant",
      "Data ingestion + retrieval pipeline with quality checks",
      "Deployed, monitored, and documented",
      "Team training session",
      "30 days of post-launch support",
    ],
    highlighted: true,
  },
  {
    id: "partner",
    name: "Embedded AI Partner",
    price: "from $1,500",
    cadence: "/mo",
    tagline: "Ongoing automation as your fractional AI team.",
    bestFor: "Companies that want a steady stream of new automations and upkeep.",
    features: [
      "New workflows shipped every month",
      "Monitoring, iteration, and prompt/quality tuning",
      "Priority turnaround on requests",
      "Monthly strategy call",
      "Cancel anytime",
    ],
  },
];

export const PROCESS = [
  {
    step: "1",
    title: "Free discovery call",
    detail:
      "We map your workflows and find the one with the highest, fastest ROI.",
  },
  {
    step: "2",
    title: "Fixed-scope proposal",
    detail:
      "You get a clear deliverable, price, and timeline in writing — no open-ended hourly surprises.",
  },
  {
    step: "3",
    title: "Build & deploy",
    detail:
      "I build, test, and ship it to your infrastructure. Most projects land in 1–2 weeks.",
  },
  {
    step: "4",
    title: "Handover & support",
    detail:
      "Docs, a walkthrough, and training. Continue with a retainer only if it pays for itself.",
  },
];

export const OUTCOMES = [
  {
    title: "Stop paying for copy-paste",
    detail:
      "Automate the repetitive work your team does by hand — triage, drafting, summarizing, tagging.",
  },
  {
    title: "Ship AI without hiring an AI team",
    detail:
      "Get a production-grade automation or assistant without a full-time ML hire or a 6-month build.",
  },
  {
    title: "Own everything",
    detail:
      "Runs on your infrastructure with your API keys. No lock-in, no per-seat tax, no markup on usage.",
  },
];

export const FAQ = [
  {
    q: "Whose OpenAI key is used?",
    a: "Yours. You own the keys and pay the provider directly at cost — I never mark up usage or resell access.",
  },
  {
    q: "Is my data used to train models?",
    a: "No. Automations run only on the data you provide, and nothing is used for training.",
  },
  {
    q: "What happens after launch?",
    a: "You get docs and a walkthrough so your team can run it. Need ongoing work? The retainer covers new workflows and upkeep.",
  },
  {
    q: "Do we sign a contract?",
    a: "Always. Every project starts with a simple Statement of Work covering scope, price, timeline, and IP ownership.",
  },
];

// Resolve the primary CTA: a booking link if configured, otherwise a mailto.
export function getBookingHref(): string {
  if (env.NEXT_PUBLIC_BOOKING_URL) return env.NEXT_PUBLIC_BOOKING_URL;
  const email = env.NEXT_PUBLIC_CONTACT_EMAIL ?? "you@example.com";
  const subject = encodeURIComponent("AI automation project");
  return `mailto:${email}?subject=${subject}`;
}
