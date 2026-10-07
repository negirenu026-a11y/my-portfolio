"use client"

import { useState, useRef } from "react"
import { Github, Linkedin, Mail, Send, MapPin, Phone, CheckCircle2, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Reveal } from "@/components/portfolio/reveal"

export function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:negirenu026@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  const inputClass =
    "w-full rounded-xl border border-border/50 bg-secondary/20 px-5 py-3.5 text-base text-foreground placeholder:text-muted-foreground/40 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-300 backdrop-blur-sm"

  const contactLinks = [
    { icon: Mail, label: "negirenu026@gmail.com", href: "mailto:negirenu026@gmail.com", color: "group-hover:text-red-400" },
    { icon: Phone, label: "+91 8628971014", href: "tel:+918628971014", color: "group-hover:text-emerald-400" },
    { icon: MapPin, label: "Mohali, Punjab, India", href: "#", color: "group-hover:text-amber-400" },
    { icon: Github, label: "github.com/negirenu026-a11y", href: "https://github.com/negirenu026-a11y", color: "group-hover:text-foreground" },
    { icon: Linkedin, label: "linkedin.com/in/renuka-negi", href: "https://linkedin.com/in/renuka-negi-bb311028a", color: "group-hover:text-blue-400" },
  ]

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-pattern opacity-30" style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)' }} />

      <Reveal>
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="font-mono text-xl text-accent">05.</span> Contact
          </h2>
          <span className="section-line flex-1" />
        </div>
        <p className="mb-12 text-muted-foreground max-w-lg">
          Have a project in mind or just want to say hello? My inbox is always open.
        </p>
      </Reveal>

      <div className="relative grid gap-10 lg:grid-cols-2">
        {/* Left — Info */}
        <Reveal delay={0.1}>
          <div>
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
              Let&apos;s build something{" "}
              <span className="gradient-text">amazing</span> together
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I&apos;m open to full-stack web development roles and exciting freelance projects. Whether you need 
              a responsive website, a complex web app, or a REST API — let&apos;s talk!
            </p>

            <div className="mt-8 space-y-2">
              {contactLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  whileHover={{ x: 6 }}
                  className="group flex items-center gap-4 rounded-xl p-3 -mx-3 text-muted-foreground transition-all duration-300 hover:bg-accent/5 hover:text-foreground"
                >
                  <span className={`flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110 ${item.color}`}>
                    <item.icon className="size-5" />
                  </span>
                  <span className="text-base flex-1">{item.label}</span>
                  {item.href.startsWith("http") && (
                    <ArrowUpRight className="size-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-50 group-hover:translate-x-0" />
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right — Form */}
        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="gradient-border space-y-5 p-8">
            <div className="relative">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-foreground">
                  Name
                </label>
                <div className="relative">
                  <input
                    id="contact-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                  <AnimatePresence>
                    {form.name.length > 2 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400"
                      >
                        <CheckCircle2 className="size-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-foreground">
                Email
              </label>
              <div className="relative">
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={inputClass}
                  placeholder="you@example.com"
                />
                <AnimatePresence>
                  {form.email.includes("@") && form.email.includes(".") && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400"
                    >
                      <CheckCircle2 className="size-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-foreground">
                Message
              </label>
              <div className="relative">
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project..."
                />
                {form.message.length > 0 && (
                  <span className="absolute bottom-3 right-3 font-mono text-xs text-muted-foreground/40">
                    {form.message.length}
                  </span>
                )}
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              <Send className="size-4" /> Send Message
            </motion.button>
            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2 text-center text-sm font-medium text-accent"
                >
                  <CheckCircle2 className="size-4" />
                  Opening your email client — thanks for reaching out!
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
