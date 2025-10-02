import { Comic_Neue } from 'next/font/google'
import './globals.css'

const font = Comic_Neue({ subsets: ['latin'], display: 'swap', weight: ['400', '700'] })
const thumbnailLink = `/watch-paint-dry.webp`;
const faviconLink = `/favicon.png`;

export const metadata = {
  title: "Watch Paint Dry",
  description: "Can YOU endure and only watch paint dry without going for distractions at all?",
  keywords: 'paint dry, challenge, patience, game',
  icons: {
    icon: faviconLink,
  },
  openGraph: {
    title: "Watch Paint Dry",
    description: "Can YOU endure and only watch paint dry without going for distractions at all?",
    images: [
      {
        url: thumbnailLink,
        width: 1200,
        height: 630,
        alt: 'Watch Paint Dry',
      },
    ],
    siteName: 'Watch Paint Dry',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch Paint Dry",
    description: "Can YOU endure and only watch paint dry without going for distractions at all?",
    images: [
      {
        url: thumbnailLink,
        width: 1200,
        height: 630,
        alt: 'Watch Paint Dry',
      },
    ],
  },
  htmlLimited: true,
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className}>
      <body>{children}</body>
    </html>
  );
}
