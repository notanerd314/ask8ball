import './globals.css'
import { Comic_Neue } from 'next/font/google'

const font = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
