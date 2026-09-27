import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui";

import { ProcessStep } from "@/data/development-process";

interface ProcessCardProps {
  step: ProcessStep;
}

export function ProcessCard({
  step,
}: ProcessCardProps) {
  const Icon = step.icon;
  const stepAccents = ["#35A7FF", "#B56CFF", "#36E0C0", "#F5C76A"];
  const accent = stepAccents[(Number.parseInt(step.step, 10) - 1) % stepAccents.length] ?? stepAccents[0];

  const showArrow =
    step.step !== "06" &&
    step.step !== "6";

  return (
    <Card
      style={{ "--process-accent": accent, "--cosmic-accent": accent } as CSSProperties}
      className="group cosmic-card-hover relative h-full overflow-hidden rounded-xl border border-white/12 bg-[rgba(5,12,30,0.58)] text-white shadow-[0_12px_36px_rgba(1,6,20,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--process-accent)] hover:shadow-[0_0_24px_rgba(53,167,255,0.12)]"
    >
      <CardContent className="flex h-full flex-col p-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.2em] text-[var(--process-accent)]">
            STEP {step.step}
          </span>

          <div className="cosmic-card-icon flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--process-accent)]">
            <Icon className="h-6 w-6 transition-colors duration-300" />
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-[var(--process-accent)]">
          {step.title}
        </h3>

        <p className="mt-5 flex-1 text-base leading-7 text-white/75">
          {step.description}
        </p>

        <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--process-accent)]">
          <span>{step.step}</span>

          {showArrow && (
            <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}