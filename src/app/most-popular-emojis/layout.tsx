import '@/app/most-popular-emojis/globals.css'
import Logo from '@/components/Logo';

export const metadata = {
  title: 'Most Popular Emojis',
  description: "The fortune teller you did know you don't need it.",
  keywords: 'fortune, magic 8 ball, eight ball, ai, artifical intelligence',
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
      <nav className="fixed z-50 mx-6 my-5">
        <a href="/" className='transition-all hover:scale-105 active:scale-102'>
          <Logo size={50} color='black' />
        </a>
      </nav>
      {children}
    </>
  );
}
