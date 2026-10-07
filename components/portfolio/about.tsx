"use client"

import { GraduationCap, Code2, Rocket, Terminal, Zap } from "lucide-react"
import { motion, useMotionValue, useTransform } from "motion/react"
import { Reveal } from "@/components/portfolio/reveal"
import { useRef } from "react"

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        <span className="font-mono text-xl text-accent">{index}.</span> {title}
      </h2>
      <span className="section-line flex-1" />
    </div>
  )
}

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <motion.p
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      className="text-2xl font-bold text-foreground"
    >
      {value}{suffix}
    </motion.p>
  )
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
      <Reveal>
        <SectionHeading index="01" title="About Me" />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        {/* Left — Bio */}
        <Reveal delay={0.1}>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I&apos;m a <span className="font-semibold text-foreground">Full Stack Developer</span> with 
              hands-on experience building and deploying{" "}
              <span className="font-semibold text-accent">MERN stack</span> web applications using{" "}
              <span className="text-foreground">React.js</span>,{" "}
              <span className="text-foreground">Node.js</span>,{" "}
              <span className="text-foreground">Express.js</span>,
              and <span className="text-foreground">MongoDB</span>.
            </p>
            <p>
              Skilled in developing <span className="text-foreground">RESTful APIs</span>, responsive 
              user interfaces, and version-controlled projects. I have a proven 
              ability to deliver production-ready features through internship and independent project 
              experience.
            </p>
            <p>
              I enjoy the entire product development lifecycle — from designing clean, mobile-first 
              UIs to building scalable backend services and deploying them on platforms like{" "}
              <span className="text-foreground">Vercel</span> and{" "}
              <span className="text-foreground">Render</span>.
            </p>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: Code2, value: "5+", label: "Projects Built" },
                { icon: Rocket, value: "2", label: "Internships" },
                { icon: GraduationCap, value: "B.Tech", label: "CSE Degree" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group cursor-default text-center rounded-xl border border-border/30 bg-card/30 p-4 backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-accent/5"
                >
                  <stat.icon className="mx-auto mb-2 size-5 text-accent transition-transform group-hover:scale-110" />
                  <AnimatedCounter value={stat.value} />
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right — Education Cards */}
        <Reveal delay={0.2}>
          <div className="flex flex-col gap-5">
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="gradient-border group p-7"
            >
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1">
                  <GraduationCap className="size-4 text-accent" />
                  <span className="font-mono text-xs font-medium text-accent">B.Tech</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Computer Science Engineering</h3>
                <p className="mt-2 text-sm text-muted-foreground">Green Hills Engineering College, Solan</p>
                <p className="mt-1 text-sm text-muted-foreground">Himachal Pradesh, India</p>
                <p className="mt-3 font-mono text-xs text-accent">Sep 2023 — Jun 2026</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="gradient-border group p-7"
            >
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1">
                  <GraduationCap className="size-4 text-accent" />
                  <span className="font-mono text-xs font-medium text-accent">Diploma</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Computer Science Engineering</h3>
                <p className="mt-2 text-sm text-muted-foreground">ABVGIET, Gumma</p>
                <p className="mt-1 text-sm text-muted-foreground">Himachal Pradesh, India</p>
                <p className="mt-3 font-mono text-xs text-accent">Sep 2020 — Jun 2023</p>
              </div>
            </motion.div>

            {/* Code snippet decoration */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-xl border border-border/30 bg-card/30 p-5 font-mono text-xs text-muted-foreground/60 backdrop-blur-sm overflow-hidden relative group"
            >
              {/* Typing cursor line effect */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent to-accent/0 transition-all duration-700 group-hover:w-full" />
              
              <p><span className="text-accent/60">const</span> <span className="text-foreground/60">developer</span> = {"{"}</p>
              <p className="pl-4"><span className="text-accent/60">name</span>: <span className="text-green-400/60">&quot;Renuka Negi&quot;</span>,</p>
              <p className="pl-4"><span className="text-accent/60">role</span>: <span className="text-green-400/60">&quot;MERN Stack Dev&quot;</span>,</p>
              <p className="pl-4"><span className="text-accent/60">loves</span>: <span className="text-green-400/60">&quot;Building Things&quot;</span>,</p>
              <p className="pl-4"><span className="text-accent/60">coffee</span>: <span className="text-amber-400/60">true</span>,</p>
              <p className="pl-4"><span className="text-accent/60">openToWork</span>: <span className="text-emerald-400/60">true</span> <span className="text-accent/30">✓</span></p>
              <p>{"}"}</p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
