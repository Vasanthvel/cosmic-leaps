import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import type { Service } from "@/data/services";

import styles from "./services.module.css";

interface ServiceCardProps {
  service: Service;
  position: number;
}

const serviceAccents = ["#35A7FF", "#B56CFF", "#36E0C0"];

export function ServiceCard({ service, position }: ServiceCardProps) {
  const Icon = service.icon;
  const accent = serviceAccents[position] ?? serviceAccents[0];

  return (
    <article
      aria-labelledby={`${service.id}-title`}
      className={`${styles.serviceCard} cosmic-card-hover`}
      style={{ "--service-accent": accent, "--cosmic-accent": accent } as CSSProperties}
    >
      <div className={styles.cardTopline}>
        <div className={`${styles.iconRing} cosmic-card-icon`}>
          <Icon aria-hidden="true" className={styles.icon} />
        </div>
        <ArrowUpRight aria-hidden="true" className={styles.cardArrow} />
      </div>

      <h3 id={`${service.id}-title`} className={styles.cardTitle}>
        {service.title}
      </h3>
      <p className={styles.shortDescription}>{service.shortDescription}</p>

      <p className={styles.fullDescription}>{service.description}</p>
      <h4 className={styles.solutionsHeading}>Typical Solutions</h4>
      <ul className={styles.solutionList}>
        {service.features.map((feature) => (
          <li key={feature.title}>{feature.title}</li>
        ))}
      </ul>
    </article>
  );
}