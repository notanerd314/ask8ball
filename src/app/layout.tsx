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
      <body>
        {children}
      </body>
    </html>
  );
}
