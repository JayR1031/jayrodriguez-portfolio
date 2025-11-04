"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FeedbackContextType = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  trigger: () => void;
};

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export function useFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error("useFeedback must be used within FeedbackProvider");
  return ctx;
}

function playClickSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioCtx.currentTime;

    // Primary crisp tone (high frequency for tech feel)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1200, now);
    osc1.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.15, now + 0.001);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.08);

    // Subtle harmonic for depth
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(2400, now);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.05, now + 0.001);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now);
    osc2.stop(now + 0.06);
  } catch (_) {
    /* ignore */
  }
}

export default function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setEnabled(!prefReduced);
    }
  }, []);

  const trigger = useMemo(() => {
    return () => {
      if (!enabled || typeof window === "undefined") return;
      if ("vibrate" in navigator) navigator.vibrate(10);
      playClickSound();
    };
  }, [enabled]);

  return (
    <FeedbackContext.Provider value={{ enabled, setEnabled, trigger }}>
      {children}

      {/* Toggle button bottom-right */}
      <div className="fixed bottom-5 right-5 z-[60]">
        <button
          aria-label="Toggle sound and haptics"
          onClick={() => setEnabled((v) => !v)}
          className="pointer-events-auto w-10 h-10 rounded-full glass-effect border border-white/10 flex items-center justify-center text-xs"
        >
          {enabled ? "FX" : "FX"}
        </button>
        <AnimatePresence>
          {enabled && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.9, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="mt-2 text-[11px] text-gray-300 text-center"
            >
              Feedback on
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FeedbackContext.Provider>
  );
}


