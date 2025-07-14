'use client'

import Link from "next/link"
import { useState, useEffect } from "react"

/** 
 * Optimized site navigation bar component
 * @returns JSX element displaying simplified navigation
 */
export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`
      fixed flex items-center
      left-0 right-0 top-0 z-50
      p-4 backdrop-blur-md
      transition-all duration-200 ease-out
      bg-black/60
    `}>
      <Link href="/play" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
        <div className="relative">
          <img
            src="/favicon.min.svg"
            alt="Logo"
            width={32}
            height={32} 
            className="ring-white/30 ring-2 rounded-full"
          />
        </div>
        <span className="font-bold text-lg text-white">ask8ball</span>
      </Link>

      <Link
        href="/about"
        className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        About
      </Link>

      <Link
        href="/history"
        className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        History
      </Link>
    </nav>
  )
}