import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

// Browser-tab icon: the "SV." mark from the nav.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: 14,
          color: "#f4f4f6",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "Space Grotesk",
        }}
      >
        SV<span style={{ color: "#c6ff3d" }}>.</span>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
