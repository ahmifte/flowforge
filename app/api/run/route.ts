import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";
import { env } from "@/lib/env";
import { getWorkflow, schemaForWorkflow } from "@/lib/workflows";

export const runtime = "edge";

const bodySchema = z.object({
  workflowId: z.string().min(1),
  input: z.record(z.string()),
});

export async function POST(request: Request) {
  // BYO key: the user's key arrives in a header and is used only for this
  // request. It is never logged or persisted. A server fallback key (local dev)
  // is used only if no header is present.
  const userKey = request.headers.get("x-openai-key")?.trim();
  const apiKey = userKey || env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "No API key. Add your OpenAI key in Settings to run workflows." },
      { status: 401 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Malformed request." }, { status: 422 });
  }

  const workflow = getWorkflow(parsed.data.workflowId);
  if (!workflow) {
    return Response.json({ error: "Unknown workflow." }, { status: 404 });
  }

  const inputResult = schemaForWorkflow(workflow).safeParse(parsed.data.input);
  if (!inputResult.success) {
    return Response.json(
      { error: inputResult.error.issues[0]?.message ?? "Invalid input." },
      { status: 422 },
    );
  }

  const openai = createOpenAI({ apiKey });

  try {
    const result = streamText({
      model: openai(env.OPENAI_MODEL),
      system: workflow.system,
      prompt: workflow.buildPrompt(inputResult.data),
    });
    // Plain text stream — consumed on the client with a ReadableStream reader.
    return result.toTextStreamResponse();
  } catch (err) {
    console.error("Workflow run failed:", err);
    return Response.json(
      { error: "The model request failed. Check your key and try again." },
      { status: 502 },
    );
  }
}
