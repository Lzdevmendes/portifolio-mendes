import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Luiz Mendes — Desenvolvedor Fullstack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 78% 28%, rgba(13,148,136,0.22) 0%, transparent 45%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#0D9488",
              color: "#0A0A0A",
              fontSize: "30px",
              fontWeight: 800,
            }}
          >
            LM
          </div>
          <span style={{ color: "#EDEDED", fontSize: "30px", fontWeight: 600 }}>
            lzmendesdev
          </span>
        </div>

        {/* Middle: name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#EDEDED",
              fontSize: "112px",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Luiz&nbsp;<span style={{ color: "#14B8A6" }}>Mendes</span>
          </div>
          <div
            style={{
              display: "flex",
              color: "#A3A3A3",
              fontSize: "38px",
              marginTop: "24px",
            }}
          >
            Desenvolvedor Full Stack · React · Next.js · .NET · Go
          </div>
        </div>

        {/* Bottom: badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#14B8A6",
            }}
          />
          <span style={{ color: "#737373", fontSize: "28px" }}>
            $1M+ processados em soluções de pagamento · lz.dev.br
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
