import Link from "next/link";

import { Card, CardContent } from "@/components/ui";
import { ContactOption as ContactOptionType } from "@/data/contact-cta";

interface ContactOptionProps {
  option: ContactOptionType;
}

export function ContactOption({
  option,
}: ContactOptionProps) {
  const Icon = option.icon;

  return (
    <Card className="group h-full border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-lg">
      <CardContent className="flex items-start gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF7EE] text-[var(--brand-green)] transition-colors duration-300 group-hover:bg-[var(--brand-green)] group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[var(--text-primary)]">
            {option.title}
          </h3>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {option.description}
          </p>

          {option.href === "#" ? (
            <p className="mt-3 break-words font-medium text-[var(--text-primary)]">
              {option.value}
            </p>
          ) : (
            <Link
              href={option.href}
              className="mt-3 block break-words font-medium text-[var(--brand-navy)] transition-colors hover:text-[var(--brand-green)]"
            >
              {option.value}
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}