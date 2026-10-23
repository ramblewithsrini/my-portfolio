import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";
import { profile } from "@/data/portfolio";

// Social preview card shown when the site is shared on LinkedIn, Teams,
// WhatsApp, email etc. Generated at build time.
export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // The headshot is embedded as a data URL so the card is fully self-contained.
  const headshot = await readFile(join(process.cwd(), "public/images/headshot.jpg"));
  const headshotSrc = `data:image/jpeg;base64,${headshot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f4f1ed",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(168,79,59,0.18), transparent 45%), radial-gradient(circle at 0% 100%, rgba(43,45,51,0.08), transparent 45%)",
          color: "#2b2d33",
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            {profile.initials}
            <span style={{ color: "#a84f3b" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 26,
              color: "#a84f3b",
              border: "2px solid rgba(168,79,59,0.5)",
              borderRadius: 999,
              padding: "10px 26px",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#a84f3b" }} />
            Open to permanent roles
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 44,
              lineHeight: 1.15,
              fontWeight: 700,
              backgroundImage: "linear-gradient(100deg, #a84f3b 10%, #c4644f 50%, #4a4e57 90%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.headline}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
        <img
          src={headshotSrc}
          alt=""
          width={270}
          height={270}
          style={{
            width: 270,
            height: 270,
            borderRadius: 999,
            objectFit: "cover",
            border: "6px solid #a84f3b",
          }}
        />
        </div>

        <div style={{ display: "flex", gap: 22, fontSize: 28, color: "#5f636a" }}>
          {["25 years", "Payments & fintech", "Consulting & in-house", "London"].flatMap((fact, i) => [
            i > 0 && (
              <span key={`dot-${i}`} style={{ color: "#a84f3b" }}>
                ·
              </span>
            ),
            <span key={fact} style={{ whiteSpace: "nowrap" }}>
              {fact}
            </span>,
          ])}
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
