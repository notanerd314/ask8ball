import './globals.css'

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
      <body className='text-white'>
        {children}
      </body>
    </html>
  );
}
