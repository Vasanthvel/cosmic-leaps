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

  return (
    <div className="lg:hidden">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            aria-label="Open Navigation"
            className="rounded-lg p-2 transition hover:bg-[var(--surface)]"
          >
            <Menu className="h-6 w-6" />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />

          <Dialog.Content className="fixed right-0 top-0 flex h-full w-80 flex-col bg-[var(--background)] shadow-xl">
            <div className="flex items-center justify-between border-b p-6">
              <Logo />

              <Dialog.Close asChild>
                <button
                  aria-label="Close Navigation"
                  className="rounded-lg p-2 transition hover:bg-[var(--surface)]"
                >
                  <X className="h-6 w-6" />
                </button>
              </Dialog.Close>
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-6">
              {siteConfig.navigation.map((item) => {
                const isActive =
                  activeSection === item.href.replace("#", "");

                return (
                  <Dialog.Close
                    asChild
                    key={item.href}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "rounded-lg px-4 py-3 transition-colors duration-200",
                        isActive
                          ? "bg-[#EEF7EE] font-medium text-[var(--brand-navy)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--brand-green)]",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </Dialog.Close>
                );
              })}
            </nav>

            <div className="border-t p-6">
              <Button
                asChild
                className="w-full"
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