"use client"

import { useEffect, useRef, useState } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let width = 0
    let height = 0
    let raf = 0

    function createParticles() {
      const count = Math.min(Math.floor((width * height) / 18000), 80)
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() * 60 + 250, // violet-blue range
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      }))
    }

    function resize() {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      createParticles()
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Update and draw particles
      for (const p of particles) {
        // Gentle floating motion
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        // Mouse interaction — gentle repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.15
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap around edges smoothly
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // Pulsing opacity
        const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.15

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${Math.max(0.02, pulseOpacity)})`
        ctx.fill()

        // Soft glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${Math.max(0.01, pulseOpacity * 0.15)})`
        ctx.fill()
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.08
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `hsla(270, 60%, 65%, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw mouse connection lines
      if (mouse.x > 0 && mouse.y > 0) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.12
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `hsla(280, 80%, 75%, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Canvas particle network */}
      <canvas
        ref={canvasRef}
        className="pointer-events-auto absolute inset-0"
        style={{ opacity: 0.7 }}
      />

      {/* Gradient orbs — smooth morphing blobs */}
      <div
        className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full opacity-20 blur-[120px] animate-blob"
        style={{ background: "radial-gradient(circle, #a78bfa50, transparent 70%)" }}
      />
      <div
        className="absolute top-1/4 -right-32 h-[35rem] w-[35rem] rounded-full opacity-15 blur-[120px] animate-blob"
        style={{
          background: "radial-gradient(circle, #818cf840, transparent 70%)",
          animationDelay: "5s",
          animationDuration: "25s",
        }}
      />
      <div
        className="absolute -bottom-20 left-1/3 h-[30rem] w-[30rem] rounded-full opacity-12 blur-[120px] animate-blob"
        style={{
          background: "radial-gradient(circle, #67e8f935, transparent 70%)",
          animationDelay: "10s",
          animationDuration: "28s",
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 h-[22rem] w-[22rem] rounded-full opacity-10 blur-[100px] animate-blob"
        style={{
          background: "radial-gradient(circle, #e879f930, transparent 70%)",
          animationDelay: "7s",
          animationDuration: "22s",
        }}
      />
      <div
        className="absolute top-[10%] left-1/2 h-[18rem] w-[18rem] rounded-full opacity-8 blur-[80px] animate-blob"
        style={{
          background: "radial-gradient(circle, #60a5fa25, transparent 70%)",
          animationDelay: "12s",
          animationDuration: "30s",
        }}
      />

      {/* Floating glass shapes */}
      <div className="absolute left-[6%] top-[18%] h-24 w-24 rotate-12 rounded-2xl border border-border/20 bg-card/5 backdrop-blur-sm animate-float opacity-40" />
      <div className="absolute right-[10%] top-[25%] h-14 w-14 rounded-full border border-purple-400/10 bg-purple-400/3 backdrop-blur-sm animate-float-slow opacity-30" />
      <div className="absolute left-[15%] bottom-[15%] h-20 w-20 rotate-45 rounded-xl border border-border/15 bg-card/5 backdrop-blur-sm animate-float-delayed opacity-35" />
      <div className="absolute right-[18%] bottom-[22%] h-28 w-28 rounded-full border border-indigo-400/8 animate-spin-slow opacity-25" />
      <div className="absolute left-[45%] top-[12%] h-10 w-10 rounded-lg border border-cyan-400/8 bg-cyan-400/3 rotate-[30deg] animate-float-slow opacity-30" />
      <div className="absolute right-[35%] top-[60%] h-16 w-16 rounded-2xl border border-violet-400/10 bg-violet-400/3 rotate-[60deg] animate-float opacity-25" />
      <div className="absolute left-[70%] bottom-[35%] h-12 w-12 rounded-full border border-pink-400/8 bg-pink-400/3 animate-float-delayed opacity-20" />
    </div>
  )
}
