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
          background: "#07070b",
          color: "#f4f4f6",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: -3,
          fontFamily: "Space Grotesk",
        }}
      >
        SV<span style={{ color: "#c6ff3d" }}>.</span>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
