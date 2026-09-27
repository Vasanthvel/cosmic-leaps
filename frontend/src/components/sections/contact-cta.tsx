import Link from "next/link";

import { Section } from "@/components/common";
import { Button } from "@/components/ui";

import { contactCTA } from "@/data/contact-cta";

import { ContactOption } from "./contact-option";

export function ContactCTA() {
  return (
    <Section id="contact">
      <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
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
                  className="min-w-[240px] !border-white/30 !bg-[rgba(5,12,30,0.54)] !text-white shadow-[0_8px_24px_rgba(1,6,20,0.2)] backdrop-blur-sm transition-all duration-300 ease-out hover:!-translate-y-0.5 hover:!border-[#F5C76A] hover:!bg-white/10 hover:!text-[#F5C76A] hover:shadow-[0_0_22px_rgba(245,199,106,0.18)] active:scale-[0.98]"
                >
                  {contactCTA.primaryButton.label}
                </Button>
              </Link>

              <Link href={contactCTA.secondaryButton.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[240px] !border-white/30 !bg-[rgba(5,12,30,0.54)] !text-white shadow-[0_8px_24px_rgba(1,6,20,0.2)] backdrop-blur-sm transition-all duration-300 ease-out hover:!-translate-y-0.5 hover:!border-[#35A7FF] hover:!bg-white/10 hover:!text-[#35A7FF] hover:shadow-[0_0_22px_rgba(53,167,255,0.18)] active:scale-[0.98]"
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
    </Section>
  );
}