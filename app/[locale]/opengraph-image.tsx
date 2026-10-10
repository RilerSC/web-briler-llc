import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "BRILER";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isSpanish = locale === "es";
  
  const title = isSpanish 
    ? "Tecnología diseñada alrededor de tu negocio"
    : "Technology designed around your business";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000010",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              textAlign: "center",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                background: "linear-gradient(135deg, #0070F0 0%, #A840F8 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                letterSpacing: "0.05em",
              }}
            >
              BRILER
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
