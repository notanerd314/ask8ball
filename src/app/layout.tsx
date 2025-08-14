import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
