"use client";

import { Section } from "@/components/common";

import {
  portfolioContent,
  portfolioProjects,
} from "@/data/portfolio";

import { ProjectCard } from "./project-card";
import { SectionStats, type SectionStat } from "./section-stats";

const portfolioStats: SectionStat[] = [
  { value: "100%", label: "Custom Development", accent: "#FBBF24" },
  { value: "AI", label: "Integrated Where Valuable", accent: "#A855F7" },
  { value: "Scalable", label: "Production Architecture", accent: "#2DD4BF" },
];

export function Portfolio() {
  return (
    <Section id="portfolio">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90">
          {portfolioContent.badge}
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {portfolioContent.title}

          <span className="block text-[#f0c77c]">
            {portfolioContent.highlight}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          {portfolioContent.description}
        </p>
      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-2">
        {portfolioProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>

      <div className="mt-24 border-t border-white/15 pt-12 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white">
              Every Solution Is Custom Built
            </h3>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
              These portfolio examples represent the types of business
              solutions Cosmic Leaps develops. Every engagement is
              tailored to the client&apos;s objectives, business processes,
              users and technical requirements.
            </p>
          </div>

          <SectionStats
            items={portfolioStats}
            className="mt-12 grid-cols-1 gap-6 md:grid-cols-3"
          />
        </div>
      </div>
    </Section>
  );
}
