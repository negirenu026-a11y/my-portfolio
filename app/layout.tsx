import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'Renuka Negi — MERN Stack Developer',
  description: 'MERN Stack Developer building real-world web applications — responsive UIs, REST APIs, and full-stack solutions using MongoDB, Express.js, React.js, and Node.js.',
  keywords: ['MERN Stack', 'Full Stack Developer', 'React.js', 'Node.js', 'MongoDB', 'Express.js', 'Web Developer', 'Portfolio', 'Renuka Negi'],
  authors: [{ name: 'Renuka Negi' }],
  openGraph: {
    title: 'Renuka Negi — MERN Stack Developer',
    description: 'Building real-world web applications with the MERN stack.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
