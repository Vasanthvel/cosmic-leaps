import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
}

export function Logo({
  className = "",
  href = "/",
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Cosmic Leaps Home"
      className={`flex flex-shrink-0 items-center transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Cosmic Leaps"
        width={560}
        height={120}
        priority
        className="h-16 w-auto object-contain md:h-20 lg:h-[5.5rem]"
      />
    </Link>
  );
}