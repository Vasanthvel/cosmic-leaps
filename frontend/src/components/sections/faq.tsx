"use client";

import * as Accordion from "@radix-ui/react-accordion";

import { Section } from "@/components/common";

import {
  faqContent,
  faqItems,
} from "@/data/faq";

import { FAQItem } from "./faq-item";

export function FAQ() {
  return (
    <Section
      id="faq"
      className="bg-[rgba(5,11,25,0.10)]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90">
          {faqContent.badge}
        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {faqContent.title}

          <span className="block text-[#f0c77c]">
            {faqContent.highlight}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          {faqContent.description}
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-4xl">
        <Accordion.Root
          type="single"
          collapsible
          className="space-y-5"
        >
          {faqItems.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
            />
          ))}
        </Accordion.Root>
      </div>

      <div className="mt-24 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-10">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold text-[var(--text-primary)]">
            Still Have Questions?
          </h3>

          <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
            Every business is unique. If your question isn&apos;t covered
            here, we&apos;d be happy to discuss your project, understand your
            requirements and recommend the most appropriate solution.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-xl">
              <h4 className="text-xl font-bold text-[var(--brand-navy)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
                Free
              </h4>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Initial Consultation
              </p>
            </div>

            <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-xl">
              <h4 className="text-xl font-bold text-[var(--brand-navy)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
                Custom
              </h4>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Solution Planning
              </p>
            </div>

            <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-navy)] hover:shadow-xl">
              <h4 className="text-xl font-bold text-[var(--brand-navy)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
                Clear
              </h4>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Project Roadmap
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}