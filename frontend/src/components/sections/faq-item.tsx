"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { FAQItem as FAQItemType } from "@/data/faq";

interface FAQItemProps {
  item: FAQItemType;
}

export function FAQItem({
  item,
}: FAQItemProps) {
  return (
    <Accordion.Item
      value={item.id}
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-[var(--brand-navy)]"
    >
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-6 text-left">
          <span className="pr-6 text-lg font-semibold text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--brand-navy)]">
            {item.question}
          </span>

          <ChevronDown className="h-5 w-5 flex-shrink-0 text-[var(--text-muted)] transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="border-t border-[var(--border)] px-6 py-6">
          <p className="leading-7 text-[var(--text-secondary)]">
            {item.answer}
          </p>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}