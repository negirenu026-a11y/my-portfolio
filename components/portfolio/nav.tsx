"use client"

import { useEffect, useState, useCallback } from "react"
import { Menu, X, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track active section via Intersection Observer
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`)
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/50 bg-background/60 backdrop-blur-xl shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="group font-mono text-base font-bold tracking-tight text-foreground transition-colors">
          <span className="text-accent transition-colors group-hover:text-foreground">{"<"}</span>
          <span className="transition-colors group-hover:text-accent">Renuka</span>
          <span className="text-accent transition-colors group-hover:text-foreground">{" />"}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative rounded-lg px-4 py-2 text-sm transition-colors ${
                activeSection === l.href
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="relative z-10">
                <span className="font-mono text-xs text-accent/60 mr-1">{String(i + 1).padStart(2, '0')}.</span>
                {l.label}
              </span>
              {activeSection === l.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="absolute inset-0 rounded-lg bg-secondary/0 transition-colors group-hover:bg-secondary/30" />
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:scale-95"
          >
            Hire Me
          </a>
        </div>

        <button
          className="text-foreground md:hidden relative z-50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="size-6" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="size-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border/50 bg-background/95 px-6 py-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base transition-colors ${
                    activeSection === l.href
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <span className="font-mono text-xs text-accent/60">{String(i + 1).padStart(2, '0')}.</span>
                  {l.label}
                  <ChevronRight className="ml-auto size-4 opacity-0 transition-all group-hover:opacity-50 group-hover:translate-x-1" />
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.06 }}
                className="mt-3 rounded-xl bg-accent py-3.5 text-center text-base font-semibold text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/20"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
