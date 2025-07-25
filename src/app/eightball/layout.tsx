import '@/app/globals.css'
import '@/app/eightball/globals.css'
import Link from 'next/link';
import Logo from '@/components/Logo';

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

export default function EightBallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="fixed z-50 px-6 py-3">
        <Link href="/">
          <Logo size={50} />
        </Link>
      </nav>
      {children}
    </>
  );
}
