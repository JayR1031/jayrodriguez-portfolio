'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { Github, ExternalLink } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    title: 'Cloud Infrastructure Docker',
    description: 'Docker containerization and cloud infrastructure deployment project. Focus on scalable microservices architecture.',
    tech: ['Docker', 'AWS', 'Microservices', 'DevOps'],
    github: 'https://github.com/JayR1031/cloud-infrastructure-docker',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Search Algorithms AI',
    description: 'Implementation of A* and DFS search algorithms for pathfinding and graph traversal. AI course project.',
    tech: ['Python', 'AI', 'Algorithms', 'Pathfinding'],
    github: 'https://github.com/JayR1031/search-algorithms-ai',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Character N-gram Language Model',
    description: 'Character-based N-gram Language Model trained on Kaggle Job Descriptions 2025 dataset. CS5100 Homework 1.',
    tech: ['Python', 'NLP', 'Machine Learning', 'N-grams'],
    github: 'https://github.com/JayR1031/character-ngram-language-model',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Reinforcement Language Model',
    description: 'Character n-gram language model with reinforcement learning from human feedback.',
    tech: ['Python', 'RLHF', 'Reinforcement Learning', 'NLP'],
    github: 'https://github.com/JayR1031/reinforcement-language-model',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Graphical Models Intent Classification',
    description: 'Bayesian Network & Hidden Markov Model implementation for customer intent classification and text denoising.',
    tech: ['Python', 'Bayesian Networks', 'HMM', 'NLP'],
    github: 'https://github.com/JayR1031/graphical-models-intent-classification',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Supervised Learning Age & Gender Prediction',
    description: 'Supervised learning model for age and gender prediction using machine learning techniques.',
    tech: ['Python', 'Machine Learning', 'Computer Vision', 'Classification'],
    github: 'https://github.com/JayR1031/supervised-learning-age-gender-prediction',
    color: 'from-pink-500 to-rose-500',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.project-card')
      
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
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
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-gradient">
          Featured Projects
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Exploring AI, Machine Learning, and Software Engineering
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card glass-card p-6 rounded-xl hover:scale-105 
                       transform transition-all duration-300 group relative overflow-hidden"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} 
                            rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`} />
              
              <Reveal as="div" className="relative z-10" delay={index * 0.05}>
                <h3 className="text-2xl font-bold mb-3 text-gradient-2">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs glass-effect rounded 
                               border border-primary-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg 
                             hover:border-primary-500 border border-transparent 
                             transition-all group/link"
                  >
                    <Github size={18} className="group-hover/link:text-primary-400" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg 
                             hover:border-primary-500 border border-transparent 
                             transition-all group/link"
                  >
                    <ExternalLink size={18} className="group-hover/link:text-primary-400" />
                    <span className="text-sm">View</span>
                  </a>
                </div>
              </Reveal>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/JayR1031"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 glass-effect rounded-full 
                     font-semibold hover:scale-105 transform transition-all duration-300 
                     border border-primary-500/50 hover:border-primary-500"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

