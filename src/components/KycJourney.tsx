// Onboarding a business, drawn as a service blueprint: the journey across the top,
// then what the applicant sees, what the platform does and who decides, with the
// feedback loop that tunes screening underneath. One SVG; scrolls sideways on phones.

const ACCENT = "var(--accent)";
const ACCENT2 = "var(--accent-2)";
const BORDER = "var(--border)";
const SURFACE = "var(--surface)";
const FG = "var(--foreground)";
const MUTED = "var(--muted)";

function Card({
  x, y, w, h, title, lines = [], stroke = BORDER,
}: {
  x: number; y: number; w: number; h: number; title?: string; lines?: string[]; stroke?: string;
}) {
  const cx = x + w / 2;
  const block = (title ? 18 : 0) + lines.length * 15;
  const top = y + (h - block) / 2 + 12;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={SURFACE} stroke={stroke} />
      {title && (
        <text x={cx} y={top} textAnchor="middle" fill={FG} fontSize={13} fontWeight={700}>
          {title}
        </text>
      )}
      {lines.map((l, n) => (
        <text key={l} x={cx} y={top + (title ? 18 : 0) + n * 15} textAnchor="middle" fill={MUTED} fontSize={11.5}>
          {l}
        </text>
      ))}
    </g>
  );
}

const W = 152;
const GAP = 14;
const X0 = 130;
const col = (n: number) => X0 + n * (W + GAP);

const stages = ["1  Apply", "2  Resolve", "3  Screen", "4  Ownership", "5  Decide", "6  Monitor"];

const sees: string[][] = [
  ["One form,", "asked once"],
  ["Status visible", "at every step"],
  ["No repeated", "questions"],
  ["Nothing extra", "to upload"],
  ["A clear,", "explained outcome"],
  ["Account live,", "watched quietly"],
];

const does: { title: string; lines: string[]; accent?: boolean }[] = [
  { title: "Capture once", lines: ["Registration no.,", "directors, address,", "structured"], accent: true },
  { title: "Resolve entity", lines: ["Name + date of birth", "+ country + reg. no.,", "standardised"], accent: true },
  { title: "Screen identity", lines: ["Resolved entity vs", "sanctions and", "watchlists"] },
  { title: "Ownership graph", lines: ["Follow chains to", "beneficial owners;", "spot shared directors"] },
  { title: "Rank and explain", lines: ["Rules + ML order", "alerts and show", "the evidence"] },
  { title: "Monitor", lines: ["Transactions linked", "to the right customer", "and owners"] },
];

const decides: (string[] | null)[] = [
  null,
  null,
  ["Analyst reviews", "strong matches"],
  ["Analyst confirms", "owners"],
  ["Risk and compliance", "decide, with audit trail"],
  ["Analysts work", "monitoring alerts"],
];

export default function KycJourney() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-background p-4">
      <svg
        viewBox="0 0 1140 560"
        className="min-w-[820px] w-full"
        role="img"
        aria-label="A six-step journey for onboarding a business: apply, resolve, screen, ownership, decide and monitor. The applicant fills in one form once, sees their status at every step and gets a clear outcome. The platform captures structured data once, resolves the entity on name, date of birth, country and registration number, screens the resolved identity against sanctions and watchlists, follows ownership chains to beneficial owners in a graph, ranks and explains alerts with rules and machine learning, and monitors transactions linked to the right customer. People decide: analysts review strong matches and confirm owners, and risk and compliance make the decision with an audit trail. Every closed alert feeds back to tune matching and thresholds against precision and recall."
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <defs>
          <marker id="kyc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MUTED} />
          </marker>
          <marker id="kyc-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
          </marker>
        </defs>

        {/* Lane labels */}
        {[
          [62, ["JOURNEY"]],
          [138, ["APPLICANT", "SEES"]],
          [246, ["PLATFORM", "DOES"]],
          [356, ["PEOPLE", "DECIDE"]],
        ].map(([y, lines]) => (
          <text key={(lines as string[])[0]} x={20} y={y as number} fill={ACCENT} fontSize={11} fontWeight={700} letterSpacing={1.2}>
            {(lines as string[]).map((l, n) => (
              <tspan key={l} x={20} dy={n === 0 ? 0 : 15}>
                {l}
              </tspan>
            ))}
          </text>
        ))}
        <line x1={20} y1={95} x2={1120} y2={95} stroke={BORDER} />
        <line x1={20} y1={190} x2={1120} y2={190} stroke={BORDER} />
        <line x1={20} y1={312} x2={1120} y2={312} stroke={BORDER} />
        <line x1={20} y1={410} x2={1120} y2={410} stroke={BORDER} />

        {/* Journey stages with arrows between them */}
        {stages.map((s, n) => (
          <g key={s}>
            <rect x={col(n)} y={40} width={W} height={36} rx={18} fill="none" stroke={ACCENT} strokeWidth={1.5} />
            <text x={col(n) + W / 2} y={63} textAnchor="middle" fill={FG} fontSize={13} fontWeight={700}>
              {s}
            </text>
            {n < stages.length - 1 && (
              <line x1={col(n) + W + 1} y1={58} x2={col(n + 1) - 1} y2={58} stroke={ACCENT} strokeWidth={1.6} markerEnd="url(#kyc-arrow-accent)" />
            )}
          </g>
        ))}

        {/* What the applicant sees */}
        {sees.map((lines, n) => (
          <Card key={`s${n}`} x={col(n)} y={110} w={W} h={66} lines={lines} />
        ))}

        {/* What the platform does */}
        {does.map((d, n) => (
          <g key={d.title}>
            <Card x={col(n)} y={204} w={W} h={94} title={d.title} lines={d.lines} stroke={d.accent ? ACCENT2 : BORDER} />
            {n < does.length - 1 && (
              <line x1={col(n) + W + 1} y1={251} x2={col(n + 1) - 1} y2={251} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#kyc-arrow)" />
            )}
          </g>
        ))}

        {/* Who decides */}
        {decides.map((lines, n) =>
          lines ? (
            <g key={`d${n}`}>
              <line x1={col(n) + W / 2} y1={298} x2={col(n) + W / 2} y2={326} stroke={MUTED} strokeWidth={1.4} markerEnd="url(#kyc-arrow)" />
              <Card x={col(n)} y={328} w={W} h={66} lines={lines} stroke={n === 4 ? ACCENT : BORDER} />
            </g>
          ) : (
            <text key={`d${n}`} x={col(n) + W / 2} y={366} textAnchor="middle" fill={MUTED} fontSize={11.5} fontStyle="italic">
              automated, data only
            </text>
          ),
        )}

        {/* Feedback loop */}
        <path
          d={`M${col(5) + W / 2} 394 V448 H${col(1) + W - 10} V302`}
          fill="none"
          stroke={ACCENT}
          strokeWidth={1.6}
          strokeDasharray="6 5"
          markerEnd="url(#kyc-arrow-accent)"
        />
        <text x={(col(1) + col(5) + W) / 2} y={440} textAnchor="middle" fill={FG} fontSize={12} fontWeight={600}>
          Every closed alert feeds back: tune matching and thresholds on precision and recall
        </text>

        {/* Principles */}
        <rect x={20} y={472} width={1100} height={70} rx={12} fill={SURFACE} stroke={BORDER} />
        <line x1={387} y1={484} x2={387} y2={530} stroke={BORDER} />
        <line x1={753} y1={484} x2={753} y2={530} stroke={BORDER} />
        {[
          [203, "FIX THE DATA FIRST", "Most false positives start at the front door"],
          [570, "SCREEN WHO, NOT SPELLINGS", "One resolved identity, not many raw records"],
          [937, "MODELS RANK, PEOPLE DECIDE", "Accountable humans, with an audit trail"],
        ].map(([x, h, s]) => (
          <g key={h as string}>
            <text x={x} y={500} textAnchor="middle" fill={ACCENT2} fontSize={12.5} fontWeight={700}>
              {h}
            </text>
            <text x={x} y={519} textAnchor="middle" fill={MUTED} fontSize={11.5}>
              {s}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
