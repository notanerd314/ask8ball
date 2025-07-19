import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fredoka': ['var(--font-fredoka)', 'cursive'],
        'rubik': ['var(--font-rubik)', 'sans-serif'],
      },
      colors: {
        'magic-purple': '#8B5CF6',
        'neon-blue': '#06B6D4',
        'hot-pink': '#EC4899',
        'electric-yellow': '#FBBF24',
        'deep-purple': '#5B21B6',
        'cosmic-indigo': '#4338CA',
      },
      animation: {
        'gradient-shift': 'gradientShift 3s ease infinite',
        'magical-float': 'magicalFloat 4s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        magicalFloat: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-12px) scale(1.02)' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
        },
      },
      boxShadow: {
        'magical': '0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(236, 72, 153, 0.3)',
        'toy': '0 8px 0 rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;