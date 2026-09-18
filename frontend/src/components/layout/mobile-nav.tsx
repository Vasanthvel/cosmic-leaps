"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui";

import { Logo } from "./logo";

export function MobileNav() {
  const activeSection = useActiveSection();
  const mobileNavigation = [
    { label: "Home", href: "/" },
    ...siteConfig.navigation,
  ];

  return (
    <div className="lg:hidden">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            aria-label="Open Navigation"
            className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-slate-950/60 text-white opacity-100 shadow-[0_8px_20px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-all duration-200 hover:border-[#f0c77c]/70 hover:bg-slate-900/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c77c]"
          >
            <Menu className="h-5 w-5 text-white opacity-100" strokeWidth={2.5} />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-slate-950/55 backdrop-blur-[2px]" />

          <Dialog.Content className="fixed right-3 top-3 z-[90] flex h-[calc(100vh-1.5rem)] w-[min(88vw,22rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(6,12,24,0.97)] shadow-[0_24px_80px_rgba(2,6,23,0.72)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <Logo className="max-w-[160px]" />

              <Dialog.Close asChild>
                <button
                  aria-label="Close Navigation"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white opacity-100 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c77c]"
                >
                  <X className="h-5 w-5 text-white opacity-100" strokeWidth={2.5} />
                </button>
              </Dialog.Close>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
              {mobileNavigation.map((item) => {
                const isHome = item.href === "/";
                const isActive = isHome
                  ? activeSection === "hero" || activeSection === ""
                  : activeSection === item.href.replace("#", "");

                return (
                  <Dialog.Close
                    asChild
                    key={item.href || item.label}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-slate-200 hover:bg-white/5 hover:text-[#f0c77c]",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </Dialog.Close>
                );
              })}
            </nav>

            <div className="border-t border-white/10 px-4 py-4">
              <Button
                asChild
                className="w-full !border-[1.5px] !border-white/20 !bg-white/95 !text-[var(--brand-navy)] shadow-[0_8px_20px_rgba(30,42,90,0.12)] transition-all duration-300 ease-out hover:!-translate-y-0.5 hover:!border-[var(--brand-green)] hover:!bg-[var(--brand-green)] hover:!text-white hover:shadow-[0_12px_24px_rgba(76,175,80,0.22)] active:scale-[0.98]"
              >
                <Link href="#contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}