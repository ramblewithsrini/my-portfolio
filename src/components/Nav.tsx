"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { hasPublishedArticles } from "@/data/insights";
import { profile } from "@/data/portfolio";

// The same labels on every screen size: wide screens show them in the bar,
// phones in a menu, so nothing is shortened into something that reads differently.
const links: { href: string; label: string; wideOnly?: boolean }[] = [
  { href: "/", label: "About" },
  { href: "/what-i-bring", label: "How I can help" },
  { href: "/experience", label: "Experience" },
  { href: "/testimonials", label: "Testimonials" },
  // Shown once an article is published; in the bar on wider screens only, where space allows.
  ...(hasPublishedArticles ? [{ href: "/insights", label: "Insights", wideOnly: true }] : []),
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  // Close the phone menu after navigating, and on Escape.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          {profile.initials}
          <span className="text-accent">.</span>
          <span className="sr-only"> home</span>
        </Link>

        {/* Tablets and up: links in the bar */}
        <div className="hidden items-center gap-2 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm transition-colors lg:px-4 ${l.wideOnly ? "hidden md:inline-block" : ""} ${isActive(l.href) ? "text-foreground" : "text-muted hover:text-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#contact"
            className="ml-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-105"
          >
            Contact
          </a>
        </div>

        {/* Phones: a menu button */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="phone-menu"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium sm:hidden"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="relative block h-3 w-4">
            <span className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
            <span className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>
      </nav>

      {open && (
        <div id="phone-menu" className="border-t border-border bg-background/95 px-5 pb-6 pt-2 backdrop-blur-md sm:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-border/60">
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex items-center justify-between py-4 font-display text-xl font-bold tracking-tight ${isActive(l.href) ? "text-accent" : "text-foreground"}`}
                >
                  {l.label}
                  <span aria-hidden className="text-muted">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-accent px-5 py-3 text-center font-semibold text-background"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
