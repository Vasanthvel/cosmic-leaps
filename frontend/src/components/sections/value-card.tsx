import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui";

import { ValuePoint } from "@/data/why-cosmic-leaps";

import { FlipCard } from "./flip-card";
import styles from "./value-card.module.css";

interface ValueCardProps {
  value: ValuePoint;
}

export function ValueCard({
  value,
}: ValueCardProps) {
  const Icon = value.icon;
  const valueAccents: Record<string, string> = {
    "custom-solutions": "#35A7FF",
    "modern-technologies": "#36E0C0",
    "ai-first": "#B56CFF",
    analytics: "#36E0C0",
    "data-processing": "#35A7FF",
    "long-term": "#F5C76A",
  };
  const accent = valueAccents[value.id] ?? "#35A7FF";

  return (
    <FlipCard
      front={
        <Card
          style={{ "--value-accent": accent, "--cosmic-accent": accent } as CSSProperties}
          className="group cosmic-card-hover h-full rounded-xl border border-white/12 bg-[rgba(5,12,30,0.58)] text-white shadow-[0_12px_36px_rgba(1,6,20,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--value-accent)] hover:shadow-[0_0_24px_rgba(53,167,255,0.12)]"
        >
          <CardContent className="flex h-full flex-col p-8">
            <div
              className="
                flex h-14 w-14 items-center justify-center
                rounded-full
                border border-white/12
                bg-white/5
                cosmic-card-icon text-[var(--value-accent)]
                transition-all
                duration-300
              "
            >
              <Icon className="h-7 w-7 transition-colors duration-300" />
            </div>

            <div className="flex flex-1 items-center">
              <h3
                className="
                  text-3xl
                  font-semibold
                  leading-tight
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-[var(--value-accent)]
                "
              >
                {value.title}
              </h3>
            </div>

            <div className="flex justify-end">
              <ArrowRight
                className="
                  h-6
                  w-6
                  text-[var(--value-accent)]
                  transition-all
                  duration-300
                  group-hover:translate-x-2
                "
              />
            </div>
          </CardContent>
        </Card>
      }
      back={
        <Card
          style={{ "--value-accent": accent, "--cosmic-accent": accent } as CSSProperties}
          className={`${styles.backFace} group cosmic-card-hover h-full rounded-xl border border-white/12 bg-[rgba(5,12,30,0.72)] text-white shadow-xl backdrop-blur-md`}
        >
          <CardContent className="flex h-full flex-col p-8">
            <div className="cosmic-card-icon flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--value-accent)]">
              <Icon className="h-6 w-6 text-[var(--value-accent)]" />
            </div>

            <h3 className={`${styles.backHeading} mt-8 text-2xl font-semibold leading-tight`}>
              {value.title}
            </h3>

            <p className="mt-6 flex-1 text-base leading-7 text-white/75">
              {value.description}
            </p>

            <div className="flex justify-end">
              <ArrowLeft className="cosmic-card-inline-icon h-6 w-6 text-[var(--value-accent)]" />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}