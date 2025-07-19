import 'normalize.css';

import { Fredoka, Rubik } from 'next/font/google';
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fredoka'
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik'
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${rubik.variable} font-fredoka text-white`}>
        {children}
      </body>
    </html>
  );
}
