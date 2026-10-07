"use client"

import { Github, Linkedin, Heart, ArrowUp } from "lucide-react"
import { motion } from "motion/react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border/30 px-6 py-12">
      {/* Gradient line at top */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -4, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group flex size-10 items-center justify-center rounded-full border border-border/30 bg-card/50 text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:text-accent hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10 backdrop-blur-sm"
          aria-label="Back to top"
        >
          <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>

        {/* Brand */}
        <a href="#" className="font-mono text-lg font-bold text-foreground transition-colors hover:text-accent">
          <span className="text-accent">{"<"}</span>
          Renuka
          <span className="text-accent">{" />"}</span>
        </a>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: "https://github.com/negirenu026-a11y", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/renuka-negi-bb311028a", label: "LinkedIn" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex size-10 items-center justify-center rounded-xl border border-border/30 text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
            >
              <social.icon className="size-5" />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground/60">
          &copy; {new Date().getFullYear()} Renuka Negi. Built with
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="size-3.5 text-red-400/60" />
          </motion.span>
          using Next.js
        </p>
      </div>
    </footer>
  )
}
