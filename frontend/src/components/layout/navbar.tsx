"use client";

import Link from "next/link";

import { Container } from "@/components/common";
import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui";

import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const activeSection = useActiveSection();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(6,12,24,0.62)]">
      <Container>
        <div className="flex h-28 items-center justify-between">
          <Logo />

          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-6 lg:flex"
          >
            {siteConfig.navigation.map((item) => {
              const isActive =
                activeSection === item.href.replace("#", "");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : "text-slate-200 hover:text-[#f0c77c]",
                  ].join(" ")}
                >
                  {item.label}

                  <span
                    className={[
                      "absolute -bottom-2 left-0 h-0.5 rounded-full bg-[var(--brand-green)] transition-all duration-300",
                      isActive ? "w-full" : "w-0",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              asChild
              className="!border-[1.5px] !border-white/20 !bg-white/95 !text-[var(--brand-navy)] shadow-[0_8px_20px_rgba(30,42,90,0.12)] transition-all duration-300 ease-out hover:!-translate-y-0.5 hover:!border-[var(--brand-green)] hover:!bg-[var(--brand-green)] hover:!text-white hover:shadow-[0_12px_24px_rgba(76,175,80,0.22)] active:scale-[0.98]"
            >
              <Link href="#contact">
                Contact Us
              </Link>
            </Button>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}