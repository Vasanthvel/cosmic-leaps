import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui";

import { ValuePoint } from "@/data/why-cosmic-leaps";

import { FlipCard } from "./flip-card";

interface ValueCardProps {
  value: ValuePoint;
}

export function ValueCard({
  value,
}: ValueCardProps) {
  const Icon = value.icon;

  return (
    <FlipCard
      front={
        <Card className="group h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-xl">
          <CardContent className="flex h-full flex-col p-8">
            <div
              className="
                flex h-14 w-14 items-center justify-center
                rounded-xl
                bg-[#EEF7EE]
                text-[var(--brand-green)]
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:bg-[var(--brand-green)]
                group-hover:text-white
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
                  text-[var(--text-primary)]
                  transition-colors
                  duration-300
                  group-hover:text-[var(--brand-navy)]
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
                  text-[var(--brand-navy)]
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
        <Card className="h-full rounded-2xl border border-[var(--brand-navy)] bg-[var(--brand-navy)] text-white shadow-xl">
          <CardContent className="flex h-full flex-col p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15">
              <Icon className="h-7 w-7 text-white" />
            </div>

            <h3 className="mt-8 text-2xl font-semibold leading-tight">
              {value.title}
            </h3>

            <p className="mt-6 flex-1 text-base leading-7 text-white/80">
              {value.description}
            </p>

            <div className="flex justify-end">
              <ArrowLeft className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>
      }
    />
  );
}