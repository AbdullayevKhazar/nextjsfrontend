import { ImageResponse } from "next/og";

export function generateImageMetadata() {
  return [
    {
      id: "192",
      size: { width: 192, height: 192 },
      contentType: "image/png",
    },
    {
      id: "512",
      size: { width: 512, height: 512 },
      contentType: "image/png",
    },
  ];
}

export default async function Icon({
  id,
}: {
  id: Promise<string | number>;
}) {
  const iconSize = await id;
  const size = iconSize === "512" ? 512 : 192;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #0F172A 0%, #1D4ED8 55%, #38BDF8 100%)",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-18%",
            borderRadius: "999px",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.28), transparent 58%)",
          }}
        />
        <div
          style={{
            width: `${size * 0.58}px`,
            height: `${size * 0.58}px`,
            borderRadius: `${size * 0.14}px`,
            border: `${Math.max(10, Math.round(size * 0.06))}px solid rgba(255,255,255,0.92)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 ${Math.round(size * 0.06)}px ${Math.round(size * 0.12)}px rgba(15, 23, 42, 0.35)`,
            background: "rgba(15, 23, 42, 0.12)",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              width: `${size * 0.22}px`,
              height: `${size * 0.32}px`,
              borderRadius: `${size * 0.045}px`,
              backgroundColor: "rgba(250, 250, 250, 0.9)",
              transform: "skewY(-8deg)",
              boxShadow: "0 0 0 2px rgba(255,255,255,0.24) inset",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `${size * 0.045}px`,
                top: `${size * 0.055}px`,
                width: `${size * 0.13}px`,
                height: `${size * 0.045}px`,
                borderRadius: "999px",
                backgroundColor: "rgba(15, 23, 42, 0.38)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: `${size * 0.045}px`,
                top: `${size * 0.12}px`,
                width: `${size * 0.13}px`,
                height: `${size * 0.045}px`,
                borderRadius: "999px",
                backgroundColor: "rgba(15, 23, 42, 0.38)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: `${size * 0.045}px`,
                top: `${size * 0.185}px`,
                width: `${size * 0.09}px`,
                height: `${size * 0.045}px`,
                borderRadius: "999px",
                backgroundColor: "rgba(15, 23, 42, 0.38)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    },
  );
}
