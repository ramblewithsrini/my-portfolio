"use client";

import { useState } from "react";

// Phones only: shows the start of a long section with a "Show more" button.
// Tablets and desktops always see everything; the clipping classes stop at md.
const heights = {
  sm: "max-h-[18rem]",
  md: "max-h-[31rem]",
  lg: "max-h-[44rem]",
};

export default function MobileMore({
  children,
  label,
  size = "md",
}: {
  children: React.ReactNode;
  label: string; // what the button reveals, e.g. "Show the full journey"
  size?: keyof typeof heights;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={open ? "" : `relative ${heights[size]} overflow-hidden md:max-h-none md:overflow-visible`}>
        {children}
        {!open && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent md:hidden"
            aria-hidden
          />
        )}
      </div>
      {!open && (
        <button
          type="button"
          aria-expanded={false}
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-full border border-border bg-surface py-3 font-semibold text-foreground transition-colors hover:border-accent md:hidden"
        >
          {label} <span aria-hidden>↓</span>
        </button>
      )}
    </div>
  );
}
