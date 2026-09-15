"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import BackgroundScene from "@/components/BackgroundScene";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={mainRef} className="relative min-h-screen">
      <BackgroundScene />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
