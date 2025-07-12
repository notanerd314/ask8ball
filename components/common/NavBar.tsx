import Link from "next/link"
import { useState, useEffect } from "react"

/** 
 * Enhanced site navigation bar component with smooth animations
 * @returns JSX element displaying modern navigation
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
      p-4 rounded-2xl
      transition-all duration-300 ease-out
      ${isScrolled 
        ? 'bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl' 
        : 'bg-black/40 backdrop-blur-md border border-white/10'
      }
    `}>
      <Link href="/play" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
        <div className="relative">
          <img 
            src="/favicon.min.svg" 
            alt="Logo" 
            width={32} 
            height={32}
            className="drop-shadow-lg"
          />
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl -z-10"></div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-white">ask8ball</span>
          <span className="text-xs text-white/60 -mt-1">AI Fortune Teller</span>
        </div>
      </Link>
      
      <div className="flex items-center gap-4">
        <Link 
          href="/about" 
          className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          About
        </Link>
        
        {/* Audio toggle button - we'll implement this later */}
        <button 
          className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          title="Toggle Audio"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}