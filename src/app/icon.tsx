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
          background: "#2b2d33",
          borderRadius: 14,
          color: "#f4f1ed",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "Space Grotesk",
        }}
      >
        SV<span style={{ color: "#d4735e" }}>.</span>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
