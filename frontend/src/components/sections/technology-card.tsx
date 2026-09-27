"use client";

import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";

import { Card, CardContent } from "@/components/ui";

import { TechnologyCategory } from "@/data/technology-stack";

interface TechnologyCardProps {
  category: TechnologyCategory;
  isActive: boolean;
  onSelect: () => void;
}

export function TechnologyCard({
  category,
  isActive,
  onSelect,
}: TechnologyCardProps) {
  const Icon = category.icon;
  const accent = technologyCategoryAccents[category.id] ?? "#35A7FF";

  function toggleCard() {
    onSelect();
  }

  return (
    <Card
      style={{ "--technology-accent": accent, "--cosmic-accent": accent } as CSSProperties}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onClick={toggleCard}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleCard();
        }
      }}
      className={`group cosmic-card-hover flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-[rgba(5,12,30,0.58)] text-white shadow-[0_12px_36px_rgba(1,6,20,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--technology-accent)] hover:shadow-[0_0_24px_rgba(53,167,255,0.12)] ${
        isActive
          ? "border-[var(--technology-accent)] shadow-[0_0_24px_rgba(53,167,255,0.14)]"
          : "border-white/12"
      }`}
    >
      <CardContent className="flex h-full flex-col p-8">
        <div className="flex items-center justify-between">
          <div
              className={`cosmic-card-icon flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--technology-accent)] ${
              isActive
                  ? "shadow-[0_0_18px_rgba(53,167,255,0.16)]"
                  : ""
            }`}
          >
            <Icon className="h-7 w-7 transition-all duration-300" />
          </div>

          <ChevronDown
            className={`h-6 w-6 transition-all duration-300 ${
              isActive
                ? "rotate-180 text-[var(--technology-accent)]"
                : "text-white/55 group-hover:text-[var(--technology-accent)]"
            }`}
          />
        </div>

        <h3 className="mt-8 text-2xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-[var(--technology-accent)]">
          {category.title}
        </h3>

        <p className="mt-4 text-base leading-7 text-white/70">
          {category.description}
        </p>
      </CardContent>
    </Card>
  );
}

export const technologyCategoryAccents: Record<string, string> = {
  frontend: "#35A7FF",
  backend: "#35A7FF",
  "artificial-intelligence": "#B56CFF",
  data: "#36E0C0",
  engineering: "#F5C76A",
  security: "#36E0C0",
};