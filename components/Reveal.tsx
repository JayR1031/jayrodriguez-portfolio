"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Reveal({ children, delay = 0, y = 24, as = "div", className }: RevealProps) {
  const Component: any = motion[as as any] || motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay } },
      }}
    >
      {children}
    </Component>
  );
}


