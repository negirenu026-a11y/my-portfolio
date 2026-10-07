"use client"

import { motion } from "motion/react"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { Reveal } from "@/components/portfolio/reveal"

const experiences = [
  {
    role: "MERN Stack Developer Intern",
    company: "CoderRoots",
    location: "Mohali, Punjab, India",
    period: "Jan 2026 — Jun 2026",
    color: "from-accent to-accent/40",
    points: [
      "Developed and deployed full-stack web applications using MongoDB, Express.js, React.js, and Node.js (MERN stack).",
      "Designed and integrated RESTful APIs with Express.js and Node.js, connecting seamlessly with React.js frontend components.",
      "Structured and managed MongoDB databases with optimized schemas for efficient data retrieval.",
      "Built responsive, mobile-first UIs using React.js and gained hands-on exposure to Next.js for SSR and SSG.",
      "Deployed production applications on Vercel (frontend) and Render (backend); maintained version control via GitHub.",
      "Collaborated with team members in agile sprints, participating in code reviews and debugging sessions.",
    ],
  },
  {
    role: "Front-End Development Intern",
    company: "NetCoder",
    location: "Dharamshala, Himachal Pradesh",
    period: "Jun 2024 — Jul 2024",
    color: "from-blue-400 to-blue-400/40",
    points: [
      "Designed and developed responsive web pages using HTML5, CSS3, and JavaScript.",
      "Worked on UI/UX improvements and integrated front-end libraries to enhance user experience.",
      "Implemented cross-browser compatible layouts and ensured mobile responsiveness across pages.",
      "Used Git for version control and participated in code review processes with senior developers.",
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="font-mono text-xl text-accent">02.</span> Experience
          </h2>
          <span className="section-line flex-1" />
        </div>
      </Reveal>

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.15}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="gradient-border group relative overflow-hidden p-8 sm:p-10"
            >
              {/* Subtle accent bar at top */}
              <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${exp.color} opacity-60`} />

              {/* Hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-accent/5 opacity-0 blur-3xl transition-opacity duration-600 group-hover:opacity-100"
              />

              {/* Header */}
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 tag-pill rounded-full px-4 py-1.5">
                    <Briefcase className="size-3.5 text-accent" />
                    <span className="font-mono text-xs font-medium text-accent">{exp.company}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {exp.role}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3 sm:flex-col sm:items-end sm:gap-2">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-1.5 font-mono text-sm text-muted-foreground">
                    <Calendar className="size-3.5 text-accent/60" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-3.5 text-accent/60" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="my-7 section-line" />

              {/* Points */}
              <ul className="relative grid gap-4 sm:grid-cols-2">
                {exp.points.map((p, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[0.95rem] leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent/70" />
                    <span className="transition-colors duration-200 group-hover:text-muted-foreground/90">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
