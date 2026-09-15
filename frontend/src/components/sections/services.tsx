import { Section } from "@/components/common";
import { services } from "@/data/services";

import { ServiceCard } from "./service-card";

export function Services() {
  return (
    <Section
      id="services"
      className="bg-[var(--surface)]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--brand-navy)]">
          Our Services
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
          Software Solutions
          <span className="block text-[var(--brand-navy)]">
            Built Around Your Business
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
          Cosmic Leaps delivers custom software solutions engineered around
          your business requirements. Every solution is designed for
          scalability, performance and long-term maintainability.
        </p>
      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}
      </div>
    </Section>
  );
}