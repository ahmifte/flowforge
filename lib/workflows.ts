import { z } from "zod";

// A workflow is a named, validated automation: a set of typed inputs plus a
// function that turns those inputs into a system prompt and a user prompt.
// Adding a new automation is just adding an entry to the WORKFLOWS array.

export type WorkflowField = {
  name: string;
  label: string;
  type: "text" | "textarea";
  placeholder?: string;
  required?: boolean;
};

export type Workflow = {
  id: string;
  name: string;
  description: string;
  // Short note on what data this workflow is meant to operate on. flowforge is
  // deliberately scoped to data the user already owns or is licensed to use —
  // it never scrapes sites that prohibit automated access.
  inputNote: string;
  fields: WorkflowField[];
  system: string;
  buildPrompt: (input: Record<string, string>) => string;
};

export const WORKFLOWS: Workflow[] = [
  {
    id: "content-generator",
    name: "Content Generator",
    description:
      "Turn a topic and a few notes into a structured first draft you can edit.",
    inputNote: "Operates only on the topic and notes you provide.",
    fields: [
      {
        name: "topic",
        label: "Topic",
        type: "text",
        placeholder: "e.g. How RAG reduces support load",
        required: true,
      },
      {
        name: "audience",
        label: "Audience",
        type: "text",
        placeholder: "e.g. e-commerce founders",
      },
      {
        name: "notes",
        label: "Key points / notes",
        type: "textarea",
        placeholder: "Bullet points you want the draft to cover",
      },
    ],
    system:
      "You are a senior content writer. Produce clear, well-structured drafts with a short intro, scannable sections, and a concise takeaway. Avoid hype and filler.",
    buildPrompt: (input) =>
      `Write a first draft about: ${input.topic}\n\nAudience: ${
        input.audience || "general"
      }\n\nKey points to cover:\n${input.notes || "(none provided)"}`,
  },
  {
    id: "email-drafter",
    name: "Cold Email Drafter",
    description:
      "Draft a concise, compliant outreach email from your offer and a prospect description.",
    inputNote:
      "Uses only the prospect description you paste. Always add a real unsubscribe and your address before sending (CAN-SPAM).",
    fields: [
      {
        name: "offer",
        label: "What you offer",
        type: "textarea",
        placeholder: "e.g. I build AI support assistants for Shopify stores",
        required: true,
      },
      {
        name: "prospect",
        label: "Prospect description",
        type: "textarea",
        placeholder: "Company, role, and any relevant context you already have",
        required: true,
      },
    ],
    system:
      "You write short, specific, non-spammy B2B outreach emails. Lead with a concrete observation or value, keep it under 120 words, one clear ask, no fake personalization. Remind the user to include an unsubscribe and physical address.",
    buildPrompt: (input) =>
      `My offer:\n${input.offer}\n\nProspect:\n${input.prospect}\n\nDraft one outreach email plus two follow-up lines.`,
  },
  {
    id: "lead-enricher",
    name: "Lead List Summarizer",
    description:
      "Paste a list of leads you already own and get a clean, prioritized summary.",
    inputNote:
      "Operates ONLY on data you paste (lists you already own or are licensed to use). flowforge does not scrape third-party sites.",
    fields: [
      {
        name: "criteria",
        label: "Prioritization criteria",
        type: "text",
        placeholder: "e.g. closest fit to e-commerce + 10-50 employees",
        required: true,
      },
      {
        name: "leads",
        label: "Your lead data (paste rows)",
        type: "textarea",
        placeholder: "Company, contact, notes — one per line",
        required: true,
      },
    ],
    system:
      "You are a sales operations analyst. Given a pasted list the user owns, normalize it, then rank entries against the stated criteria with a one-line rationale each. Never invent data that is not present.",
    buildPrompt: (input) =>
      `Prioritization criteria: ${input.criteria}\n\nLeads (user-owned data):\n${input.leads}\n\nReturn a ranked, cleaned summary.`,
  },
];

export function getWorkflow(id: string): Workflow | undefined {
  return WORKFLOWS.find((w) => w.id === id);
}

// Build a validation schema from a workflow's field definitions.
export function schemaForWorkflow(workflow: Workflow) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of workflow.fields) {
    shape[field.name] = field.required
      ? z.string().min(1, `${field.label} is required`)
      : z.string().optional().default("");
  }
  return z.object(shape);
}
