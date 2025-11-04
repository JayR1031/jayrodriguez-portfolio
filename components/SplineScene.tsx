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
      className="absolute inset-x-0 top-24 mx-auto pointer-events-none z-0 flex items-center justify-center"
      style={{ height }}
    >
      <div
        className="relative w-full md:w-[78%] lg:w-[58%] h-full rounded-xl overflow-hidden"
        style={{
          background: "transparent",
          boxShadow: "0 0 30px rgba(99,102,241,0.08)",
        }}
      >
        {/* Spline iframe with subtle blending */}
        <iframe
          src={embedSrc}
          title="Spline 3D Scene"
          loading="lazy"
          className="absolute inset-0 w-full h-full"
          style={{
            border: 0,
            opacity: 0.72,
            filter: "saturate(0.82) brightness(0.84) contrast(1.04)",
            mixBlendMode: "screen",
            isolation: "isolate",
            // Feather the edges so the scene melts into the background
            WebkitMaskImage:
              "radial-gradient(80% 70% at 50% 45%, rgba(0,0,0,1) 58%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)",
            maskImage:
              "radial-gradient(80% 70% at 50% 45%, rgba(0,0,0,1) 58%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)",
            pointerEvents: "none",
          }}
          allow="autoplay; fullscreen"
        />

        {/* Edge fade to blend into page background (extra gentle) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 40%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.35) 82%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.8)_100%)]" />

        {/* Center veil to reduce brightness and help blend further */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(65% 55% at 50% 45%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0) 100%)" }} />

        {/* Discreet overlay to cover Spline floating button/logo area */}
        <div className="pointer-events-none absolute bottom-2 right-2 w-14 h-14 rounded-full bg-black/60 blur-md" />
      </div>
    </div>
  );
}


