import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

// Home-screen icon for iPhone/iPad bookmarks.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2b2d33",
          color: "#f4f1ed",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: -3,
          fontFamily: "Space Grotesk",
        }}
      >
        SV<span style={{ color: "#d4735e" }}>.</span>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
