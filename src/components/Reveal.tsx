"use client";

import { useEffect, useRef } from "react";

// Fades children in when scrolled into view. Pass `intro` for above-the-fold
// content: it animates on page load with pure CSS, so it never waits on JS.
export default function Reveal({
  children,
  delay = 0,
  className = "",
  intro = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  intro?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || intro) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [intro]);

  return (
    <div
      ref={ref}
      className={`${intro ? "intro" : "reveal"} ${className}`}
      style={intro ? { animationDelay: `${delay}ms` } : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
