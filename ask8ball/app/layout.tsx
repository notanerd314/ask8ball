import 'normalize.css';

import { DM_Sans } from 'next/font/google';
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-family'
});

export const metadata = {
  title: 'Ask the 8 Ball',
  description: 'Ask the 8 Ball',
  keywords: 'fortune, magic 8 ball, eight ball',
  icons: {
    icon: '/favicon.min.svg',
  },
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
    <html lang="en">
      <body style={dmSans.style} className="bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
