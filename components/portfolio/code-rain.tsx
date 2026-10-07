"use client"

import { useEffect, useRef } from "react"

const CODE_CHARS = [
  "{", "}", "<", ">", "/", "=", "(", ")", ";", ":",
  "=>", "++", "&&", "||", "!=", "==", "[]", "//",
  "div", "jsx", "npm", "git", "api", "css", "dom",
  "app", "req", "res", "db", "use", "let", "var",
  "fn", "io", "0", "1",
]

type Drop = {
  x: number
  y: number
  speed: number
  char: string
  opacity: number
  size: number
  nextSwap: number
  hue: number
  trail: { y: number; char: string; opacity: number }[]
}

export function CodeRain({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let drops: Drop[] = []
    let raf = 0

    function randomChar() {
      return CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
    }

    function createDrop(x?: number, startAtTop?: boolean): Drop {
      return {
        x: x ?? Math.random() * width,
        y: startAtTop ? -20 : Math.random() * height,
        speed: Math.random() * 0.3 + 0.1,
        char: randomChar(),
        opacity: Math.random() * 0.15 + 0.03,
        size: Math.random() * 4 + 10,
        nextSwap: Math.random() * 300 + 100,
        hue: Math.random() * 60 + 250,
        trail: [],
      }
    }

    function resize() {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.floor(width / 50)
      drops = Array.from({ length: cols }, (_, i) =>
        createDrop(i * 50 + Math.random() * 25, false)
      )
    }

    function draw() {
      if (!ctx) return
      // Clear canvas completely — let the page background show through
      ctx.clearRect(0, 0, width, height)

      for (const drop of drops) {
        drop.y += drop.speed

        drop.nextSwap--
        if (drop.nextSwap <= 0) {
          drop.char = randomChar()
          drop.nextSwap = Math.random() * 300 + 100
        }

        if (drop.y > height + 20) {
          drop.y = -20
          drop.char = randomChar()
          drop.opacity = Math.random() * 0.15 + 0.03
          drop.speed = Math.random() * 0.3 + 0.1
          drop.hue = Math.random() * 60 + 250
          drop.trail = []
        }

        // Add to trail
        drop.trail.push({ y: drop.y, char: drop.char, opacity: drop.opacity })
        if (drop.trail.length > 6) drop.trail.shift()

        // Draw trail (fading)
        for (let t = 0; t < drop.trail.length; t++) {
          const trailItem = drop.trail[t]
          const fadeRatio = (t + 1) / drop.trail.length
          ctx.font = `${drop.size}px "JetBrains Mono", monospace`
          ctx.fillStyle = `hsla(${drop.hue}, 70%, 65%, ${trailItem.opacity * fadeRatio * 0.4})`
          ctx.fillText(trailItem.char, drop.x, trailItem.y)
        }

        // Draw head (brightest)
        ctx.font = `${drop.size}px "JetBrains Mono", monospace`
        ctx.fillStyle = `hsla(${drop.hue}, 85%, 75%, ${drop.opacity * 1.2})`
        ctx.fillText(drop.char, drop.x, drop.y)
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  )
}
