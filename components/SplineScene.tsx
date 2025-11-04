"use client";

import { useEffect, useState } from "react";

type Props = {
  src?: string;
  height?: string; // e.g., '50vh'
};

export default function SplineScene({ src = "https://my.spline.design/particleaibrain-CeQBgJDifx8jDn7CB1tqGoXE/", height = "45vh" }: Props) {
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

  const embedSrc = src.includes("?") ? `${src}` : `${src}?controls=0`;

  return (
    <div
      className="absolute inset-x-0 top-24 mx-auto pointer-events-none z-0 flex items-center justify-center"
      style={{ height }}
    >
      <div
        className="relative w-full md:w-[80%] lg:w-[60%] h-full rounded-xl overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, rgba(30,30,40,0.9) 0%, rgba(10,10,10,0.98) 60%, rgba(0,0,0,1) 100%)",
          boxShadow: "0 0 50px rgba(99,102,241,0.12), inset 0 0 40px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.06)",
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
            opacity: 0.9,
            filter: "saturate(0.9) brightness(0.9) contrast(1.05)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
          allow="autoplay; fullscreen"
        />

        {/* Edge fade to blend into page background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.85)_100%)]" />

        {/* Discreet overlay to cover Spline floating button/logo area */}
        <div className="pointer-events-none absolute bottom-2 right-2 w-14 h-14 rounded-full bg-black/60 blur-md" />
      </div>
    </div>
  );
}


