import Logo from "@/components/Logo";
import PaintDry from "@/components/watch-paint-dry/PaintDry.client";

export default function WatchPaintDry() {
  return (
    <>
      <nav className="absolute z-50 top-6 left-6">
        <a href="/" className='transition-all hover:scale-105 active:scale-102'>
          <Logo color='black' />
        </a>
      </nav>
      <PaintDry color="random" />
    </>
  )
}