"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase, Award, Users } from "lucide-react";
import Reveal from "./Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    type: "work",
    icon: Briefcase,
    title: "AI Engineer",
    organization: "diGenius AI",
    period: "",
    description: "",
    color: "from-green-500 to-emerald-500",
  },
  {
    type: "work",
    icon: Briefcase,
    title: "Founder & CEO",
    organization: "Puente AI",
    period: "",
    description: "",
    color: "from-cyan-500 to-blue-600",
  },
  {
    type: "education",
    icon: GraduationCap,
    title: "MS Computer Science candidate",
    organization: "Northeastern University",
    period: "2027",
    description: "",
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "leadership",
    icon: Users,
    title: "Miami Chapter Lead",
    organization: "The AI Collective",
    period: "",
    description: "",
    color: "from-indigo-500 to-purple-500",
    link: "https://www.aicollective.com/",
  },
  {
    type: "leadership",
    icon: Users,
    title: "Founding Chapter President",
    organization: "INIT @ Northeastern",
    period: "",
    description: "",
    color: "from-sky-500 to-blue-600",
  },
  {
    type: "leadership",
    icon: Users,
    title: "Graduate Student Advisory Board",
    organization: "Khoury College",
    period: "",
    description: "",
    color: "from-violet-500 to-purple-600",
  },
  {
    type: "education",
    icon: Award,
    title: "Google GEAR Program participant",
    organization: "",
    period: "",
    description: "",
    color: "from-red-500 to-orange-500",
  },
  {
    type: "education",
    icon: GraduationCap,
    title: "MS Computer Science",
    organization: "Northeastern University",
    period: "Expected 2027",
    description: "",
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "education",
    icon: GraduationCap,
    title: "Bachelor of Applied Science, Supply Chain Management",
    organization: "Broward College",
    period: "2021",
    description: "",
    color: "from-teal-500 to-blue-500",
  },
  {
    type: "education",
    icon: Award,
    title: "Google Associate Cloud Engineer",
    organization: "",
    period: "2026",
    description: "",
    color: "from-amber-500 to-orange-600",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll(".experience-item");

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-gradient">
          Experience & Education
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          My journey in AI, ML, and Software Engineering
        </p>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <Reveal
                as="div"
                delay={index * 0.05}
                key={`${exp.title}-${exp.organization}-${exp.period}`}
                className="experience-item glass-card p-8 rounded-2xl 
                         hover:scale-[1.02] transform transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${exp.color} 
                                flex items-center justify-center flex-shrink-0 
                                group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gradient-2">
                        {exp.title}
                      </h3>
                      {exp.period ? (
                        <span className="text-primary-400 font-medium">
                          {exp.period}
                        </span>
                      ) : null}
                    </div>

                    {exp.organization ? (
                      <p className="text-primary-400 text-lg mb-3">
                        {exp.link ? (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {exp.organization}
                          </a>
                        ) : (
                          exp.organization
                        )}
                      </p>
                    ) : null}

                    {exp.description ? (
                      <p className="text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block glass-card p-6 rounded-xl">
            <p className="text-lg text-gray-300">
              Open to ML engineer and research engineer roles in LLM evaluation
              and post-training. Let&apos;s talk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
