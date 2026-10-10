"use client";

import { useEffect, useState } from "react";

// Phones only: a floating button back to the top once you've scrolled a long way.
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/90 text-lg font-bold text-foreground shadow-lg backdrop-blur-md transition-opacity md:hidden ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      ↑
    </a>
  );
}
