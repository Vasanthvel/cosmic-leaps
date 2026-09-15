"use client";

import { useEffect, useState } from "react";

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

  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setVisibleCount(0);
      return;
    }

    if (visibleCount >= project.approach.length) {
      return;
    }

    const timer = setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, visibleCount, project.approach.length]);

  return (
    <Card
      onClick={() => setIsOpen((open) => !open)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-xl"
    >
      <CardContent className="flex h-full flex-col p-8">
        <div className="flex items-center justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EEF7EE] text-[#4CAF50] transition-all duration-300 group-hover:bg-[#4CAF50] group-hover:text-white"
            aria-hidden="true"
          >
            <Icon className="h-7 w-7" />
          </div>

          <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            {project.category}
          </span>
        </div>

        <h3 className="mt-8 text-2xl font-semibold leading-tight text-[var(--text-primary)]">
          {project.title}
        </h3>

        <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
          {project.description}
        </p>

        <div className="mt-8">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)]">
            Technologies
          </h4>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology.name}
                className="rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1 text-sm font-medium text-[#1E2A5A] transition-colors duration-300 group-hover:border-[#D1D5DB]"
              >
                {technology.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--brand-green)]"
            />

            <div className="w-full">
              <h4 className="font-semibold text-[var(--text-primary)]">
                Business Outcome
              </h4>

              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
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
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    How It Was Achieved
                  </p>

                  <ul className="space-y-2 border-t border-[var(--border)] pt-3">
                    {project.approach.map((step, index) => (
                      <li
                        key={step}
                        className={`flex items-start gap-2 text-sm leading-6 text-[var(--text-secondary)] transition-all duration-300 ease-out ${
                          index < visibleCount
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-0"
                        }`}
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4CAF50]" />

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
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center transition-all duration-300 group-hover:border-[var(--brand-navy)]"
            >
              <p className="text-lg font-bold text-[var(--brand-navy)]">
                {metric.value}
              </p>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--brand-navy)] transition-all duration-300 group-hover:gap-3">
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
