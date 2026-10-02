"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/portfolio";

const links = [
  { href: "/", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/testimonials", label: "Testimonials" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
          aria-label="Home"
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => {
            const active = l.href === pathname;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-2.5 py-2 text-sm transition-colors sm:px-4 ${active ? "text-foreground" : "text-muted hover:text-foreground"}`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="#contact"
            className="ml-1 hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-105 sm:block"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
