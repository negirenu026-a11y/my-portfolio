"use client"

import { motion } from "motion/react"
import { Reveal } from "@/components/portfolio/reveal"
import { useState } from "react"

const groups = [
  {
    title: "Frontend Development",
    emoji: "🎨",
    color: "from-violet-500 to-purple-500",
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "React.js", level: 88 },
      { name: "Vite", level: 82 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Bootstrap", level: 85 },
      { name: "Responsive Design", level: 92 },
    ],
  },
  {
    title: "Backend Development",
    emoji: "⚙️",
    color: "from-blue-500 to-indigo-500",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 88 },
      { name: "REST APIs", level: 90 },
      { name: "JWT Authentication", level: 82 },
      { name: "Role-Based Access Control", level: 80 },
    ],
  },
  {
    title: "Database & Data",
    emoji: "🗄️",
    color: "from-emerald-500 to-teal-500",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "Mongoose", level: 83 },
      { name: "MySQL", level: 75 },
      { name: "SQL", level: 75 },
    ],
  },
  {
    title: "Testing & API Tools",
    emoji: "🧪",
    color: "from-cyan-500 to-blue-500",
    items: [
      { name: "Postman", level: 85 },
      { name: "Jest", level: 72 },
      { name: "React Testing Library", level: 70 },
      { name: "API Testing", level: 82 },
      { name: "Unit Testing", level: 72 },
      { name: "Chrome DevTools", level: 88 },
    ],
  },
  {
    title: "Deployment & Version Control",
    emoji: "🚀",
    color: "from-amber-500 to-orange-500",
    items: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "Vercel", level: 88 },
      { name: "Render", level: 80 },
      { name: "Netlify", level: 78 },
      { name: "GitHub Actions", level: 72 },
    ],
  },
  {
    title: "Integrations & Services",
    emoji: "🔗",
    color: "from-pink-500 to-rose-500",
    items: [
      { name: "Razorpay", level: 75 },
      { name: "SendGrid", level: 72 },
      { name: "ImageKit", level: 70 },
      { name: "REST API Integration", level: 85 },
    ],
  },
  {
    title: "Development Tools",
    emoji: "🛠️",
    color: "from-purple-500 to-violet-500",
    items: [
      { name: "VS Code", level: 95 },
      { name: "npm", level: 88 },
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "Chrome DevTools", level: 88 },
    ],
  },
]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-secondary-foreground transition-colors duration-300 group-hover:text-accent">
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3 }}
          className="font-mono text-xs text-muted-foreground/60"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/40">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60"
        />
      </div>
    </motion.div>
  )
}

export function Skills() {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="font-mono text-xl text-accent">04.</span> Skills
          </h2>
          <span className="section-line flex-1" />
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 0.08}>
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="gradient-border group h-full p-7"
              onHoverStart={() => setHoveredGroup(g.title)}
              onHoverEnd={() => setHoveredGroup(null)}
            >
              <div className="relative">
                {/* Hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-accent/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="mb-5 flex items-center gap-3">
                  <motion.span
                    animate={hoveredGroup === g.title ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-xl"
                  >
                    {g.emoji}
                  </motion.span>
                  <h3 className="font-mono text-sm font-bold text-accent">{g.title}</h3>
                </div>

                <div className="flex flex-col gap-3">
                  {g.items.map((item, j) => (
                    <SkillBar
                      key={item.name}
                      name={item.name}
                      level={item.level}
                      delay={j * 0.05}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Tech marquee */}
      <Reveal delay={0.3}>
        <div className="mt-14 overflow-hidden rounded-2xl border border-border/20 bg-card/20 py-5 backdrop-blur-sm">
          <div className="flex items-center gap-8 marquee whitespace-nowrap">
            {[...groups.flatMap(g => g.items.map(i => i.name)), ...groups.flatMap(g => g.items.map(i => i.name))].map((tech, i) => (
              <span key={`${tech}-${i}`} className="font-mono text-sm text-muted-foreground/40">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
