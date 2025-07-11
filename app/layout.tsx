import 'normalize.css';

import { DM_Sans } from 'next/font/google';
import './globals.css'
import { generateMetadata as generateMeta } from '../lib/utils/meta';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-family'
});

export const metadata = generateMeta({
  title: 'Ask the 8 Ball - AI-Powered Magic 8 Ball with Personalities',
  description: "Get mystical answers from AI-powered Magic 8 Ball personalities. Ask questions and receive entertaining responses from sarcastic, villainous, childish, and flattering oracles.",
  keywords: ['magic 8 ball', 'ai fortune teller', 'mystical answers', 'entertainment', 'divination', 'oracle'],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B5CF6',
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.min.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.min.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body style={dmSans.style} className="text-slate-50 bg-slate-900">
        {children}
      </body>
    </html>
  );
}
