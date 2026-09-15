import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  container?: boolean;
}

export function Section({
  id,
  container = true,
  className,
  children,
  ...props
}: SectionProps) {
  const content = container ? (
    <Container>{children}</Container>
  ) : (
    children
  );

  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        className
      )}
      {...props}
    >
      {content}
    </section>
  );
}