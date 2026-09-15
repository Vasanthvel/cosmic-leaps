import { Check } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card
      tabIndex={0}
      className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-xl focus-visible:-translate-y-1 focus-visible:border-[var(--brand-navy)] focus-visible:shadow-xl"
    >
      <CardHeader className="space-y-6">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EEF7EE] text-[var(--brand-green)] transition-colors duration-300 group-hover:bg-[var(--brand-green)] group-hover:text-white group-focus-visible:bg-[var(--brand-green)] group-focus-visible:text-white"
        >
          <Icon className="h-7 w-7" />
        </div>

        <div className="space-y-3">
          <CardTitle className="text-2xl leading-tight">
            {service.title}
          </CardTitle>

          <p className="text-base leading-7 text-[var(--text-secondary)]">
            {service.shortDescription}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        <p className="leading-7 text-[var(--text-secondary)]">
          {service.description}
        </p>

        <div className="mt-8 flex-1">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)]">
            Typical Solutions
          </h4>

          <ul className="space-y-3">
            {service.features.map((feature) => (
              <li
                key={feature.title}
                className="flex items-start gap-3"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#EEF7EE] text-[var(--brand-green)]"
                >
                  <Check className="h-3.5 w-3.5" />
                </span>

                <span className="text-sm leading-6 text-[var(--text-secondary)]">
                  {feature.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}