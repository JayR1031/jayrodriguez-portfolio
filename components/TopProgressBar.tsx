"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TopProgressBar() {
  const pathname = usePathname();
  const [key, setKey] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger on route/path change
    setKey((k) => k + 1);
    setVisible(true);

    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] pointer-events-none h-1">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={key}
            className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
            initial={{ width: 0, opacity: 0.9 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


