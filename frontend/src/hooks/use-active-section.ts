"use client";

import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );

    if (!sections.length) {
      return;
    }

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140;

      let current = sections[0].id;

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveSection((previous) =>
        previous === current ? previous : current
      );
    };

    updateActiveSection();

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return activeSection;
}