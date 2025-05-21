import Head from "next/head"

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
      <body>{children}</body>
    </html>
  )
}
