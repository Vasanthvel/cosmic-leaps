"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const SECTION_ORDER = [
  "hero",
  "services",
  "why-cosmic-leaps",
  "development-process",
  "technology-stack",
  "portfolio",
  "faq",
  "contact",
] as const;

const STAR_COUNT = 70;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createStars() {
  return Array.from({ length: STAR_COUNT }, (_, index) => ({
    id: index,
    left: 0.04 + Math.random() * 0.92,
    top: 0.08 + Math.random() * 0.84,
    size: 1.3 + Math.random() * 2.7,
    opacity: 0.2 + Math.random() * 0.45,
    delay: (index % 9) * 0.3 + Math.random() * 1.5,
    duration: 4.5 + Math.random() * 6.5,
  }));
}

export function GalaxyHop() {
  const lastSectionRef = useRef<string | null>(null);
  const lastScrollYRef = useRef(0);
  const velocityRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [hop, setHop] = useState({ active: false, direction: 1, intensity: 1 });

  const stars = useMemo(() => createStars(), []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const updateVelocity = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      if (Math.abs(delta) > 8) {
        velocityRef.current = velocityRef.current * 0.7 + delta * 0.25;
      } else {
        velocityRef.current *= 0.82;
      }

      animationFrameRef.current = window.requestAnimationFrame(updateVelocity);
    };

    animationFrameRef.current = window.requestAnimationFrame(updateVelocity);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const nodes = SECTION_ORDER.map((sectionId) => document.getElementById(sectionId)).filter(
      (node): node is HTMLElement => Boolean(node)
    );

    if (!nodes.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = [...entries]
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const currentId = visibleEntry.target.id as (typeof SECTION_ORDER)[number];
        const currentIndex = SECTION_ORDER.indexOf(currentId);

        if (currentIndex === -1) {
          return;
        }

        if (!lastSectionRef.current) {
          lastSectionRef.current = currentId;
          return;
        }

        const lastIndex = SECTION_ORDER.indexOf(lastSectionRef.current as (typeof SECTION_ORDER)[number]);

        if (currentId === lastSectionRef.current || lastIndex === -1) {
          return;
        }

        const direction = currentIndex > lastIndex ? 1 : -1;
        const intensity = clamp(Math.abs(velocityRef.current) / 28 + 0.8, 0.85, 2.2);

        lastSectionRef.current = currentId;
        setHop({ active: true, direction, intensity });

        if (resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
        }

        const duration = clamp(900 + intensity * 450, 1000, 1700);

        resetTimerRef.current = window.setTimeout(() => {
          setHop((previous) => ({ ...previous, active: false }));
        }, duration);
      },
      {
        threshold: [0.18, 0.35, 0.55, 0.75],
        rootMargin: "-12% 0px -18% 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`galaxy-hop ${hop.active ? "is-active" : ""}`}
      style={{
        ["--hop-direction" as string]: String(hop.direction),
        ["--hop-intensity" as string]: String(hop.intensity),
      }}
    >
      <div className="galaxy-hop__background" />

      <div className="galaxy-hop__stage">
        <div className="galaxy-hop__mist" />
        <div className="galaxy-hop__nebula galaxy-hop__nebula-left" />
        <div className="galaxy-hop__nebula galaxy-hop__nebula-right" />

        {stars.map((star) => (
          <span
            key={star.id}
            className="galaxy-hop__star"
            style={{
              left: `${star.left * 100}%`,
              top: `${star.top * 100}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              ["--star-drift-x" as string]: `${(star.left - 0.5) * (120 + hop.intensity * 120) * hop.direction}px`,
              ["--star-drift-y" as string]: `${(star.top - 0.5) * (80 + hop.intensity * 90)}px`,
            }}
          />
        ))}

        <div className="galaxy-hop__warp" />
      </div>
    </div>
  );
}
