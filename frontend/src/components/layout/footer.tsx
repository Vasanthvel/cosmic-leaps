import Link from "next/link";

import { Container } from "@/components/common";
import { siteConfig } from "@/config/site";

import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container>
        <div className="flex flex-col gap-10 py-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Logo />

            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--text-secondary)]">
              Premium software consulting company specializing in Website &
              Web Application Development, AI Solutions and Custom Analytics
              Platforms.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-col gap-3"
          >
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-green)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-[var(--border)] py-6 text-center text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} {siteConfig.companyName}. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
}