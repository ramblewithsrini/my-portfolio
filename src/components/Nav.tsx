"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasPublishedArticles } from "@/data/insights";
import { profile } from "@/data/portfolio";

// `short` is the label shown on phones, where space is tight.
const links: { href: string; label: string; short?: string; wideOnly?: boolean }[] = [
  { href: "/", label: "About" },
  { href: "/what-i-bring", label: "What I bring", short: "Value" },
  { href: "/experience", label: "Experience", short: "Career" },
  { href: "/testimonials", label: "Testimonials" },
  // Shown once an article is published; wider screens only (the phone nav is full).
  ...(hasPublishedArticles ? [{ href: "/insights", label: "Insights", wideOnly: true }] : []),
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
        >
          {profile.initials}
          <span className="text-accent">.</span>
          <span className="sr-only"> home</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-2 py-2 text-sm transition-colors sm:px-3 lg:px-4 ${l.wideOnly ? "hidden md:inline-block" : ""} ${active ? "text-foreground" : "text-muted hover:text-foreground"}`}
              >
                {l.short ? (
                  <>
                    <span className="sm:hidden">{l.short}</span>
                    <span className="hidden sm:inline">{l.label}</span>
                  </>
                ) : (
                  l.label
                )}
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
