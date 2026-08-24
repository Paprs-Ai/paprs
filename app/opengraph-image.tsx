import { ImageResponse } from "next/og";

export const alt = "Paprs — Your step-by-step guide to life in Spain";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

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
          padding: "80px",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Top Header / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 800,
              color: "#000000",
            }}
          >
            p
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            paprs
          </div>
          <div
            style={{
              marginLeft: "12px",
              padding: "4px 12px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              fontSize: "14px",
              fontWeight: 500,
              color: "#a1a1aa",
            }}
          >
            Spain Relocation & Bureaucracy
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "#fafafa",
            }}
          >
            Your step-by-step guide to life in Spain.
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "#a1a1aa",
              maxWidth: "800px",
            }}
          >
            Navigate Spanish bureaucracy with confidence. NIE, TIE, padrón, taxes, and residency — plain language, zero stress.
          </div>
        </div>

        {/* Bottom Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {[
            "NIE & TIE Guidance",
            "Empadronamiento",
            "Autónomo Engine",
            "Beckham Law & Visas",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: "15px",
                fontWeight: 600,
                color: "#e4e4e7",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
