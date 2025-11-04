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

  return (
    <div className="absolute inset-x-0 top-24 mx-auto pointer-events-none z-0 flex items-center justify-center" style={{ height }}>
      <div className="w-full md:w-[80%] lg:w-[60%] h-full rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
        <iframe
          src={src}
          title="Spline 3D Scene"
          loading="lazy"
          style={{ width: "100%", height: "100%", border: 0 }}
          allow="autoplay; fullscreen"
        />
      </div>
    </div>
  );
}


