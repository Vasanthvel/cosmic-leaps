"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { Check } from "lucide-react";

import { Section } from "@/components/common";

import {
  engineeringPrinciples,
  technologyCategories,
  technologyStackContent,
} from "@/data/technology-stack";

import { TechnologyCard, technologyCategoryAccents } from "./technology-card";
import styles from "./technology-stack.module.css";

export function TechnologyStack() {
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const scrollTimeoutIdRef = useRef<number | null>(null);
  const cancelPendingScrollRef = useRef<(resetTransition?: boolean) => void>(
    () => {}
  );
  const [activeCategoryId, setActiveCategoryId] = useState(
    technologyCategories[0]?.id ?? ""
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeCategory =
    technologyCategories.find((category) => category.id === activeCategoryId) ??
    technologyCategories[0];
  const activeAccent = activeCategory
    ? technologyCategoryAccents[activeCategory.id] ?? "#35A7FF"
    : "#35A7FF";

  useEffect(() => {
    const cancelPendingScroll = (resetTransition = true) => {
      if (animationFrameIdRef.current !== null) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      if (scrollTimeoutIdRef.current !== null) {
        window.clearTimeout(scrollTimeoutIdRef.current);
        scrollTimeoutIdRef.current = null;
      }

      if (resetTransition) {
        setIsTransitioning(false);
      }
    };

    cancelPendingScrollRef.current = cancelPendingScroll;
    const handleUserScroll = () => cancelPendingScroll();

    const handleAnchorNavigation = (event: MouseEvent) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest('a[href^="#"], a[href^="/#"]')
      ) {
        return;
      }

      cancelPendingScroll();
    };

    document.addEventListener("click", handleAnchorNavigation, true);
    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchstart", handleUserScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleAnchorNavigation, true);
      window.removeEventListener("wheel", handleUserScroll);
      window.removeEventListener("touchstart", handleUserScroll);
      cancelPendingScroll(false);
      cancelPendingScrollRef.current = () => {};
    };
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === activeCategoryId) {
      return;
    }

    cancelPendingScrollRef.current();
    window.scrollTo({ top: window.scrollY, behavior: "instant" });
    setIsTransitioning(true);
    setActiveCategoryId(categoryId);

    animationFrameIdRef.current = window.requestAnimationFrame(() => {
      animationFrameIdRef.current = window.requestAnimationFrame(() => {
        animationFrameIdRef.current = null;
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

        scrollTimeoutIdRef.current = window.setTimeout(() => {
          scrollTimeoutIdRef.current = null;
          setIsTransitioning(false);

          if (isFullyVisible) {
            return;
          }

          const top = window.scrollY + panelRect.top - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }, 286);
      });
    });
  };

  return (
    <Section id="technology-stack">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90">
          {technologyStackContent.badge}
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {technologyStackContent.title}

          <span className="block text-[#f0c77c]">
            {technologyStackContent.highlight}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
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
          style={{ "--technology-accent": activeAccent } as CSSProperties}
          className={[
            styles.detailArea,
            "mt-12 border-t pt-8 transition-all duration-[520ms] ease-out",
            isTransitioning ? "opacity-60" : "opacity-100",
          ].join(" ")}
        >
          <div
            key={activeCategory.id}
            className={[
              "transition-opacity duration-[520ms] ease-out",
              isTransitioning ? "opacity-40" : "opacity-100",
            ].join(" ")}
          >
            <h3 className={`${styles.detailTitle} text-2xl font-bold`}>
              {activeCategory.title}
            </h3>

            <div className={`${styles.stackDivider} mt-6 border-t pt-5`}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
                Technology Stack
              </h4>
            </div>

            <ul className="mt-5 space-y-5">
              {activeCategory.technologies.map((technology, index) => (
                <li
                  key={technology.name}
                  style={{ animationDelay: `${index * 286}ms` }}
                  className="flex items-start gap-3 opacity-0 animate-[fadeInUp_0.46s_ease-out_forwards]"
                >
                  <span className={`${styles.checkIcon} mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full`}>
                    <Check className="h-3.5 w-3.5" />
                  </span>

                  <div>
                    <p className="font-semibold text-white">
                      {technology.name}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-200">
                      {technology.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="mt-24 border-t border-white/15 pt-12">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-white">
            Engineering Principles
          </h3>

          <p className="mt-5 text-lg leading-8 text-slate-200">
            Every Cosmic Leaps solution is built using proven engineering
            principles that prioritize scalability, maintainability, security
            and long-term business value.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {engineeringPrinciples.map((principle, index) => {
              const Icon = principle.icon;
                const accents = ["#35A7FF", "#36E0C0", "#B56CFF", "#F5C76A"];
                const accent = accents[index % accents.length];

              return (
                <div
                  key={principle.title}
                    style={{ "--principle-accent": accent, "--cosmic-accent": accent } as CSSProperties}
                    className="group cosmic-card-hover rounded-xl border border-white/12 bg-[rgba(5,12,30,0.52)] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--principle-accent)] hover:shadow-[0_0_24px_rgba(53,167,255,0.12)]"
                >
                  <div className="cosmic-card-icon mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--principle-accent)]">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h4 className="mt-6 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[var(--principle-accent)]">
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
