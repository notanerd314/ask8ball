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
      fixed flex items-center z-50
      left-0 right-0 top-0 z-50
      p-8
      transition-all duration-300 ease-out
      bg-black/0
    `}>
      <Link href="/" className="flex items-center gap-4 hover:scale-110 transition-transform duration-300 group">
        <div className="relative">
          <img
            src="/favicon.min.svg"
            alt="Logo"
            width={50}
            height={50} 
            className="ring-white/50 ring-4 rounded-full group-hover:ring-yellow-400 transition-all duration-300"
          />
        </div>
        <span className="font-black text-3xl text-white group-hover:text-yellow-400 transition-colors duration-300 drop-shadow-lg">ask8ball</span>
      </Link>
    </nav>
  )
}