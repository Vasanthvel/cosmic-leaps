import type { CSSProperties } from "react";

import styles from "./section-stats.module.css";

export interface SectionStat {
  value: string;
  label: string;
  accent: string;
}

interface SectionStatsProps {
  items: SectionStat[];
  className: string;
}

export function SectionStats({ items, className }: SectionStatsProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className={styles.item}
          style={{ "--section-stat-accent": item.accent } as CSSProperties}
        >
          <h3 className={styles.value}>{item.value}</h3>
          <p className={styles.label}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}