import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { WORKFLOWS } from "@/lib/workflows";

export default function HomePage() {
  return (
    <>
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Run AI automations in seconds
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Pick a workflow, fill in the inputs, and stream the result. flowforge is
          bring-your-own-key, so your OpenAI key stays in your browser and is sent
          only with each run — never stored on a server.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-default bg-card px-3 py-2 text-sm text-muted">
          <ShieldCheck className="h-4 w-4 text-accent" />
          Operates only on data you provide. No scraping of third-party sites.
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {WORKFLOWS.map((workflow) => (
          <Link
            key={workflow.id}
            href={`/workflows/${workflow.id}`}
            className="group flex flex-col rounded-xl border border-default bg-card p-6 transition-colors hover:border-accent"
          >
            <h2 className="text-lg font-semibold">{workflow.name}</h2>
            <p className="mt-2 flex-1 text-sm text-muted">
              {workflow.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Open workflow
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-accent bg-card p-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">
            Want these built around your workflows?
          </h2>
          <p className="mt-1 text-sm text-muted">
            I build and deploy custom AI automations for your team — fixed scope,
            fixed price.
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-accent-fg hover:opacity-90"
        >
          See packages &amp; pricing
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
