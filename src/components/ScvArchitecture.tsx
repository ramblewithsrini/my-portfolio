// Single customer view at an insurer: sources -> MDM (hidden matching engine)
// -> our own orchestration and storage layer -> APIs and events -> consumers.
// Drawn as one SVG so the arrows line up; scrolls sideways on narrow phones.

const ACCENT = "var(--accent)";
const ACCENT2 = "var(--accent-2)";
const BORDER = "var(--border)";
const SURFACE = "var(--surface)";
const FG = "var(--foreground)";
const MUTED = "var(--muted)";

function Box({
  x, y, w, h, title, sub, stroke = BORDER, fill = SURFACE,
}: {
  x: number; y: number; w: number; h: number; title: string; sub?: string; stroke?: string; fill?: string;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} />
      <text x={cx} y={sub ? y + h / 2 - 4 : y + h / 2 + 5} textAnchor="middle" fill={FG} fontSize={14} fontWeight={700}>
        {title}
      </text>
      {sub && (
        <text x={cx} y={y + h / 2 + 14} textAnchor="middle" fill={MUTED} fontSize={11.5}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, x2, y, color = MUTED }: { x1: number; x2: number; y: number; color?: string }) {
  return <line x1={x1} y1={y} x2={x2 - 2} y2={y} stroke={color} strokeWidth={1.6} markerEnd="url(#scv-arrow)" />;
}

const sources = [
  { title: "Policy systems", sub: "Trusted source" },
  { title: "Other customer systems", sub: "Duplicates, gaps" },
  { title: "Address reference", sub: "Royal Mail PAF" },
];

const consumers = [
  { title: "MarTech platform", sub: "Campaigns, cross-sell" },
  { title: "Next best action", sub: "What to offer next" },
  { title: "Surveys", sub: "Customer feedback" },
  { title: "Performance analytics", sub: "How the business is doing" },
];

export default function ScvArchitecture() {
  const sy = (n: number) => 80 + n * 100; // source box top
  const cy = (n: number) => 70 + n * 82; // consumer box top
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-background p-4">
      <svg
        viewBox="0 0 1040 560"
        className="min-w-[760px] w-full"
        role="img"
        aria-label="Policy systems, other customer systems and address reference data feed the MDM engine, which matches and merges records and builds households. Matches scoring 90 or more merge automatically; the rest go to data stewards. MDM is internal only: an orchestration layer writes the single customer view to the consumer data store, and consumers reach it only through APIs and events. Consumers are the MarTech platform, next best action, surveys and performance analytics."
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <defs>
          <marker id="scv-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MUTED} />
          </marker>
        </defs>

        {/* Column headings */}
        {[
          [110, "SOURCES"],
          [355, "MATCHING ENGINE"],
          [620, "OUR CUSTOMER DATA LAYER"],
          [905, "CONSUMERS"],
        ].map(([x, t]) => (
          <text key={t} x={x} y={30} textAnchor="middle" fill={ACCENT} fontSize={12} fontWeight={700} letterSpacing={1.5}>
            {t}
          </text>
        ))}

        {/* Sources into MDM */}
        {sources.map((s, n) => (
          <g key={s.title}>
            <Box x={20} y={sy(n)} w={180} h={60} title={s.title} sub={s.sub} stroke={n === 0 ? ACCENT : BORDER} />
            <Arrow x1={200} x2={250} y={sy(n) + 30} />
          </g>
        ))}

        {/* MDM: internal only */}
        <rect x={250} y={50} width={210} height={300} rx={14} fill="none" stroke={MUTED} strokeDasharray="5 5" />
        <text x={355} y={70} textAnchor="middle" fill={MUTED} fontSize={11.5}>Internal only, never exposed</text>
        <Box x={266} y={84} w={178} h={60} title="MDM engine" sub="Matching, merging" stroke={ACCENT2} />
        <Box x={266} y={156} w={178} h={56} title="Survivorship" sub="Best field wins" />
        <Box x={266} y={224} w={178} h={56} title="Households" sub="Same home, same family" />
        <line x1={355} y1={280} x2={355} y2={368} stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 4" markerEnd="url(#scv-arrow)" />
        <text x={364} y={322} fill={FG} fontSize={11.5} fontWeight={600}>Score below 90</text>
        <Box x={266} y={370} w={178} h={58} title="Data stewards" sub="Review, and sample merges" />
        <text x={355} y={452} textAnchor="middle" fill={MUTED} fontSize={11.5}>90 or more merges automatically</text>

        {/* Orchestration and storage */}
        <Arrow x1={460} x2={520} y={200} color={ACCENT} />
        <text x={490} y={190} textAnchor="middle" fill={FG} fontSize={11} fontWeight={600}>services</text>
        <rect x={520} y={50} width={200} height={300} rx={14} fill="none" stroke={ACCENT} strokeWidth={1.5} />
        <Box x={536} y={84} w={168} h={64} title="Orchestration" sub="Our services, our rules" />
        <line x1={620} y1={148} x2={620} y2={184} stroke={MUTED} strokeWidth={1.6} markerEnd="url(#scv-arrow)" />
        <Box x={536} y={186} w={168} h={64} title="Single customer view" sub="Consumer data store" stroke={ACCENT} />
        <line x1={620} y1={250} x2={620} y2={284} stroke={MUTED} strokeWidth={1.6} markerEnd="url(#scv-arrow)" />
        <Box x={536} y={286} w={168} h={52} title="APIs and events" sub="The only way in" stroke={ACCENT} />

        {/* Consumers */}
        <path d="M704 312 H752 V100 H788" fill="none" stroke={ACCENT} strokeWidth={1.6} markerEnd="url(#scv-arrow)" />
        {consumers.map((c, n) => (
          <g key={c.title}>
            {n > 0 && <path d={`M752 ${cy(n) + 29} H788`} fill="none" stroke={ACCENT} strokeWidth={1.6} markerEnd="url(#scv-arrow)" />}
            <Box x={790} y={cy(n)} w={230} h={58} title={c.title} sub={c.sub} stroke={n < 2 ? ACCENT2 : BORDER} />
          </g>
        ))}
        <line x1={752} y1={100} x2={752} y2={cy(3) + 29} stroke={ACCENT} strokeWidth={1.6} />

        {/* Across everything */}
        <rect x={20} y={480} width={1000} height={60} rx={12} fill={SURFACE} stroke={BORDER} />
        <line x1={520} y1={490} x2={520} y2={530} stroke={BORDER} />
        <text x={270} y={505} textAnchor="middle" fill={ACCENT2} fontSize={12.5} fontWeight={700}>WHY HIDE THE ENGINE</text>
        <text x={270} y={523} textAnchor="middle" fill={MUTED} fontSize={11.5}>Customise freely, and change MDM without breaking anyone</text>
        <text x={770} y={505} textAnchor="middle" fill={ACCENT2} fontSize={12.5} fontWeight={700}>WHO DECIDES</text>
        <text x={770} y={523} textAnchor="middle" fill={MUTED} fontSize={11.5}>The business owns the merge threshold; stewards check the results</text>
      </svg>
    </div>
  );
}
