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
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(440, audioCtx.currentTime);
    g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.13);
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


