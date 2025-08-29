import '@/app/eightball/globals.css'
import Logo from '@/components/Logo';
import { Inter } from 'next/font/google'

const font = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Ask the 8 Ball',
  description: "The fortune teller you did know you don't need it.",
  keywords: 'fortune, magic 8 ball, eight ball, ai, artifical intelligence',
  icons: {
    icon: '/favicon.min.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function EightBallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="absolute z-50 top-6 left-6">
        <a href="/" className='transition-all hover:scale-105 active:scale-102'>
          <Logo color='white' />
        </a>
      </nav>
      <div className={font.className}>
        {children}
      </div>
    </>
  );
}
