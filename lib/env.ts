import { z } from "zod";

// flowforge is bring-your-own-key first. The server key is an optional local-dev
// fallback only; in production users supply their own key per request.
const schema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4o-mini"),
  // Public contact details used by the service/sales page. Safe to expose.
  NEXT_PUBLIC_BOOKING_URL: z.string().optional(),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().optional(),
});

export const env = schema.parse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  NEXT_PUBLIC_BOOKING_URL: process.env.NEXT_PUBLIC_BOOKING_URL,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
});
