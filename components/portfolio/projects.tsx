"use client"

import { ExternalLink, Github, Layers, Monitor, Database } from "lucide-react"
import { motion } from "motion/react"
import { Reveal } from "@/components/portfolio/reveal"

const projects = [
  {
    title: "WasteWise",
    subtitle: "Smart Waste Management Platform",
    tag: "Full Stack",
    icon: Layers,
    description:
      "A production-ready full-stack smart waste management platform with separate frontend and backend services. RESTful backend APIs handle waste data management and user operations, with a responsive React.js frontend integrated with MongoDB for scalable, real-time data storage.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    demo: "https://smart-waste-frontend-blush.vercel.app/",
    github: "https://github.com/negirenu026-a11y",
    featured: true,
  },
  {
    title: "E-Commerce Plant Website",
    subtitle: "Interactive Shopping Interface",
    tag: "Frontend",
    icon: Monitor,
    description:
      "A fully responsive, interactive e-commerce user interface focused on plant products with dynamic product listings, browsing functionality, and clean, reusable UI components with JavaScript-driven interactivity.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/negirenu026-a11y",
    featured: false,
  },
  {
    title: "Student Performance Tracker",
    subtitle: "Academic Management System",
    tag: "Full Stack",
    icon: Database,
    description:
      "A web application to manage student records, attendance tracking, and academic performance reporting with CRUD operations using PHP and MySQL for backend data handling.",
    tech: ["HTML", "PHP", "Bootstrap", "MySQL"],
    github: "https://github.com/negirenu026-a11y",
    featured: false,
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
      <Reveal>
        <div className="mb-12 flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="font-mono text-xl text-accent">03.</span> Projects
          </h2>
          <span className="section-line flex-1" />
        </div>
      </Reveal>

      {/* Featured Project */}
      {projects.filter(p => p.featured).map((p, i) => (
        <Reveal key={p.title} delay={0.1}>
          <motion.article
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="gradient-border group relative mb-8 overflow-hidden p-8 sm:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-accent/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-accent via-accent/60 to-transparent opacity-70" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
                    <p.icon className="size-5 text-accent" />
                  </div>
                  <span className="tag-pill rounded-full px-3 py-1 font-mono text-xs text-accent">
                    ⭐ Featured — {p.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground sm:text-3xl">{p.title}</h3>
                <p className="mt-1 text-base font-medium text-accent/70">{p.subtitle}</p>
                <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">{p.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-lg border border-border/50 bg-secondary/40 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} GitHub repository`}
                    className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary/30 text-muted-foreground transition-all hover:border-accent/40 hover:text-accent hover:bg-accent/5"
                  >
                    <Github className="size-5" />
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} live demo`}
                    className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary/30 text-muted-foreground transition-all hover:border-accent/40 hover:text-accent hover:bg-accent/5"
                  >
                    <ExternalLink className="size-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        </Reveal>
      ))}

      {/* Other projects grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.filter(p => !p.featured).map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1 + 0.2}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="gradient-border group relative flex h-full flex-col overflow-hidden p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-accent/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative mb-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10">
                    <p.icon className="size-4 text-accent" />
                  </div>
                  <span className="tag-pill rounded-full px-3 py-1 font-mono text-xs text-accent">{p.tag}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} GitHub`}
                      className="rounded-lg p-2 transition-all hover:bg-accent/5 hover:text-accent"
                    >
                      <Github className="size-5" />
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} live demo`}
                      className="rounded-lg p-2 transition-all hover:bg-accent/5 hover:text-accent"
                    >
                      <ExternalLink className="size-5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="relative text-xl font-bold text-foreground">{p.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent/60">{p.subtitle}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md border border-border/40 bg-secondary/30 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
