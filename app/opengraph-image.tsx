import { ImageResponse } from "next/og"

export const alt = "The MRVIN100 Model: an open collective for African engineering"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0d2b25 0%, #123a31 55%, #0d2b25 100%)",
          color: "#f2f7f4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#d9a441",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              color: "#0d2b25",
            }}
          >
            M
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: 2 }}>MRVIN100</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 950,
              display: "flex",
            }}
          >
            An open model for African engineering
          </div>
          <div style={{ fontSize: 32, color: "#9fc3b4", display: "flex" }}>
            Published economics · 40% developer share · Market-zone standards
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26, color: "#d9a441" }}>
          <div style={{ display: "flex" }}>Adoptable by</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Companies</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Talent</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>States</div>
        </div>
      </div>
    ),
    size
  )
}