/** 
 * Enhanced site footer component with modern styling
 * @returns JSX element displaying footer content
 */
export default function Footer() {
  return (
    <footer className='relative py-12 px-4'>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Main content */}
        <div className="flex items-center justify-center gap-3">
          <img src="/favicon.min.svg" alt="Logo" width={24} height={24} className="opacity-80" />
          <span className="text-lg font-semibold text-white/90">ask8ball</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a href="/about" className="text-white/60 hover:text-white transition-colors duration-200">
            About
          </a>
          <span className="text-white/30">•</span>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10">
          <small className="text-white/40">
            This site doesn’t collect personal data. It’s just for fun.
            By using it, you agree not to take it seriously or blame me for bad advice.
          </small>

          <p className='text-sm text-white/40 !mt-2'>
            © 2025 ask8ball. Some rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}