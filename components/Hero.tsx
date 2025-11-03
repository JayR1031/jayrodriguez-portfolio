"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dev.to icon component
const DevToIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-.52 0-.45-.22-.87-.61-1.15zm8.76 0c-.16-.18-.46-.23-.84-.23h-.48l.01 2.44.04 2.45.56-.02c.4 0 .63-.07.83-.26.26-.24.26-.36.26-.52 0-.43-.21-.86-.38-1.16zM19.67 1c-.74.01-1.48.1-2.18.29-.95.3-1.7.84-2.2 1.55-.48.69-.73 1.54-.73 2.38v.03c0 .52.07 1.03.22 1.53.03.09.05.17.08.24h.02c1.14-.56 2.54-.73 3.88-.73h.03c.85 0 1.7.12 2.46.35.93.29 1.7.84 2.2 1.55.5.71.73 1.55.73 2.38 0 .52-.07 1.04-.22 1.54-.03.09-.05.17-.08.24h-.02c-.03-.01-.06-.02-.1-.02-.75-.01-1.49-.1-2.19-.29-.95-.3-1.7-.84-2.2-1.55-.48-.69-.73-1.54-.73-2.38v-.03c0-.52.07-1.03.22-1.53.03-.09.05-.17.08-.24h.02c1.14.56 2.54.73 3.88.73h.03c.85 0 1.7-.12 2.46-.35.93-.29 1.7-.84 2.2-1.55.5-.71.73-1.55.73-2.38 0-.52-.07-1.04-.22-1.54-.03-.09-.05-.17-.08-.24h.02c-.03.01-.06.02-.1.02zm-4.7 14.23c0 .5-.05.99-.15 1.47-.13.64-.35 1.26-.66 1.82-.32.58-.74 1.07-1.24 1.45-.51.39-1.11.66-1.74.79-.63.14-1.28.2-1.94.18-.66.02-1.31-.04-1.94-.18-.63-.13-1.23-.4-1.74-.79-.5-.38-.92-.87-1.24-1.45-.31-.56-.53-1.18-.66-1.82-.1-.48-.15-.97-.15-1.47 0-.5.05-.99.15-1.47.13-.64.35-1.26.66-1.82.32-.58.74-1.07 1.24-1.45.51-.39 1.11-.66 1.74-.79.63-.14 1.28-.2 1.94-.18.66-.02 1.31.04 1.94.18.63.13 1.23.4 1.74.79.5.38.92.87 1.24 1.45.31.56.53 1.18.66 1.82.1.48.15.97.15 1.47z" />
  </svg>
);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (titleRef.current) {
      // Character-by-character animation for name
      const nameSpan = titleRef.current.children[0] as HTMLElement;
      if (nameSpan) {
        const text = nameSpan.textContent || "";
        // Store original HTML to restore if needed
        const originalHTML = nameSpan.innerHTML;

        nameSpan.innerHTML = text
          .split("")
          .map((char, i) =>
            char === " "
              ? " "
              : `<span class="inline-block" style="opacity: 0; transform: translateY(50px) rotateX(-90deg);">${char}</span>`
          )
          .join("");

        const chars = nameSpan.querySelectorAll("span");

        // Safety fallback: ensure visibility even if animation fails
        const safetyTimeout = setTimeout(() => {
          chars.forEach((char) => {
            (char as HTMLElement).style.opacity = "1";
            (char as HTMLElement).style.transform = "";
          });
        }, 2000);

        // Ensure visibility after animation
        gsap.fromTo(
          chars,
          {
            y: 50,
            opacity: 0,
            rotationX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
            onComplete: () => {
              clearTimeout(safetyTimeout);
              // Force visibility on all characters
              chars.forEach((char) => {
                (char as HTMLElement).style.opacity = "1";
                (char as HTMLElement).style.transform = "";
              });
            },
          }
        );
      }

      // Enhanced animation for subtitle lines
      tl.fromTo(
        [titleRef.current.children[1], titleRef.current.children[2]],
        {
          y: 80,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }

    if (buttonRef.current) {
      // Magnetic button effect
      Array.from(buttonRef.current.children).forEach((button: any) => {
        const btn = button as HTMLElement;
        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

      tl.fromTo(
        buttonRef.current.children,
        {
          y: 40,
          opacity: 0,
          scale: 0.8,
          rotationY: -15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );
    }

    if (socialRef.current) {
      // Enhanced social icons with hover effects
      Array.from(socialRef.current.children).forEach((icon: any) => {
        const icn = icon as HTMLElement;
        icn.addEventListener("mouseenter", () => {
          gsap.to(icn, {
            scale: 1.2,
            rotation: 360,
            duration: 0.5,
            ease: "back.out(2)",
          });
        });
        icn.addEventListener("mouseleave", () => {
          gsap.to(icn, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
          });
        });
      });

      tl.fromTo(
        socialRef.current.children,
        {
          scale: 0,
          opacity: 0,
          rotation: -180,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.3"
      );
    }

    // Enhanced floating animation with parallax
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
        opacity: 0.3,
      });
    }
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/JayR1031", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/jay-rod/",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/jayrodriguez87",
      label: "X (Twitter)",
    },
    { icon: DevToIcon, href: "https://dev.to/jay1031", label: "Dev.to" },
    { icon: Mail, href: "mailto:jayalexander1127@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative pt-20 px-6"
    >
      <div className="container mx-auto text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6"
          style={{
            lineHeight: "1.25",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            overflow: "visible",
            height: "auto",
          }}
        >
          <span
            className="block text-gradient"
            style={{
              display: "inline-block",
              lineHeight: "1.25",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              overflow: "visible",
              minHeight: "1.5em",
            }}
          >
            Jay Rodriguez
          </span>
          <span className="block text-4xl md:text-6xl mt-4 text-gray-300 leading-tight">
            AI Safety Researcher
          </span>
          <span className="block text-3xl md:text-5xl mt-2 text-gray-400 leading-tight">
            & ML Engineer
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Northeastern University Grad Student | Machine Learning, Deep Learning
          & Computer Vision Enthusiast
        </p>

        <div
          ref={buttonRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full 
                     font-semibold hover:scale-105 transform transition-all duration-300 
                     shadow-lg shadow-primary-500/50 flex items-center gap-2"
          >
            Let&apos;s Connect
          </a>
          <a
            href="https://github.com/JayR1031"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass-effect rounded-full font-semibold 
                     hover:scale-105 transform transition-all duration-300 
                     border border-primary-500/50 flex items-center gap-2"
          >
            See My Code
          </a>
          <a
            href="/Graduate Student.pdf"
            download="Jay_Rodriguez_Resume.pdf"
            className="px-8 py-4 glass-effect rounded-full font-semibold 
                     hover:scale-105 transform transition-all duration-300 
                     border border-primary-500/50 flex items-center gap-2"
          >
            <Download size={20} />
            View Resume
          </a>
        </div>

        <div ref={socialRef} className="flex justify-center gap-6 flex-wrap">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 glass-effect rounded-full flex items-center justify-center 
                       hover:scale-110 transform transition-all duration-300 
                       hover:border-primary-500 border border-transparent group"
              aria-label={label}
            >
              {Icon === DevToIcon ? (
                <DevToIcon className="w-6 h-6 group-hover:text-primary-400 transition-colors" />
              ) : (
                <Icon className="w-6 h-6 group-hover:text-primary-400 transition-colors" />
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
