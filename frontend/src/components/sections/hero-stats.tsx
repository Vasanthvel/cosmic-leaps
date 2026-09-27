import { SectionStats, type SectionStat } from "./section-stats";

const stats: SectionStat[] = [
  {
    value: "3",
    label: "Core Services",
    accent: "#7DD3FC",
  },
  {
    value: "100%",
    label: "Custom Solutions",
    accent: "#F5D78E",
  },
  {
    value: "AI",
    label: "Powered Development",
    accent: "#C4B5FD",
  },
];

export function HeroStats() {
  return (
    <SectionStats
      items={stats}
      className="mt-20 grid-cols-1 gap-8 border-t border-white/15 pt-10 sm:grid-cols-3"
    />
  );
}