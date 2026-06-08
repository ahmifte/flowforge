"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import type { WorkflowField } from "@/lib/workflows";
import {
  STORAGE_KEYS,
  loadHistory,
  saveRun,
  type RunRecord,
} from "@/lib/storage";

// Serializable subset of a Workflow (functions can't cross the server boundary).
export type WorkflowDescriptor = {
  id: string;
  name: string;
  description: string;
  inputNote: string;
  fields: WorkflowField[];
};

export function WorkflowRunner({ workflow }: { workflow: WorkflowDescriptor }) {
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<RunRecord[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setHistory(loadHistory().filter((r) => r.workflowId === workflow.id));
  }, [workflow.id]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setOutput("");

    const apiKey = window.localStorage.getItem(STORAGE_KEYS.apiKey)?.trim();
    if (!apiKey) {
      setError("Add your OpenAI key in Settings first.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const input: Record<string, string> = {};
    for (const field of workflow.fields) {
      input[field.name] = String(formData.get(field.name) ?? "");
    }

    setRunning(true);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-openai-key": apiKey,
        },
        body: JSON.stringify({ workflowId: workflow.id, input }),
      });

      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Run failed.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setOutput(acc);
      }

      const record: RunRecord = {
        id: crypto.randomUUID(),
        workflowId: workflow.id,
        workflowName: workflow.name,
        input,
        output: acc,
        createdAt: Date.now(),
      };
      saveRun(record);
      setHistory((prev) => [record, ...prev].slice(0, 25));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Run failed.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-[hsl(var(--foreground))]"
      >
        <ArrowLeft className="h-4 w-4" /> All workflows
      </Link>

      <h1 className="text-2xl font-bold tracking-tight">{workflow.name}</h1>
      <p className="mt-2 max-w-2xl text-muted">{workflow.description}</p>
      <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-default bg-card px-3 py-2 text-sm text-muted">
        <ShieldCheck className="h-4 w-4 text-accent" />
        {workflow.inputNote}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
          {workflow.fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1 block text-sm font-medium"
              >
                {field.label}
                {field.required ? <span className="text-accent"> *</span> : null}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={5}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full rounded-md border border-default bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full rounded-md border border-default bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={running}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {running ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {running ? "Running…" : "Run workflow"}
          </button>
          {error ? (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          ) : null}
        </form>

        <div>
          <h2 className="mb-2 text-sm font-medium text-muted">Output</h2>
          <pre className="min-h-[200px] whitespace-pre-wrap rounded-xl border border-default bg-card p-4 text-sm leading-relaxed">
            {output || (running ? "…" : "Run the workflow to see output here.")}
          </pre>
        </div>
      </div>

      {history.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-medium text-muted">
            Recent runs (stored in your browser)
          </h2>
          <div className="space-y-3">
            {history.map((record) => (
              <details
                key={record.id}
                className="rounded-lg border border-default bg-card p-4"
              >
                <summary className="cursor-pointer text-sm">
                  {new Date(record.createdAt).toLocaleString()}
                </summary>
                <pre className="mt-3 whitespace-pre-wrap text-sm text-muted">
                  {record.output}
                </pre>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
