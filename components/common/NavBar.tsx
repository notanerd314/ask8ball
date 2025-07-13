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
      fixed flex items-center justify-between
      left-4 right-4 top-4 z-50
      p-4 rounded-2xl backdrop-blur-md
      transition-all duration-200 ease-out
      bg-black/60 border-2 border-white/20
    `}>
      <Link href="/play" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
        <div className="relative">
          <img
            src="/favicon.min.svg"
            alt="Logo"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-white">ask8ball</span>
          <span className="text-xs text-white/60 -mt-1">AI Fortune Teller</span>
        </div>
      </Link>

      <Link
        href="/about"
        className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        About
      </Link>
    </nav>
  )
}