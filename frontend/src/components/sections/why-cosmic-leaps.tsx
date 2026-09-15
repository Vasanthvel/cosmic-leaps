import { Section } from "@/components/common";

import {
  trustIndicators,
  valuePoints,
  whyCosmicLeapsData,
} from "@/data/why-cosmic-leaps";

import { ValueCard } from "./value-card";

export function WhyCosmicLeaps() {
  return (
    <Section
      id="why-cosmic-leaps"
      className="bg-[var(--background)]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--brand-navy)]">
          {whyCosmicLeapsData.badge}
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
          {whyCosmicLeapsData.title}

          <span className="block text-[var(--brand-navy)]">
            {whyCosmicLeapsData.highlight}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
          {whyCosmicLeapsData.description}
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {valuePoints.map((value) => (
          <ValueCard
            key={value.id}
            value={value}
          />
        ))}
      </div>

      <div className="mt-24 grid grid-cols-2 gap-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10 md:grid-cols-4">
        {trustIndicators.map((indicator) => (
          <div
            key={indicator.label}
            className="text-center"
          >
            <h3 className="text-4xl font-bold text-[var(--brand-navy)]">
              {indicator.value}
            </h3>

            <p className="mt-3 text-sm font-medium text-[var(--text-secondary)]">
              {indicator.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}