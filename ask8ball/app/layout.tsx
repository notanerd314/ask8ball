import Head from "next/head"
import 'normalize.css';

import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-family'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Ask the 8 Ball</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Ask the 8 Ball" />
        <meta name="keywords" content="fortune, magic 8 ball, eight ball" />
      </Head>
      <body style={dmSans.style}>
        {children}
      </body>
    </html>
  )
}
