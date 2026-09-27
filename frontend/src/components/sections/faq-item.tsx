"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";

import { FAQItem as FAQItemType } from "@/data/faq";
import styles from "./faq-item.module.css";

interface FAQItemProps {
  item: FAQItemType;
  accentIndex: number;
}

const faqAccents = [
  "#38BDF8",
  "#A855F7",
  "#22D3EE",
  "#2DD4BF",
  "#FBBF24",
  "#E879F9",
  "#818CF8",
  "#FB923C",
];

export function FAQItem({
  item,
  accentIndex,
}: FAQItemProps) {
  const accent = faqAccents[accentIndex] ?? faqAccents[0];

  return (
    <Accordion.Item
      value={item.id}
      style={{ "--cosmic-accent": accent } as CSSProperties}
      className={`${styles.faqItem} cosmic-card-hover group overflow-hidden rounded-xl border border-white/12 bg-[rgba(5,12,30,0.54)] text-white shadow-[0_10px_28px_rgba(1,6,20,0.14)] backdrop-blur-md`}
    >
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-6 text-left">
          <span className={`${styles.question} pr-6 text-lg font-semibold text-white`}>
            {item.question}
          </span>

          <ChevronDown className="cosmic-card-inline-icon h-5 w-5 flex-shrink-0 text-white/55 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="border-t border-white/10 px-6 py-6">
          <p className="leading-7 text-white/75">
            {item.answer}
          </p>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}