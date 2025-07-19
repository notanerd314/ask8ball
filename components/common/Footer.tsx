/** 
 * Enhanced site footer component with modern styling
 * @returns JSX element displaying footer content
 */
export default function Footer() {
  return (
    <footer className='relative py-16 px-6 bg-black/70'>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-8">
        {/* Main content */}
        <div className="flex items-center justify-center gap-4">
          <img src="/favicon.min.svg" alt="Logo" width={32} height={32} className="opacity-90" />
          <span className="text-2xl font-black text-white drop-shadow-lg">ask8ball</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-lg font-bold">
          <a href="/about" className="text-white/70 hover:text-yellow-400 transition-colors duration-300">
            About
          </a>
          <span className="text-white/40 text-2xl">✨</span>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t-4 border-white/20">
          <p className="text-white/60 font-bold text-lg bg-black/40 px-6 py-3 rounded-2xl border-2 border-white/20 max-w-3xl mx-auto">
            🎱 This site doesn't collect personal data. It's just for fun! 
            By using it, you agree not to take it seriously or blame me for bad advice. 🎱
          </p>

          <p className='text-lg font-bold text-white/50 !mt-6'>
            © 2025 ask8ball ✨ Some rights reserved, most magic included! 🪄
          </p>
        </div>
      </div>
    </footer>
  )
}