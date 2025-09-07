import './globals.css'
import Logo from '@/components/Logo';

export const metadata = {
  title: 'Fact or False',
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
      <nav className="absolute z-50 top-6 left-6">
        <a href="/" className='transition-all hover:scale-105 active:scale-102'>
          <Logo color='black' />
        </a>
      </nav>
      {children}
    </>
  );
}
