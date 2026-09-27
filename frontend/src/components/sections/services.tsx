import { Section } from "@/components/common";
import { services } from "@/data/services";

import { ServiceCard } from "./service-card";
import styles from "./services.module.css";

export function Services() {
  return (
    <Section
      id="services"
      className={styles.section}
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className={styles.kicker}>Our Services</span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Software Solutions
          <span className="block text-[#f0c77c]">
            Built Around Your Business
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Cosmic Leaps delivers custom software solutions engineered around
          your business requirements. Every solution is designed for
          scalability, performance and long-term maintainability.
        </p>
      </div>

      <div className={styles.serviceCards}>
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            position={index}
          />
        ))}
      </div>
    </Section>
  );
}