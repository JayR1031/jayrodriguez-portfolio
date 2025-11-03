"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import BackgroundScene from "@/components/BackgroundScene";
import InteractiveCursor from "@/components/InteractiveCursor";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={mainRef} className="relative min-h-screen">
      <InteractiveCursor />
      <BackgroundScene />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
