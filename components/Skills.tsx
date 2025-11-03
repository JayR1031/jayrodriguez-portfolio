'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const skillCategories = [
  {
    title: 'AI/ML Frameworks',
    skills: ['TensorFlow', 'PyTorch', 'NumPy', 'pandas', 'scikit-learn', 'Keras'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Bash'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Material UI', 'Figma'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Backend & Cloud',
    skills: ['Node.js', 'Flask', 'AWS', 'Docker', 'Firebase', 'PostgreSQL', 'MySQL', 'Redis'],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Tools & Others',
    skills: ['Git', 'GitHub Actions', 'Jira', 'Notion', 'Postman', 'Vim', 'VS Code'],
    color: 'from-indigo-500 to-purple-500',
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.skill-card')
      
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-gradient">
          Skills & Technologies
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="skill-card glass-card p-6 rounded-xl hover:scale-105 
                       transform transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold mb-4 text-gradient-2">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 glass-effect rounded-full text-sm 
                             border border-primary-500/30 group-hover:border-primary-500 
                             transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block glass-card p-8 rounded-2xl">
            <p className="text-lg text-gray-300 mb-4">
              Continuously learning and exploring new technologies
            </p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse delay-75" />
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse delay-150" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

