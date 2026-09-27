import { Section } from "@/components/common";

import {
  developmentProcessContent,
  processSteps,
} from "@/data/development-process";

import { ProcessCard } from "./process-card";
import { SectionStats, type SectionStat } from "./section-stats";

const processStats: SectionStat[] = [
  { value: "100%", label: "Transparent Workflow", accent: "#38BDF8" },
  { value: "Agile", label: "Iterative Delivery", accent: "#A855F7" },
  { value: "Quality", label: "Engineering Standards", accent: "#FBBF24" },
];

export function DevelopmentProcess() {
  return (
    <Section id="development-process">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90">
          {developmentProcessContent.badge}
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {developmentProcessContent.title}

          <span className="block text-[#f0c77c]">
            {developmentProcessContent.highlight}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          {developmentProcessContent.description}
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {processSteps.map((step) => (
          <ProcessCard
            key={step.id}
            step={step}
          />
        ))}
      </div>

      <div className="mt-24 border-t border-white/15 pt-12 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-white">
            Transparent Development Process
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
            Every project follows a structured delivery workflow with
            continuous communication, milestone reviews and quality
            assurance to ensure your business receives reliable,
            scalable and production-ready software.
          </p>

          <SectionStats
            items={processStats}
            className="mt-10 grid-cols-1 gap-6 sm:grid-cols-3"
          />
        </div>
      </div>
    </Section>
  );
}