import '@/app/eightball/globals.css'
import Logo from '../../components/Logo';
import { Inter } from 'next/font/google'

const font = Inter({ subsets: ['latin'], display: 'swap' });
const faviconLink = `${process.env.NEXT_PUBLIC_URL!}/eightball/favicon.min.svg`
const thumbnailLink = `${process.env.NEXT_PUBLIC_URL!}/shelf/thumbnails/eightball.png`

export const metadata = {
  title: 'Ask the 8 Ball',
  description: "The fortune teller you did know you don't need it.",
  keywords: 'fortune, magic 8 ball, eight ball, ai, artifical intelligence',
  icons: {
    icon: faviconLink,
  },
  openGraph: {
    title: 'Ask the 8 Ball',
    description: "The fortune teller you did know you don't need it.",
    images: [
      {
        url: thumbnailLink,
        width: 1200,
        height: 630,
        alt: 'Ask the 8 Ball',
      },
    ],
    siteName: 'Ask the 8 Ball',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ask the 8 Ball',
    description: "The fortune teller you did know you don't need it.",
    images: [
      {
        url: thumbnailLink,
        width: 1200,
        height: 630,
        alt: 'Ask the 8 Ball',
      },
    ],
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
