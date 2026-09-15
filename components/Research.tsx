"use client";

import Reveal from "./Reveal";

export default function Research() {
  return (
    <section
      id="research"
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-gradient">
          Research
        </h2>

        <Reveal as="div" className="glass-card p-8 rounded-2xl">
          <p className="text-lg text-gray-300 leading-relaxed">
            Current focus: measuring how LLM compliance behavior fails across
            languages (English → Spanish → Portuguese) in regulated
            trade-compliance settings. Algoverse AI Research, Fall 2026. Paper
            link coming.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
