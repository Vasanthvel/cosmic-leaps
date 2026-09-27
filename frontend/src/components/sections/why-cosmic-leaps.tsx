import { Section } from "@/components/common";

import {
  trustIndicators,
  valuePoints,
  whyCosmicLeapsData,
} from "@/data/why-cosmic-leaps";

import { ValueCard } from "./value-card";
import { SectionStats, type SectionStat } from "./section-stats";

const trustAccents = ["#38BDF8", "#FBBF24", "#A855F7", "#2DD4BF"];

export function WhyCosmicLeaps() {
  const stats: SectionStat[] = trustIndicators.map((indicator, index) => ({
    ...indicator,
    accent: trustAccents[index % trustAccents.length],
  }));

  return (
    <Section id="why-cosmic-leaps">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90">
          {whyCosmicLeapsData.badge}
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {whyCosmicLeapsData.title}

          <span className="block text-[#f0c77c]">
            {whyCosmicLeapsData.highlight}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
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

      <SectionStats
        items={stats}
        className="mt-24 grid-cols-2 gap-8 border-t border-white/15 pt-10 md:grid-cols-4"
      />
    </Section>
  );
}