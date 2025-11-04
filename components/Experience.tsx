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
    type: "education",
    icon: GraduationCap,
    title: "Graduate Student",
    organization: "Northeastern University",
    period: "Present",
    description:
      "Pursuing advanced studies in Computer Science with focus on AI Safety, Machine Learning, and Deep Learning.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "leadership",
    icon: Users,
    title: "Student Advisory Board Member",
    organization:
      "Khoury College of Computer Sciences, Northeastern University",
    period: "Present",
    description:
      "Serving on the student advisory board to represent student voices to faculty and leadership. Collaborating on initiatives that improve curriculum, student experience, and community engagement across Khoury.",
    color: "from-sky-500 to-blue-600",
  },
  {
    type: "leadership",
    icon: Users,
    title: "Miami Chapter Lead",
    organization: "The AI Collective",
    period: "Present",
    description:
      "Leading the Miami chapter of The AI Collective, a non-profit community uniting 100,000+ pioneers exploring the frontier of AI. Organizing events, workshops, and discussions to drive collective progress in AI.",
    color: "from-indigo-500 to-purple-500",
    link: "https://www.aicollective.com/",
  },
  {
    type: "community",
    icon: Users,
    title: "Member – SHPE (Region 7)",
    organization: "Society of Hispanic Professional Engineers",
    period: "Present",
    description:
      "Active member in the Southeast (Region 7), participating in professional development events, workshops, and networking opportunities to empower the Hispanic community in STEM.",
    color: "from-amber-500 to-orange-600",
    link: "https://www.shpe.org/",
  },
  {
    type: "research",
    icon: Award,
    title: "AI Safety Researcher",
    organization: "Independent Research",
    period: "Present",
    description:
      "Researching AI safety, alignment, and making AI systems more reliable and aligned with human values.",
    color: "from-purple-500 to-pink-500",
  },
  {
    type: "work",
    icon: Briefcase,
    title: "Software Engineer",
    organization: "Various Projects",
    period: "Present",
    description:
      "Building scalable applications with Django and Flask, deploying solutions on Azure cloud infrastructure, and developing ML-powered solutions. Experienced with Azure services including Azure Functions, Azure DevOps, and Azure Machine Learning.",
    color: "from-green-500 to-emerald-500",
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
                key={exp.title}
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
                      <span className="text-primary-400 font-medium">
                        {exp.period}
                      </span>
                    </div>

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

                    <p className="text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block glass-card p-6 rounded-xl">
            <p className="text-lg text-gray-300">
              Open to{" "}
              <span className="text-primary-400 font-semibold">
                internships
              </span>{" "}
              and
              <span className="text-primary-400 font-semibold">
                {" "}
                opportunities
              </span>{" "}
              in Software Engineering, Machine Learning, and AI Engineering
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
