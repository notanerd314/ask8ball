import { Comic_Neue } from 'next/font/google'
import './globals.css'

const font = Comic_Neue({ subsets: ['latin'], display: 'swap', weight: ['400', '700'] })

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
