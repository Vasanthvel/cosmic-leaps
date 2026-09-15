import { ArrowRight } from "lucide-react";

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

  const showArrow =
    step.step !== "06" &&
    step.step !== "6";

  return (
    <Card className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-xl">
      <CardContent className="flex h-full flex-col p-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.2em] text-[var(--brand-navy)]">
            STEP {step.step}
          </span>

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EEF7EE] text-[var(--brand-green)] transition-all duration-300 group-hover:bg-[var(--brand-green)] group-hover:text-white group-hover:scale-105">
            <Icon className="h-7 w-7 transition-colors duration-300" />
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold leading-tight text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--brand-navy)]">
          {step.title}
        </h3>

        <p className="mt-5 flex-1 text-base leading-7 text-[var(--text-secondary)]">
          {step.description}
        </p>

        <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#1E2A5A]">
          <span>{step.step}</span>

          {showArrow && (
            <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}