import '@/app/eightball/globals.css'
import Logo from '@/components/Logo';
import { Comic_Neue } from 'next/font/google'
import './globals.css'

const font = Comic_Neue({ subsets: ['latin'], display: 'swap', weight: ['400', '700'] });

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
      <nav className="absolute z-50 mx-6 my-5">
        <a href="/" className='transition-all hover:scale-105 active:scale-102'>
          <Logo color='black' />
        </a>
      </nav>
      <div className={font.className}>
        {children}
      </div>
    </>
  );
}
