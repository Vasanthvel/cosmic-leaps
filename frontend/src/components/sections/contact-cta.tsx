import Link from "next/link";

import { Section } from "@/components/common";
import { Button } from "@/components/ui";

import { contactCTA } from "@/data/contact-cta";

import { ContactOption } from "./contact-option";

export function ContactCTA() {
  return (
    <Section
      id="contact"
      className="bg-[var(--surface)]"
    >
      <div className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#1E2A5A] shadow-[0_24px_60px_rgba(17,24,39,0.08)]">
        <div className="px-8 py-16 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              {contactCTA.badge}
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {contactCTA.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
              {contactCTA.description}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={contactCTA.primaryButton.href}>
                <Button
                  size="lg"
                  className="min-w-[240px] !border-[1.5px] !border-[var(--brand-navy)] !bg-white !text-[var(--brand-navy)] shadow-[0_8px_20px_rgba(30,42,90,0.12)] transition-all duration-300 ease-out hover:!-translate-y-0.5 hover:!border-[var(--brand-green)] hover:!bg-[var(--brand-green)] hover:!text-white hover:shadow-[0_12px_24px_rgba(76,175,80,0.22)] active:scale-[0.98]"
                >
                  {contactCTA.primaryButton.label}
                </Button>
              </Link>

              <Link href={contactCTA.secondaryButton.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[240px] !border-[1.5px] !border-[var(--brand-navy)] !bg-white !text-[var(--brand-navy)] shadow-[0_8px_20px_rgba(30,42,90,0.12)] transition-all duration-300 ease-out hover:!-translate-y-0.5 hover:!border-[var(--brand-green)] hover:!bg-[var(--brand-green)] hover:!text-white hover:shadow-[0_12px_24px_rgba(76,175,80,0.22)] active:scale-[0.98]"
                >
                  {contactCTA.secondaryButton.label}
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {contactCTA.contactOptions.map((option) => (
              <ContactOption
                key={option.title}
                option={option}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}