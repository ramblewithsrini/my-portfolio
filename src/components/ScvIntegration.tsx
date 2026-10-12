// Architecture view of the single customer view: the integration pattern each
// source and consumer used (APIs, XML events, batch ETL). Companion to the
// logical view in ScvArchitecture. One SVG; scrolls sideways on narrow phones.

const ACCENT = "var(--accent)";
const ACCENT2 = "var(--accent-2)";
const BORDER = "var(--border)";
const SURFACE = "var(--surface)";
const FG = "var(--foreground)";
const MUTED = "var(--muted)";

// Line styles, one per integration pattern (also drawn in the legend).
const API = { stroke: ACCENT, strokeWidth: 1.8 };
const EVENT = { stroke: ACCENT2, strokeWidth: 1.8, strokeDasharray: "7 4" };
const BATCH = { stroke: MUTED, strokeWidth: 2, strokeDasharray: "1.5 4", strokeLinecap: "round" as const };
const SERVICE = { stroke: MUTED, strokeWidth: 1.6 };

function Box({
  x, y, w, h, title, sub, stroke = BORDER,
}: {
  x: number; y: number; w: number; h: number; title: string; sub?: string; stroke?: string;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={SURFACE} stroke={stroke} />
      <text x={cx} y={sub ? y + h / 2 - 4 : y + h / 2 + 5} textAnchor="middle" fill={FG} fontSize={13.5} fontWeight={700}>
        {title}
      </text>
      {sub && (
        <text x={cx} y={y + h / 2 + 14} textAnchor="middle" fill={MUTED} fontSize={11}>
          {sub}
        </text>
      )}
    </g>
  );
}

export default function ScvIntegration() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-background p-4">
      <svg
        viewBox="0 0 1100 560"
        className="min-w-[780px] w-full"
        role="img"
        aria-label="Architecture view. Policy systems, other customer systems and Royal Mail address data feed the MDM engine; third-party data providers enrich it through a daily batch feed and an on-demand API. Data stewards review matches in the MDM screens, resurfaced for them. Our orchestration services write the single customer view to the consumer data store. From there, API services answer real-time queries from digital channels and next best action; every change is published as an XML event to subscribing systems; and batch ETL loads the data lake for analytics and the MarTech platform for marketing."
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <defs>
          {[["scvi-api", ACCENT], ["scvi-event", ACCENT2], ["scvi-muted", MUTED]].map(([id, fill]) => (
            <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill={fill} />
            </marker>
          ))}
        </defs>

        {/* Column headings */}
        {[
          [115, "SOURCES"],
          [370, "MASTER DATA"],
          [635, "CUSTOMER DATA LAYER"],
          [980, "CONSUMERS"],
        ].map(([x, t]) => (
          <text key={t} x={x} y={30} textAnchor="middle" fill={ACCENT} fontSize={12} fontWeight={700} letterSpacing={1.5}>
            {t}
          </text>
        ))}

        {/* Sources */}
        <Box x={20} y={70} w={190} h={56} title="Policy systems" sub="Trusted source" stroke={ACCENT} />
        <Box x={20} y={140} w={190} h={56} title="Other customer systems" sub="Duplicates, gaps" />
        <Box x={20} y={210} w={190} h={56} title="Address reference" sub="Royal Mail PAF" />
        <Box x={20} y={330} w={190} h={70} title="Third-party enrichment" sub="Daily feed, on demand" />
        {[98, 168, 238].map((y) => (
          <line key={y} x1={210} y1={y} x2={283} y2={y} {...SERVICE} markerEnd="url(#scvi-muted)" />
        ))}
        <path d="M210 352 H240 V268 H283" fill="none" {...API} markerEnd="url(#scvi-api)" />
        <path d="M210 380 H254 V286 H283" fill="none" {...BATCH} markerEnd="url(#scvi-muted)" />

        {/* MDM: internal only */}
        <rect x={265} y={50} width={210} height={410} rx={14} fill="none" stroke={MUTED} strokeDasharray="5 5" />
        <text x={370} y={66} textAnchor="middle" fill={MUTED} fontSize={11}>Internal only, never exposed</text>
        <rect x={285} y={76} width={170} height={224} rx={10} fill={SURFACE} stroke={ACCENT2} />
        <text x={370} y={170} textAnchor="middle" fill={FG} fontSize={15} fontWeight={700}>MDM engine</text>
        <text x={370} y={190} textAnchor="middle" fill={MUTED} fontSize={11}>Match, merge, survivorship,</text>
        <text x={370} y={205} textAnchor="middle" fill={MUTED} fontSize={11}>households</text>
        <line x1={370} y1={300} x2={370} y2={368} stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 4" markerEnd="url(#scvi-muted)" />
        <text x={378} y={338} fill={FG} fontSize={11} fontWeight={600}>Score below 90</text>
        <Box x={285} y={370} w={170} h={64} title="Steward UI" sub="MDM screens, resurfaced" />

        {/* MDM to our layer */}
        <line x1={455} y1={150} x2={548} y2={150} {...SERVICE} markerEnd="url(#scvi-muted)" />
        <text x={500} y={140} textAnchor="middle" fill={FG} fontSize={11} fontWeight={600}>services</text>

        {/* Customer data layer */}
        <rect x={530} y={50} width={210} height={480} rx={14} fill="none" stroke={ACCENT} strokeWidth={1.5} />
        <Box x={550} y={120} w={170} h={60} title="Orchestration" sub="Our services, our rules" />
        <line x1={635} y1={180} x2={635} y2={206} {...SERVICE} markerEnd="url(#scvi-muted)" />
        <Box x={550} y={208} w={170} h={60} title="Single customer view" sub="Consumer data store" stroke={ACCENT} />
        {/* Spine from the store to the three outlets */}
        <path d="M635 268 V276 H545 V476" fill="none" {...SERVICE} />
        {[310, 393, 476].map((y) => (
          <line key={y} x1={545} y1={y} x2={548} y2={y} {...SERVICE} />
        ))}
        <Box x={550} y={284} w={170} h={52} title="API services" sub="Query a customer" stroke={ACCENT} />
        <Box x={550} y={367} w={170} h={52} title="Events (XML)" sub="Publish every change" stroke={ACCENT2} />
        <Box x={550} y={450} w={170} h={52} title="ETL (batch)" sub="Scheduled loads" />

        {/* Outlets to consumers */}
        <path d="M720 310 H800" fill="none" {...API} />
        <path d="M800 262 V326" fill="none" {...API} />
        <path d="M800 262 H878" fill="none" {...API} markerEnd="url(#scvi-api)" />
        <path d="M800 326 H878" fill="none" {...API} markerEnd="url(#scvi-api)" />
        <path d="M720 393 H878" fill="none" {...EVENT} markerEnd="url(#scvi-event)" />
        <path d="M720 476 H800" fill="none" {...BATCH} />
        <path d="M800 457 V521" fill="none" {...BATCH} />
        <path d="M800 457 H878" fill="none" {...BATCH} markerEnd="url(#scvi-muted)" />
        <path d="M800 521 H878" fill="none" {...BATCH} markerEnd="url(#scvi-muted)" />

        {/* Consumers */}
        <Box x={880} y={236} w={200} h={52} title="Digital channels and apps" stroke={ACCENT} />
        <Box x={880} y={300} w={200} h={52} title="Next best action" stroke={ACCENT} />
        <Box x={880} y={367} w={200} h={52} title="Subscribing systems" sub="Notified of every change" stroke={ACCENT2} />
        <Box x={880} y={431} w={200} h={52} title="Data lake" sub="Analytics, performance" />
        <Box x={880} y={495} w={200} h={52} title="MarTech platform" sub="Marketing campaigns" />

        {/* Legend */}
        <rect x={880} y={56} width={200} height={156} rx={12} fill={SURFACE} stroke={BORDER} />
        <text x={898} y={80} fill={MUTED} fontSize={11} fontWeight={700} letterSpacing={1}>HOW DATA MOVES</text>
        {[
          [API, "scvi-api", "API (real time)"],
          [EVENT, "scvi-event", "Event (XML, publish)"],
          [BATCH, "scvi-muted", "ETL / feed (batch)"],
          [SERVICE, "scvi-muted", "Internal service"],
        ].map(([style, marker, label], i) => (
          <g key={label as string}>
            <line x1={898} y1={104 + i * 28} x2={938} y2={104 + i * 28} {...(style as object)} markerEnd={`url(#${marker})`} />
            <text x={948} y={108 + i * 28} fill={FG} fontSize={12}>{label as string}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
