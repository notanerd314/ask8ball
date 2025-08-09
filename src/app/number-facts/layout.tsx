import '@/app/number-facts/globals.css'
import Logo from '@/components/Logo';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function NumbersFactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="absolute z-50 ml-8 mt-5">
        <a href="/" className='transition-all hover:scale-105 active:scale-102'>
          <Logo size={60} color='black' />
        </a>
      </nav>
      {children}
    </>
  );
}
