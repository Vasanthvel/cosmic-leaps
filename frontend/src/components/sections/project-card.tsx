"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui";

import { PortfolioProject } from "@/data/portfolio";

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({
  project,
}: ProjectCardProps) {
  const Icon = project.icon;
  const category = project.category.toLowerCase();
  const accent = category.includes("ai")
    ? "#B56CFF"
    : category.includes("analytics")
      ? "#36E0C0"
      : "#35A7FF";

  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  const handleToggle = () => {
    setIsOpen((open) => {
      const nextOpen = !open;
      setVisibleCount(0);
      return nextOpen;
    });
  };

  useEffect(() => {
    if (!isOpen || visibleCount >= project.approach.length) {
      return;
    }

    const timer = setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, visibleCount, project.approach.length]);

  return (
    <Card
      onClick={handleToggle}
      style={{ "--project-accent": accent, "--cosmic-accent": accent } as CSSProperties}
      className="group cosmic-card-hover flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/12 bg-[rgba(5,12,30,0.62)] text-white shadow-[0_12px_36px_rgba(1,6,20,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--project-accent)] hover:shadow-[0_0_28px_rgba(53,167,255,0.12)]"
    >
      <CardContent className="flex h-full flex-col p-8">
        <div className="flex items-center justify-between">
          <div
            className="cosmic-card-icon flex h-12 w-12 items-center justify-center rounded-full border border-[var(--project-accent)]/35 bg-white/5 text-[var(--project-accent)]"
            aria-hidden="true"
          >
            <Icon className="h-7 w-7" />
          </div>

          <span className="cosmic-project-category rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
            {project.category}
          </span>
        </div>

        <h3 className="cosmic-project-title mt-8 text-2xl font-semibold leading-tight text-white">
          {project.title}
        </h3>

        <p className="mt-5 text-base leading-7 text-white/75">
          {project.description}
        </p>

        <div className="mt-8">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/85">
            Technologies
          </h4>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology.name}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white/75 transition-colors duration-300 group-hover:border-white/25"
              >
                {technology.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--project-accent)]"
            />

            <div className="w-full">
              <h4 className="font-semibold text-white">
                Business Outcome
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/70">
                {project.outcome}
              </p>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen
                    ? "mt-4 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">
                    How It Was Achieved
                  </p>

                  <ul className="space-y-2 border-t border-white/10 pt-3">
                    {project.approach.map((step, index) => (
                      <li
                        key={step}
                        className={`flex items-start gap-2 text-sm leading-6 text-white/75 transition-all duration-300 ease-out ${
                          index < visibleCount
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-0"
                        }`}
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--project-accent)]" />

                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-white/10 bg-white/5 p-4 text-center transition-all duration-300 group-hover:border-[var(--project-accent)]/45"
            >
              <p className="text-lg font-bold text-[var(--project-accent)]">
                {metric.value}
              </p>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/55">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--project-accent)] transition-all duration-300 group-hover:gap-3">
          <span>See How It Works</span>

          <ArrowRight
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-90" : "group-hover:translate-x-1"
            }`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
