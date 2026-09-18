"use client";

import { ChevronDown } from "lucide-react";

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

  function toggleCard() {
    onSelect();
  }

  return (
    <Card
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
      className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-xl ${
        isActive
          ? "border-[var(--brand-navy)] shadow-lg"
          : "border-[var(--border)]"
      }`}
    >
      <CardContent className="flex h-full flex-col p-8">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
              isActive
                ? "scale-105 bg-[var(--brand-green)] text-white shadow-lg"
                : "bg-[#EEF7EE] text-[var(--brand-green)] group-hover:scale-105 group-hover:bg-[var(--brand-green)] group-hover:text-white"
            }`}
          >
            <Icon className="h-7 w-7 transition-all duration-300" />
          </div>

          <ChevronDown
            className={`h-6 w-6 transition-all duration-300 ${
              isActive
                ? "rotate-180 text-[var(--brand-navy)]"
                : "text-[var(--text-muted)] group-hover:text-[var(--brand-navy)]"
            }`}
          />
        </div>

        <h3 className="mt-8 text-2xl font-semibold leading-tight text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--brand-navy)]">
          {category.title}
        </h3>

        <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
          {category.description}
        </p>
      </CardContent>
    </Card>
  );
}