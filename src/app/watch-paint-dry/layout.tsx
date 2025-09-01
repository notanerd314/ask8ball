import { Comic_Neue } from 'next/font/google'
import './globals.css'

const font = Comic_Neue({ subsets: ['latin'], display: 'swap', weight: ['400', '700'] })

export const metadata = {
  title: "Watch Paint Dry",
  description: "Can you sit and ONLY watch paint dry for 30 minutes?",
  keywords: 'paint dry, challenge, patience, game',
  icons: {
    icon: '/watch-paint-dry/favicon.png',
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
    <div className={font.className}>
      {children}
    </div>
  );
}
