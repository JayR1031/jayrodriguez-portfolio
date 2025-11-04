"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  Code2,
  MessageCircle,
} from "lucide-react";
import Reveal from "./Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(".contact-element");

      gsap.fromTo(
        elements,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can integrate with a service like Formspree, EmailJS, or your backend
    const mailtoLink = `mailto:jayalexander1127@gmail.com?subject=Contact from Portfolio&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setFormData({ name: "", email: "", message: "" });
  };

  // Dev.to icon component
  const DevToIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-.52 0-.45-.22-.87-.61-1.15zm8.76 0c-.16-.18-.46-.23-.84-.23h-.48l.01 2.44.04 2.45.56-.02c.4 0 .63-.07.83-.26.26-.24.26-.36.26-.52 0-.43-.21-.86-.38-1.16zM19.67 1c-.74.01-1.48.1-2.18.29-.95.3-1.7.84-2.2 1.55-.48.69-.73 1.54-.73 2.38v.03c0 .52.07 1.03.22 1.53.03.09.05.17.08.24h.02c1.14-.56 2.54-.73 3.88-.73h.03c.85 0 1.7.12 2.46.35.93.29 1.7.84 2.2 1.55.5.71.73 1.55.73 2.38 0 .52-.07 1.04-.22 1.54-.03.09-.05.17-.08.24h-.02c-.03-.01-.06-.02-.1-.02-.75-.01-1.49-.1-2.19-.29-.95-.3-1.7-.84-2.2-1.55-.48-.69-.73-1.54-.73-2.38v-.03c0-.52.07-1.03.22-1.53.03-.09.05-.17.08-.24h.02c1.14.56 2.54.73 3.88.73h.03c.85 0 1.7-.12 2.46-.35.93-.29 1.7-.84 2.2-1.55.5-.71.73-1.55.73-2.38 0-.52-.07-1.04-.22-1.54-.03-.09-.05-.17-.08-.24h.02c-.03.01-.06.02-.1.02zm-4.7 14.23c0 .5-.05.99-.15 1.47-.13.64-.35 1.26-.66 1.82-.32.58-.74 1.07-1.24 1.45-.51.39-1.11.66-1.74.79-.63.14-1.28.2-1.94.18-.66.02-1.31-.04-1.94-.18-.63-.13-1.23-.4-1.74-.79-.5-.38-.92-.87-1.24-1.45-.31-.56-.53-1.18-.66-1.82-.1-.48-.15-.97-.15-1.47 0-.5.05-.99.15-1.47.13-.64.35-1.26.66-1.82.32-.58.74-1.07 1.24-1.45.51-.39 1.11-.66 1.74-.79.63-.14 1.28-.2 1.94-.18.66-.02 1.31.04 1.94.18.63.13 1.23.4 1.74.79.5.38.92.87 1.24 1.45.31.56.53 1.18.66 1.82.1.48.15.97.15 1.47z" />
    </svg>
  );

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
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-gradient contact-element">
          Let&apos;s Connect
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg contact-element">
          Open to internships and opportunities in Software Engineering, ML, and
          AI Engineering.
        </p>

        <Reveal as="div" className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-element">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-primary-500/20 
                           focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-primary-500/20 
                           focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-primary-500/20 
                           focus:border-primary-500 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 
                         rounded-lg font-semibold hover:scale-105 transform transition-all duration-300 
                         shadow-lg shadow-primary-500/50 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-element space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient-2">
                Get in Touch
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Whether you&apos;re looking for a collaborator, want to discuss
                AI research, or have an opportunity you&apos;d like to share,
                I&apos;d love to hear from you!
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a
                      href="mailto:jayalexander1127@gmail.com"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      jayalexander1127@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-400">GitHub</p>
                    <a
                      href="https://github.com/JayR1031"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      @JayR1031
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/jay-rod/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Jay Rodriguez
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-400">X (Twitter)</p>
                    <a
                      href="https://x.com/jayrodriguez87"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      @jayrodriguez87
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <DevToIcon className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-400">Dev.to</p>
                    <a
                      href="https://dev.to/jay1031"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      @jay1031
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-400">Signal</p>
                    <span className="text-primary-400">jalexander.91</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">
                Connect on Social Media
              </h4>
              <div className="flex gap-4 flex-wrap">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-effect rounded-full flex items-center justify-center 
                             hover:scale-110 transform transition-all duration-300 
                             hover:border-primary-500 border border-transparent group"
                    aria-label={label}
                  >
                    {Icon === DevToIcon ? (
                      <DevToIcon className="w-5 h-5 group-hover:text-primary-400 transition-colors" />
                    ) : (
                      <Icon className="w-5 h-5 group-hover:text-primary-400 transition-colors" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
