import type React from "react"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata = {
  title: "IB School - International Baccalaureate Education",
  description:
    "Excellence in International Baccalaureate education with comprehensive student support and academic resources.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground">{children}</body>
    </html>
  )
}
