"use client";

import { useRef, useState } from "react";

import { Check } from "lucide-react";

import { Section } from "@/components/common";

import {
  engineeringPrinciples,
  technologyCategories,
  technologyStackContent,
} from "@/data/technology-stack";

import { TechnologyCard } from "./technology-card";

export function TechnologyStack() {
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState(
    technologyCategories[0]?.id ?? ""
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeCategory =
    technologyCategories.find((category) => category.id === activeCategoryId) ??
    technologyCategories[0];

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === activeCategoryId) {
      return;
    }

    setIsTransitioning(true);
    setActiveCategoryId(categoryId);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const panel = detailsRef.current;

        if (!panel) {
          setIsTransitioning(false);
          return;
        }

        const panelRect = panel.getBoundingClientRect();
        const offset = 100;
        const isFullyVisible =
          panelRect.top >= offset &&
          panelRect.bottom <= window.innerHeight;

        window.setTimeout(() => {
          setIsTransitioning(false);

          if (isFullyVisible) {
            return;
          }

          const top = window.scrollY + panelRect.top - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }, 220);
      });
    });
  };

  return (
    <Section
      id="technology-stack"
      className="bg-[var(--background)]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--brand-navy)]">
          {technologyStackContent.badge}
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
          {technologyStackContent.title}

          <span className="block text-[var(--brand-navy)]">
            {technologyStackContent.highlight}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
          {technologyStackContent.description}
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {technologyCategories.map((category) => (
          <TechnologyCard
            key={category.id}
            category={category}
            isActive={activeCategoryId === category.id}
            onSelect={() => handleCategorySelect(category.id)}
          />
        ))}
      </div>

      {activeCategory ? (
        <div
          ref={detailsRef}
          className={[
            "mt-12 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm transition-all duration-400 ease-out md:p-10",
            isTransitioning ? "opacity-60" : "opacity-100",
          ].join(" ")}
        >
          <div
            key={activeCategory.id}
            className={[
              "transition-opacity duration-400 ease-out",
              isTransitioning ? "opacity-40" : "opacity-100",
            ].join(" ")}
          >
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              {activeCategory.title}
            </h3>

            <div className="mt-6 border-t border-[var(--border)] pt-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                Technology Stack
              </h4>
            </div>

            <ul className="mt-5 space-y-5">
              {activeCategory.technologies.map((technology, index) => (
                <li
                  key={technology.name}
                  style={{ animationDelay: `${index * 220}ms` }}
                  className="flex items-start gap-3 opacity-0 animate-[fadeInUp_0.35s_ease-out_forwards]"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#EEF7EE] text-[var(--brand-green)]">
                    <Check className="h-3.5 w-3.5" />
                  </span>

                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">
                      {technology.name}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                      {technology.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="mt-24 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-[var(--text-primary)]">
            Engineering Principles
          </h3>

          <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
            Every Cosmic Leaps solution is built using proven engineering
            principles that prioritize scalability, maintainability, security
            and long-term business value.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringPrinciples.map((principle) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-xl"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#EEF7EE] text-[var(--brand-green)] transition-all duration-300 group-hover:bg-[var(--brand-green)] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h4 className="mt-6 text-lg font-semibold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--brand-navy)]">
                    {principle.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
