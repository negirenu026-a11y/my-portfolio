"use client"

import { useMemo } from "react"

type Star = {
  left: string
  top: string
  size: number
  delay: string
  duration: string
  opacity: number
}

// A field of softly twinkling stars rendered as lightweight CSS dots.
export function Starfield({ count = 90 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    const seeded = (i: number, m: number) => {
      // deterministic pseudo-random so SSR and client match
      const x = Math.sin(i * 12.9898 + m * 78.233) * 43758.5453
      return x - Math.floor(x)
    }
    return Array.from({ length: count }, (_, i) => ({
      left: `${seeded(i, 1) * 100}%`,
      top: `${seeded(i, 2) * 100}%`,
      size: seeded(i, 3) * 2 + 1,
      delay: `${seeded(i, 4) * 6}s`,
      duration: `${seeded(i, 5) * 4 + 2.5}s`,
      opacity: seeded(i, 6) * 0.5 + 0.3,
    }))
  }, [count])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground animate-twinkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  )
}
