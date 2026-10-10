// Gartner TIME classification of a 144-application estate: a donut of the split
// beside the TIME grid (business value against technical fitness).
// Drawn as one SVG; scrolls sideways on narrow phones.

const BORDER = "var(--border)";
const SURFACE = "var(--surface)";
const FG = "var(--foreground)";
const MUTED = "var(--muted)";

const groups = [
  { name: "Migrate", count: 69, color: "var(--accent-2)", does: "High value, poor fit: move to AWS" },
  { name: "Invest", count: 40, color: "var(--accent)", does: "High value, good fit: build on it" },
  { name: "Tolerate", count: 20, color: "#5fe3c0", does: "Good fit, low value: run as is" },
  { name: "Eliminate", count: 15, color: MUTED, does: "Low value, poor fit: retire it" },
];
const total = groups.reduce((n, g) => n + g.count, 0);
// Where each donut segment starts, as a share of the whole.
const starts = groups.map((_, i) => groups.slice(0, i).reduce((n, g) => n + g.count, 0) / total);

// Grid cells: [name, column, row] with row 0 = high business value.
const cells: [string, number, number][] = [
  ["Migrate", 0, 0],
  ["Invest", 1, 0],
  ["Eliminate", 0, 1],
  ["Tolerate", 1, 1],
];

export default function TimeModel() {
  const r = 92;
  const c = 2 * Math.PI * r;
  const gx = 430, gy = 40, cw = 250, ch = 140; // grid origin and cell size

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-background p-4">
      <svg
        viewBox="0 0 1000 380"
        className="min-w-[680px] w-full"
        role="img"
        aria-label={`Of ${total} applications: ${groups.map((g) => `${g.count} ${g.name}`).join(", ")}. On the TIME grid, Invest is high business value and high technical fitness; Migrate is high value but poor fitness; Tolerate is low value but good fitness; Eliminate is low value and poor fitness.`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {/* Donut */}
        <g transform="rotate(-90 190 190)">
          <circle cx={190} cy={190} r={r} fill="none" stroke={BORDER} strokeWidth={34} />
          {groups.map((g, i) => {
            const len = (g.count / total) * c;
            return (
              <circle
                key={g.name}
                cx={190}
                cy={190}
                r={r}
                fill="none"
                stroke={g.color}
                strokeWidth={34}
                strokeDasharray={`${len - 3} ${c - len + 3}`}
                strokeDashoffset={-starts[i] * c}
              />
            );
          })}
        </g>
        <text x={190} y={186} textAnchor="middle" fill={FG} fontSize={40} fontWeight={700}>{total}</text>
        <text x={190} y={212} textAnchor="middle" fill={MUTED} fontSize={13}>applications</text>

        {/* TIME grid */}
        {cells.map(([name, col, row]) => {
          const g = groups.find((x) => x.name === name)!;
          const x = gx + col * (cw + 10);
          const y = gy + row * (ch + 10);
          return (
            <g key={name}>
              <rect x={x} y={y} width={cw} height={ch} rx={12} fill={SURFACE} stroke={g.color} strokeWidth={1.5} />
              <rect x={x + 18} y={y + 22} width={12} height={12} rx={3} fill={g.color} />
              <text x={x + 38} y={y + 33} fill={FG} fontSize={15} fontWeight={700}>{name.toUpperCase()}</text>
              <text x={x + 18} y={y + 84} fill={FG} fontSize={38} fontWeight={700}>{g.count}</text>
              <text x={x + 76} y={y + 84} fill={MUTED} fontSize={13}>{Math.round((g.count / total) * 100)}%</text>
              <text x={x + 18} y={y + 116} fill={MUTED} fontSize={12}>{g.does}</text>
            </g>
          );
        })}

        {/* Axes */}
        <text x={gx - 14} y={gy + ch + 5} textAnchor="middle" fill={MUTED} fontSize={12} transform={`rotate(-90 ${gx - 14} ${gy + ch + 5})`}>
          Business value →
        </text>
        <text x={gx + cw + 5} y={gy + 2 * ch + 40} textAnchor="middle" fill={MUTED} fontSize={12}>
          Technical fitness →
        </text>
      </svg>
    </div>
  );
}
