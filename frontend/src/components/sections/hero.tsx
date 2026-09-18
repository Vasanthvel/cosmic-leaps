import Link from "next/link";

import { Section } from "@/components/common";
import { Button } from "@/components/ui";

import { heroData } from "@/data/hero";

import { HeroBackground } from "./hero-background";
import { HeroStats } from "./hero-stats";

export function Hero() {
  return (
    <Section
      id="hero"
      className="relative overflow-hidden pt-24 pb-28"
    >
      <HeroBackground />

      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/90">
          {heroData.badge}
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight text-white md:text-6xl">
          {heroData.title}

          <span className="block text-[#f0c77c]">
            {heroData.highlight}
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-200">
          {heroData.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={heroData.primaryButton.href}>
            <Button
              size="lg"
              className="!border-[1.5px] !border-[var(--brand-navy)] !bg-white !text-[var(--brand-navy)] shadow-[0_8px_20px_rgba(30,42,90,0.12)] transition-all duration-300 ease-out hover:!-translate-y-0.5 hover:!border-[var(--brand-green)] hover:!bg-[var(--brand-green)] hover:!text-white hover:shadow-[0_12px_24px_rgba(76,175,80,0.22)] active:scale-[0.98]"
            >
              {heroData.primaryButton.label}
            </Button>
          </Link>

          <Link href={heroData.secondaryButton.href}>
            <Button
              variant="outline"
              size="lg"
              className="!border-[1.5px] !border-[var(--brand-navy)] !bg-white !text-[var(--brand-navy)] shadow-[0_8px_20px_rgba(30,42,90,0.12)] transition-all duration-300 ease-out hover:!-translate-y-0.5 hover:!border-[var(--brand-green)] hover:!bg-[var(--brand-green)] hover:!text-white hover:shadow-[0_12px_24px_rgba(76,175,80,0.22)] active:scale-[0.98]"
            >
              {heroData.secondaryButton.label}
            </Button>
          </Link>
        </div>

        <HeroStats />
      </div>
    </Section>
  );
}