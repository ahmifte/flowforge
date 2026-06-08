import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  FAQ,
  OUTCOMES,
  PACKAGES,
  PROCESS,
  getBookingHref,
} from "@/lib/service";

export const metadata: Metadata = {
  title: "Done-for-you AI automation",
  description:
    "Fixed-scope AI automation and RAG assistant builds, deployed to your infrastructure. Book a free discovery call.",
};

export default function ServicesPage() {
  const bookingHref = getBookingHref();

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-default bg-card px-3 py-1 text-xs text-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Done-for-you AI automation
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          I&apos;ll build your AI automations — and deploy them to your stack
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Fixed scope, fixed price, shipped in weeks. The same engine you can try
          on this site, built and tuned around your actual workflows.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={bookingHref}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-fg hover:opacity-90"
          >
            Book a free discovery call
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-default px-6 py-3 font-medium hover:bg-card"
          >
            Try the live demo
          </Link>
        </div>
      </section>

      {/* Outcomes */}
      <section className="grid gap-6 md:grid-cols-3">
        {OUTCOMES.map((outcome) => (
          <div
            key={outcome.title}
            className="rounded-xl border border-default bg-card p-6"
          >
            <h2 className="text-lg font-semibold">{outcome.title}</h2>
            <p className="mt-2 text-sm text-muted">{outcome.detail}</p>
          </div>
        ))}
      </section>

      {/* Packages */}
      <section>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Packages</h2>
          <p className="mt-2 text-muted">
            Transparent pricing. No hourly black holes.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 ${
                pkg.highlighted
                  ? "border-accent shadow-lg shadow-accent/10"
                  : "border-default"
              }`}
            >
              {pkg.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-fg">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{pkg.price}</span>
                <span className="text-sm text-muted">{pkg.cadence}</span>
              </div>
              <p className="mt-3 text-xs text-muted">{pkg.bestFor}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={bookingHref}
                className={`mt-6 inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium ${
                  pkg.highlighted
                    ? "bg-accent text-accent-fg hover:opacity-90"
                    : "border border-default hover:bg-[hsl(var(--border))]/30"
                }`}
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {PROCESS.map((item) => (
            <div key={item.step} className="rounded-xl border border-default p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-fg">
                {item.step}
              </div>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently asked
          </h2>
        </div>
        <div className="divide-y divide-[hsl(var(--border))] rounded-xl border border-default">
          {FAQ.map((item) => (
            <div key={item.q} className="p-6">
              <h3 className="font-medium">{item.q}</h3>
              <p className="mt-2 text-sm text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-2xl border border-accent bg-card p-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Find your highest-ROI automation in 20 minutes
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          The discovery call is free and useful even if we never work together —
          you&apos;ll leave knowing exactly what to automate first.
        </p>
        <a
          href={bookingHref}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-accent-fg hover:opacity-90"
        >
          Book a free discovery call
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
