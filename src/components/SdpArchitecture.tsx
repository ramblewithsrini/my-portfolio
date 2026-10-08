// Logical architecture of a shared data platform for an insurer's customer data:
// producers → contracts → platform → applications and Snowflake.
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

// A horizontal arrow with an optional label above and below the line.
function Arrow({ x1, x2, y, above, below, color = MUTED, dashed = false }: {
  x1: number; x2: number; y: number; above?: string; below?: string; color?: string; dashed?: boolean;
}) {
  const mid = (x1 + x2) / 2;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - 2} y2={y} stroke={color} strokeWidth={1.6} strokeDasharray={dashed ? "4 4" : undefined} markerEnd="url(#sdp-arrow)" />
      {above && <text x={mid} y={y - 7} textAnchor="middle" fill={FG} fontSize={11.5} fontWeight={600}>{above}</text>}
      {below && <text x={mid} y={y + 16} textAnchor="middle" fill={MUTED} fontSize={11}>{below}</text>}
    </g>
  );
}

function VArrow({ x, y1, y2, color = MUTED, dashed = false }: { x: number; y1: number; y2: number; color?: string; dashed?: boolean }) {
  return <line x1={x} y1={y1} x2={x} y2={y2 - 2} stroke={color} strokeWidth={1.6} strokeDasharray={dashed ? "4 4" : undefined} markerEnd="url(#sdp-arrow)" />;
}

const producers = [
  { title: "Self-service portal", sub: "Policyholders, drivers", via: ["API calls", "real time"] },
  { title: "Policy systems", sub: "Motor and home cover", via: ["Events", "streaming"] },
  { title: "Marketing team", sub: "Promotions, responses", via: ["ETL", "nightly batch"] },
  { title: "Third-party data", sub: "D&B, LexisNexis", via: ["ETL / API", "files, lookups"] },
];

export default function SdpArchitecture() {
  const py = (n: number) => 70 + n * 92; // producer box top
  const ph = 60;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-background p-4">
      <svg
        viewBox="0 0 1040 600"
        className="min-w-[760px] w-full"
        role="img"
        aria-label="Producers send data through ETL, events and API calls into data contracts. The shared data platform validates, matches and serves it to customer applications through API calls, and loads Snowflake through ELT for reporting and machine learning. Data governance and executive leadership sit across the whole flow."
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <defs>
          <marker id="sdp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MUTED} />
          </marker>
        </defs>

        {/* Column headings */}
        {[
          [110, "PRODUCERS"],
          [362, "CONTRACTS"],
          [560, "SHARED DATA PLATFORM"],
          [910, "CONSUMERS"],
        ].map(([x, t]) => (
          <text key={t} x={x} y={30} textAnchor="middle" fill={ACCENT} fontSize={12} fontWeight={700} letterSpacing={1.5}>
            {t}
          </text>
        ))}

        {/* Producers and how each one sends data */}
        {producers.map((p, n) => (
          <g key={p.title}>
            <Box x={20} y={py(n)} w={180} h={ph} title={p.title} sub={p.sub} />
            <Arrow x1={200} x2={340} y={py(n) + ph / 2} above={p.via[0]} below={p.via[1]} />
          </g>
        ))}

        {/* Contract gate */}
        <rect x={340} y={70} width={44} height={336} rx={10} fill={SURFACE} stroke={ACCENT2} />
        <text
          transform="translate(367 238) rotate(-90)"
          textAnchor="middle"
          fill={FG}
          fontSize={12.5}
          fontWeight={700}
          letterSpacing={0.5}
        >
          DATA CONTRACTS · VALIDATION
        </text>
        <VArrow x={362} y1={406} y2={450} dashed />
        <Box x={302} y={450} w={120} h={52} title="Quarantine" sub="back to producer" />
        <Arrow x1={384} x2={420} y={238} />

        {/* The platform */}
        <rect x={420} y={50} width={280} height={452} rx={14} fill="none" stroke={ACCENT} strokeWidth={1.5} />
        <Box x={438} y={70} w={244} h={58} title="Customer view" sub="Matching and master data" />
        <Box x={438} y={140} w={244} h={58} title="Canonical model" sub="Customer, policy, claim, campaign" />
        <Box x={438} y={210} w={244} h={58} title="Quality and lineage" sub="Checks and source-to-use trail" />
        <Box x={438} y={280} w={244} h={58} title="Access and privacy" sub="Consent, masking, audit" />
        <Box x={438} y={420} w={244} h={62} title="Serving layer" sub="APIs and events, with published SLOs" stroke={ACCENT} />
        <VArrow x={560} y1={338} y2={420} />

        {/* Consumers: applications via API calls */}
        <rect x={790} y={50} width={230} height={230} rx={14} fill="none" stroke={BORDER} />
        <text x={905} y={74} textAnchor="middle" fill={MUTED} fontSize={11.5}>Customer applications</text>
        <Box x={806} y={88} w={198} h={50} title="Quote and buy" />
        <Box x={806} y={148} w={198} h={50} title="Policy and renewals" />
        <Box x={806} y={208} w={198} h={50} title="Claims and service" />
        <path d="M682 440 H740 V165 H788" fill="none" stroke={ACCENT} strokeWidth={1.6} markerEnd="url(#sdp-arrow)" />
        <text transform="translate(724 300) rotate(-90)" textAnchor="middle" fill={FG} fontSize={11.5} fontWeight={600}>
          API calls and events
        </text>

        {/* Consumers: analytics via Snowflake */}
        <Box x={790} y={330} w={230} h={64} title="Snowflake (OLAP)" sub="Full history, shaped for questions" stroke={ACCENT2} />
        <path d="M682 470 H770 V362 H788" fill="none" stroke={MUTED} strokeWidth={1.6} markerEnd="url(#sdp-arrow)" />
        <text x={770} y={490} fill={FG} fontSize={11.5} fontWeight={600} textAnchor="middle">ELT / CDC</text>
        <text x={770} y={505} fill={MUTED} fontSize={11} textAnchor="middle">scheduled, near real time</text>
        <VArrow x={850} y1={394} y2={430} />
        <VArrow x={960} y1={394} y2={430} />
        <Box x={790} y={430} w={110} h={48} title="BI & reports" />
        <Box x={910} y={430} w={110} h={48} title="Pricing & ML" />

        {/* Across everything */}
        <rect x={20} y={530} width={1000} height={56} rx={12} fill={SURFACE} stroke={BORDER} />
        <line x1={520} y1={540} x2={520} y2={576} stroke={BORDER} />
        <text x={270} y={554} textAnchor="middle" fill={ACCENT2} fontSize={12.5} fontWeight={700}>DATA GOVERNANCE</text>
        <text x={270} y={572} textAnchor="middle" fill={MUTED} fontSize={11.5}>Owners, definitions, privacy policy, enforced as pipeline checks</text>
        <text x={770} y={554} textAnchor="middle" fill={ACCENT2} fontSize={12.5} fontWeight={700}>EXECUTIVE LEADERSHIP</text>
        <text x={770} y={572} textAnchor="middle" fill={MUTED} fontSize={11.5}>Funding as a product, mandate, tie-breaks</text>
      </svg>
    </div>
  );
}
