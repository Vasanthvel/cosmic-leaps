import Link from "next/link";
import type { CSSProperties } from "react";

import { Card, CardContent } from "@/components/ui";
import { ContactOption as ContactOptionType } from "@/data/contact-cta";

interface ContactOptionProps {
  option: ContactOptionType;
}

export function ContactOption({
  option,
}: ContactOptionProps) {
  const Icon = option.icon;
  const accent = option.title === "Phone" ? "#B56CFF" : option.title === "Location" ? "#36E0C0" : option.title === "Response Time" ? "#F5C76A" : "#35A7FF";

  return (
    <Card
      style={{ "--contact-accent": accent, "--cosmic-accent": accent } as CSSProperties}
      className="group cosmic-card-hover box-border h-full w-full min-w-0 max-w-full rounded-xl border border-white/12 bg-[rgba(5,12,30,0.58)] text-white shadow-[0_12px_36px_rgba(1,6,20,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--contact-accent)] hover:shadow-[0_0_24px_rgba(53,167,255,0.12)]"
    >
      <CardContent className="box-border flex w-full min-w-0 items-start gap-4 p-6">
        <div className="cosmic-card-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--contact-accent)]">
          <Icon className="h-6 w-6" />
        </div>

        <div className="min-w-0 max-w-full flex-1">
          <h3 className="min-w-0 max-w-full font-semibold text-white [overflow-wrap:anywhere] [word-break:normal]">
            {option.title}
          </h3>

          <p className="mt-1 min-w-0 max-w-full text-sm text-white/60 [overflow-wrap:anywhere] [word-break:normal]">
            {option.description}
          </p>

          {option.href === "#" ? (
            <p className="mt-3 min-w-0 max-w-full font-medium text-white [overflow-wrap:anywhere] [word-break:normal]">
              {option.value}
            </p>
          ) : (
            <Link
              href={option.href}
              className="mt-3 block min-w-0 max-w-full font-medium text-white transition-colors hover:text-[var(--contact-accent)] [overflow-wrap:anywhere] [word-break:normal]"
            >
              {option.value}
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}