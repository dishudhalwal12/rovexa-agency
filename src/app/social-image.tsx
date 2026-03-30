import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site-config";

type SocialImageOptions = {
  size: {
    width: number;
    height: number;
  };
};

async function getWordmarkDataUrl() {
  const wordmarkBuffer = await readFile(
    join(process.cwd(), "public", "images", "rovexa-wordmark.png")
  );

  return `data:image/png;base64,${wordmarkBuffer.toString("base64")}`;
}

export async function createSocialImage({ size }: SocialImageOptions) {
  const wordmarkSrc = await getWordmarkDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "radial-gradient(circle at top left, rgba(244,211,163,0.22), transparent 32%), radial-gradient(circle at bottom right, rgba(255,255,255,0.1), transparent 28%), linear-gradient(135deg, #050505 0%, #0d0d0d 55%, #17120f 100%)",
          color: "#faf9f6",
          display: "flex",
          fontFamily:
            '"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
          height: "100%",
          padding: "48px",
          position: "relative",
          width: "100%"
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "36px",
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            overflow: "hidden",
            padding: "56px 60px",
            position: "relative"
          }}
        >
          <div
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)",
              borderRadius: "999px",
              filter: "blur(18px)",
              height: "220px",
              left: "-20px",
              position: "absolute",
              top: "-30px",
              width: "220px"
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              maxWidth: "66%"
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: "18px"
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(244,211,163,0.92))",
                  borderRadius: "999px",
                  color: "#050505",
                  display: "flex",
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  padding: "12px 18px",
                  textTransform: "uppercase"
                }}
              >
                Creative Growth Agency
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "68px",
                  fontWeight: 700,
                  letterSpacing: "-0.06em",
                  lineHeight: 0.95
                }}
              >
                Rovexa for modern brands.
              </div>
              <div
                style={{
                  color: "rgba(250,249,246,0.78)",
                  display: "flex",
                  fontSize: "29px",
                  lineHeight: 1.4,
                  maxWidth: "90%"
                }}
              >
                Branding, websites, marketing, and operational systems built to
                make growth sharper.
              </div>
            </div>

            <div
              style={{
                color: "rgba(250,249,246,0.58)",
                display: "flex",
                fontSize: "22px",
                letterSpacing: "0.1em",
                textTransform: "uppercase"
              }}
            >
              {siteConfig.domain}
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              position: "relative",
              width: `${Math.max(size.width * 0.22, 220)}px`
            }}
          >
            <div
              style={{
                background:
                  "radial-gradient(circle, rgba(244,211,163,0.3) 0%, rgba(244,211,163,0) 72%)",
                borderRadius: "999px",
                height: "280px",
                position: "absolute",
                width: "280px"
              }}
            />
            <img
              alt={siteConfig.name}
              height={120}
              src={wordmarkSrc}
              style={{
                height: "auto",
                maxWidth: "100%",
                objectFit: "contain"
              }}
              width={360}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}
