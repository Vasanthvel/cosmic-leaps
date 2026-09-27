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
    <Section id="faq">
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
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.id}
              item={item}
              accentIndex={index}
            />
          ))}
        </Accordion.Root>
      </div>

      <div className="mt-24 border-t border-white/15 pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold text-white">
            Still Have Questions?
          </h3>

          <p className="mt-6 text-lg leading-8 text-slate-200">
            Every business is unique. If your question isn&apos;t covered
            here, we&apos;d be happy to discuss your project, understand your
            requirements and recommend the most appropriate solution.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="group rounded-xl border border-white/12 bg-[rgba(5,12,30,0.5)] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#35A7FF]/50">
              <h4 className="text-xl font-bold text-[#35A7FF]">
                Free
              </h4>

              <p className="mt-2 text-sm text-white/75">
                Initial Consultation
              </p>
            </div>

            <div className="group rounded-xl border border-white/12 bg-[rgba(5,12,30,0.5)] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#B56CFF]/50">
              <h4 className="text-xl font-bold text-[#B56CFF]">
                Custom
              </h4>

              <p className="mt-2 text-sm text-white/75">
                Solution Planning
              </p>
            </div>

            <div className="group rounded-xl border border-white/12 bg-[rgba(5,12,30,0.5)] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#36E0C0]/50">
              <h4 className="text-xl font-bold text-[#36E0C0]">
                Clear
              </h4>

              <p className="mt-2 text-sm text-white/75">
                Project Roadmap
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}