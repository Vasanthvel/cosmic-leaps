import { Section } from "@/components/common";
import { services } from "@/data/services";

import { ServiceCard } from "./service-card";

export function Services() {
  return (
    <Section
      id="services"
      className="bg-[rgba(5,11,25,0.12)]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90">
          Our Services
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Software Solutions
          <span className="block text-[#f0c77c]">
            Built Around Your Business
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
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