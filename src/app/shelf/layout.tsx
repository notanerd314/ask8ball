import { Comic_Neue } from 'next/font/google'
import './globals.css'

const font = Comic_Neue({ subsets: ['latin'], display: 'swap', weight: ['400', '700'] })

export const metadata = {
  title: "notanerd's shelf",
  description: "Just a bunch of random web toys I made for no reason.",
  keywords: 'fun websites, useless web, web projects',

};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false
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
