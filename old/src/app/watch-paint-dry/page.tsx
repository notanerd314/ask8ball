import Logo from "../../components/Logo";
import PaintDryMain from "../../components/watch-paint-dry/PaintDryMain.client";

export default function WatchPaintDry() {
  return (
    <>
      <nav className="absolute z-100 top-6 left-6">
        <a href="/" className='transition-all hover:scale-105 active:scale-102'>
          <Logo color='black' />
        </a>
      </nav>

      <PaintDryMain />
      <footer className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <p className="text-center text-white/50 text-sm">
          Made with 🖌 by notanerd
        </p>
      </footer>
    </>
  )
}