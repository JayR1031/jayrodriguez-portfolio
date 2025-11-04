"use client";

import { useEffect, useState } from "react";

type Props = {
  src?: string;
  height?: string; // e.g., '50vh'
};

export default function SplineScene({ src = "https://my.spline.design/particleaibrain-CeQBgJDifx8jDn7CB1tqGoXE/", height = "42vh" }: Props) {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReduced(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }
  }, []);

  if (isReduced) return null;

  const base = src.split("?")[0];
  const embedSrc = `${base}?controls=0&autoplay=1&transparent=1`;

  return (
    <div
      className="absolute inset-0 top-24 pointer-events-none z-0 flex items-center justify-center"
      style={{ height }}
    >
      <div className="relative w-full h-full flex items-center justify-center" style={{ maxWidth: '100%' }}>
        <div className="relative w-full h-full flex items-center justify-center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <iframe
            src={embedSrc}
            title="Spline 3D Scene"
            loading="lazy"
            className="w-full h-full"
            style={{
              border: 0,
              margin: '0 auto',
              padding: 0,
              display: 'block',
              opacity: 0.9,
              filter: "saturate(0.9) brightness(0.95)",
              mixBlendMode: "normal",
              pointerEvents: "none",
              backgroundColor: "transparent",
              position: 'relative',
              transform: 'translateX(-10%)', // Left shift to compensate for Spline's internal offset
            }}
            allow="autoplay; fullscreen; xr-spatial-tracking"
          />
        </div>
      </div>
    </div>
  );
}


