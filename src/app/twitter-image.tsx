import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "./util/seo";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 600,
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
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background:
            "linear-gradient(135deg, #0b0b0f 0%, #1F1B24 60%, #0b0b0f 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
            maxWidth: 980,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 26,
            opacity: 0.9,
            maxWidth: 980,
          }}
        >
          Community planner for Farmer Against Potatoes Idle (FAPI)
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 22,
            opacity: 0.85,
          }}
        >
          {SITE_URL.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  );
}

