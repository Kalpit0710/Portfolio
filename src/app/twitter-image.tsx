import { ImageResponse } from "next/og";

export const alt = "Kalpit Agarwal | Full Stack Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0f1a 0%, #0f172a 40%, #111827 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Kalpit Agarwal
          </span>
          <span style={{ fontSize: 28, color: "#93c5fd" }}>
            Full Stack Developer | C# .NET | React | Azure
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
