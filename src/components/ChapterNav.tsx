"use client";

import { useEffect, useState } from "react";

type Chapter = { id: string; number: string; title: string };

// Sticky chapter navigator: highlights the chapter in view and shows reading
// progress through the chapters.
export default function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    // The active chapter is the last one whose top has passed the middle of
    // the viewport; progress runs from the first chapter's top to the end of
    // the last.
    const onScroll = () => {
      const first = els[0];
      const last = els[els.length - 1];
      if (!first || !last) return;
      const line = window.scrollY + window.innerHeight / 2;
      const current = els.filter((el) => el.offsetTop <= line).pop();
      setActive(current && line < last.offsetTop + last.offsetHeight ? current.id : null);
      const p = (line - first.offsetTop) / (last.offsetTop + last.offsetHeight - first.offsetTop);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  return (
    <nav
      aria-label="About page chapters"
      className="sticky top-16 z-40 border-y border-border bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto max-w-6xl overflow-x-auto px-5 sm:px-8">
        <ol className="flex w-max min-w-full gap-1 py-2 sm:justify-between">
          {chapters.map((c) => {
            const isActive = active === c.id;
            return (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 ${
                    isActive
                      ? "bg-accent font-semibold text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <span className={isActive ? "" : "text-accent"}>{c.number}</span>
                  {c.title}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
      <div
        className="h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
    </nav>
  );
}
