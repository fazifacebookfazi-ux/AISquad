import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080706",
          color: "#f6f0e6",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.28em",
            color: "#d4ff3a",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          AX
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, lineHeight: 0.95, letterSpacing: -2 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 32, color: "#c9c0b3" }}>{site.tagline}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#9b9286",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {site.domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
