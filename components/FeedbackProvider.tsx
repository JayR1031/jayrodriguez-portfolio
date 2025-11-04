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

    // Crisp splash effect - multiple frequencies for water-like texture
    // Main splash tone (high frequency that drops quickly)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1800, now);
    osc1.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.002);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    // Secondary splash layer (mid-high frequency)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1400, now);
    osc2.frequency.exponentialRampToValueAtTime(400, now + 0.1);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.12, now + 0.001);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now);
    osc2.stop(now + 0.1);

    // High-frequency sparkle (crisp texture)
    const osc3 = audioCtx.createOscillator();
    const gain3 = audioCtx.createGain();
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(3200, now);
    osc3.frequency.exponentialRampToValueAtTime(2000, now + 0.08);
    gain3.gain.setValueAtTime(0, now);
    gain3.gain.linearRampToValueAtTime(0.08, now + 0.001);
    gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc3.connect(gain3);
    gain3.connect(audioCtx.destination);
    osc3.start(now);
    osc3.stop(now + 0.08);
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
    </FeedbackContext.Provider>
  );
}


