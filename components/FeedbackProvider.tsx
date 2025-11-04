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

let audioCache: HTMLAudioElement | null = null;

function playClickSound() {
  try {
    if (!audioCache) {
      audioCache = new Audio('/mixkit-sci-fi-click-900.wav');
      audioCache.volume = 0.5;
      audioCache.preload = 'auto';
    }
    
    // Clone and play to allow multiple simultaneous plays
    const audio = audioCache.cloneNode() as HTMLAudioElement;
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Ignore play errors (e.g., user hasn't interacted yet)
    });
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


