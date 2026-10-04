import Link from "next/link";

import { Container } from "@/components/common";
import { siteConfig } from "@/config/site";

import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[rgba(6,12,24,0.16)]">
      <Container>
        <div className="flex min-w-0 flex-col gap-10 py-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full min-w-0 lg:w-auto lg:max-w-md">
            <Logo className="max-w-full" />

            <p className="mt-4 w-full min-w-0 max-w-md text-sm leading-7 text-white/75 [overflow-wrap:anywhere] [word-break:normal]">
              Premium software consulting company specializing in Website &
              Web Application Development, AI Solutions and Custom Analytics
              Platforms.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex w-full min-w-0 flex-col gap-3 lg:w-auto"
          >
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-w-0 max-w-full text-sm text-white/75 transition-colors hover:text-[#f0c77c] [overflow-wrap:anywhere] [word-break:normal]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="box-border w-full min-w-0 max-w-full border-t border-white/10 py-6 text-center text-sm leading-6 text-white/65 [overflow-wrap:anywhere] [word-break:normal]">
          © {new Date().getFullYear()} {siteConfig.companyName}. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
}