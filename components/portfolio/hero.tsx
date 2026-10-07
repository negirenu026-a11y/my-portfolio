"use client"

import { Github, Linkedin, Mail, ArrowDown, Download, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import { CodeRain } from "@/components/portfolio/code-rain"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const TECH_STACK = ["React.js", "Node.js", "Express.js", "MongoDB", "Next.js", "Tailwind CSS", "Vite", "TypeScript", "REST APIs", "JWT", "Mongoose", "Git", "Razorpay", "Vercel"]

const ROLES = [
  "MERN Stack Developer",
  "Full Stack Developer",
  "React.js Developer",
  "Node.js Developer",
]

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = ROLES[roleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2500)
    } else if (isDeleting && text === "") {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    } else {
      const delta = isDeleting ? 40 : 80
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        )
      }, delta)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex])

  return (
    <span className="inline-flex items-baseline gap-0">
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block h-[1em] w-[3px] translate-y-[0.1em] rounded-full bg-accent"
      />
    </span>
  )
}

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
      <CodeRain className="pointer-events-none absolute inset-0 z-0 opacity-20" />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      {/* Interactive cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-0 size-[500px] rounded-full opacity-[0.07] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #a78bfa, transparent 70%)",
          left: mousePos.x - 250,
          top: mousePos.y - 250,
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-16 md:flex-row md:items-center md:justify-between"
      >
        {/* Left — text content */}
        <div className="max-w-2xl text-center md:text-left">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-sm text-accent">Available for opportunities</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">Renuka</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-pretty text-xl font-medium text-muted-foreground sm:text-2xl lg:text-3xl"
          >
            <TypewriterRole />
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0"
          >
            Building real-world web applications — responsive UIs, REST APIs, and full-stack solutions using MongoDB, Express.js, React.js, and Node.js.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="size-4" /> Get in Touch
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-accent/80 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="https://github.com/negirenu026-a11y"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-card hover:-translate-y-1"
            >
              <Github className="size-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/renuka-negi-bb311028a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-card hover:-translate-y-1"
            >
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </motion.div>

          {/* Tech stack pills */}
          <motion.div variants={item} className="mt-12 overflow-hidden">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground/60">Tech Stack</p>
            <div className="flex gap-3 flex-wrap">
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.08, duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:text-accent hover:bg-accent/5 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — Profile image */}
        <motion.div variants={item} className="flex shrink-0 justify-center md:justify-end">
          <div className="group relative">
            {/* Outer glow ring */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full opacity-40 blur-3xl transition-all duration-700 group-hover:opacity-70"
              style={{ background: 'radial-gradient(circle, oklch(0.72 0.17 162 / 0.4), transparent 70%)' }}
            />
            {/* Spinning orbit ring */}
            <div aria-hidden className="absolute -inset-4 rounded-full border border-accent/20 animate-spin-slow" />
            <div aria-hidden className="absolute -inset-8 rounded-full border border-border/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '40s' }} />
            
            {/* Orbit dots */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4"
            >
              <div className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-accent/60 shadow-lg shadow-accent/40" />
            </motion.div>
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8"
            >
              <div className="absolute top-1/2 -right-1.5 size-2 -translate-y-1/2 rounded-full bg-cyan-400/60 shadow-lg shadow-cyan-400/40" />
            </motion.div>

            {/* Profile image */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden rounded-full p-[3px] bg-gradient-to-br from-accent via-accent/40 to-transparent"
            >
              <img
                src="/profile.png"
                alt="Portrait of Renuka Negi"
                width={240}
                height={240}
                className="relative size-52 rounded-full object-cover sm:size-60 lg:size-64"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors hover:text-accent"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown className="size-4" />
      </motion.a>
    </section>
  )
}
