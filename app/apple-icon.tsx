import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "68%",
            height: "68%",
            borderRadius: "24%",
            background:
              "linear-gradient(145deg, #DBEAFE 0%, #93C5FD 45%, #2563EB 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 24px rgba(37, 99, 235, 0.22)",
          }}
        >
          <div
            style={{
              width: "38%",
              height: "52%",
              borderRadius: "14%",
              border: "8px solid rgba(255,255,255,0.96)",
              position: "relative",
              transform: "skewY(-8deg)",
              background: "rgba(15, 23, 42, 0.1)",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
