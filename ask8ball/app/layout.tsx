export const metadata = {
  title: 'Ask the Magic 8 Ball',
  description: 'The comeback of the classic Magic 8 Ball, with customization and more!',
  charSet: "UTF-8",
  keywords: "magic 8 ball, eight ball, "
}

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
      <body>{children}</body>
    </html>
  )
}
