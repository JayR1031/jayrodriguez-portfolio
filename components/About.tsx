"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin, Languages, Award } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("/profile.jpg");

  // Try different image formats
  useEffect(() => {
    const imageFormats = ["/profile.jpg", "/profile.jpeg", "/profile.png", "/profile.webp"];
    let currentIndex = 0;

    const checkImage = (src: string) => {
      const img = new window.Image();
      img.onload = () => setImageSrc(src);
      img.onerror = () => {
        currentIndex++;
        if (currentIndex < imageFormats.length) {
          checkImage(imageFormats[currentIndex]);
        } else {
          // Fallback to GitHub image if no local image found
          setImageSrc("https://github.com/JayR1031.png");
        }
      };
      img.src = src;
    };

    checkImage(imageFormats[0]);
  }, []);

  useEffect(() => {
    if (contentRef.current && imageRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        {
          x: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-gradient">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I&apos;m an aspiring{" "}
              <span className="text-primary-400 font-semibold">
                ML/AI engineer
              </span>{" "}
              driven by the challenge of building robust, scalable systems that
              solve real-world problems. As a graduate student in Computer
              Science at{" "}
              <span className="text-primary-400 font-semibold">
                Northeastern University
              </span>
              , I&apos;m actively bridging the gap between academic depth and
              hands-on expertise — currently honing my skills in database
              design, optimization, and backend architecture.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              I thrive at the intersection of{" "}
              <span className="text-primary-400 font-semibold">
                machine learning
              </span>{" "}
              and
              <span className="text-primary-400 font-semibold">
                {" "}
                infrastructure
              </span>
              , where performance meets precision. Whether it&apos;s deploying
              intelligent workflows or architecting data pipelines, I bring a
              systems-level mindset and a passion for continuous learning. My
              goal? To engineer solutions that are not only technically sound
              but socially impactful.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Beyond my technical work, I serve as the{" "}
              <span className="text-primary-400 font-semibold">
                Miami Chapter Lead
              </span>{" "}
              for{" "}
              <a
                href="https://www.aicollective.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 font-semibold hover:underline"
              >
                The AI Collective
              </a>
              , where I help unite AI pioneers to exchange insights and drive
              collective progress in the field.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
              <div className="glass-card p-3 sm:p-4 rounded-lg min-w-0">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 mb-2" />
                <h3 className="font-semibold mb-1 text-sm sm:text-base break-words">
                  <span className="hidden sm:inline">Northeastern</span>
                  <span className="sm:hidden">NEU</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 break-words">Grad Student</p>
              </div>
              <div className="glass-card p-3 sm:p-4 rounded-lg min-w-0">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 mb-2" />
                <h3 className="font-semibold mb-1 text-sm sm:text-base break-words">Location</h3>
                <p className="text-xs sm:text-sm text-gray-400 break-words">United States</p>
              </div>
              <div className="glass-card p-3 sm:p-4 rounded-lg min-w-0">
                <Languages className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 mb-2" />
                <h3 className="font-semibold mb-1 text-sm sm:text-base break-words">Languages</h3>
                <p className="text-xs sm:text-sm text-gray-400 break-words">English, Spanish</p>
              </div>
              <div className="glass-card p-3 sm:p-4 rounded-lg min-w-0">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 mb-2" />
                <h3 className="font-semibold mb-1 text-sm sm:text-base break-words">AI Collective</h3>
                <p className="text-xs sm:text-sm text-gray-400 break-words">
                  <a
                    href="https://www.aicollective.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-300 transition-colors break-words"
                  >
                    <span className="hidden sm:inline">Miami Chapter Lead</span>
                    <span className="sm:hidden">Miami Lead</span>
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="glass-card p-8 rounded-2xl">
              <div
                className="aspect-square rounded-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                            flex items-center justify-center overflow-hidden relative
                            border border-gray-700/50"
              >
                <div className="absolute inset-0" style={{ 
                  transform: 'scale(0.70)', 
                  transformOrigin: 'center center',
                  top: '-5%'
                }}>
                  <Image
                    src={imageSrc}
                    alt="Jay Rodriguez"
                    fill
                    className="object-contain rounded-lg"
                    style={{ objectPosition: 'center top' }}
                    onError={() => {
                      // Final fallback to GitHub image
                      setImageSrc("https://github.com/JayR1031.png");
                    }}
                  />
                </div>
              </div>
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-400 
                            to-primary-600 rounded-full blur-2xl opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Currently open to{" "}
            <span className="text-primary-400 font-semibold">internships</span>{" "}
            and opportunities in{" "}
            <span className="text-primary-400 font-semibold">
              Software Engineering
            </span>
            ,
            <span className="text-primary-400 font-semibold">
              {" "}
              Machine Learning
            </span>
            , and
            <span className="text-primary-400 font-semibold">
              {" "}
              AI Engineering
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
