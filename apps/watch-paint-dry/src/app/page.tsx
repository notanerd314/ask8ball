import { Logo } from "@notanerd/components";
import PaintDryMain from "@/components/PaintDryMain.client";

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
        <p className="text-xl italic font-bold text-center text-white"
          style={{
            textShadow: "1px 0px 0px #000000"
          }}
        >
          You have to wait for the paint to fully touch dry in order to win!
        </p>
        <p className="text-md text-center text-white/50">
          Made with 🖌 by notanerd
        </p>
      </footer>
    </>
  )
}