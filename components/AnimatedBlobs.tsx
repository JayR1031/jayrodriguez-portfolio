"use client";

import { motion } from "framer-motion";

export default function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 -z-[5] pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-32 w-[40vw] h-[40vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(102,126,234,0.25), rgba(0,0,0,0))",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -30, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[45vw] h-[45vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(118,75,162,0.22), rgba(0,0,0,0))",
          filter: "blur(36px)",
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, -25, 30, 0], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(240,147,251,0.18), rgba(0,0,0,0))",
          filter: "blur(32px)",
        }}
        animate={{ scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}


