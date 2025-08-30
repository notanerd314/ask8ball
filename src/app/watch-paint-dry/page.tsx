import Logo from "@/components/Logo";
import IntroductionOverlay from "@/components/watch-paint-dry/IntroductionOverlay.client";
import PaintDry from "@/components/watch-paint-dry/PaintDry.client";
import { PaintDryProvider } from "@/components/watch-paint-dry/PaintDryContext.client";
import WinOverlay from "@/components/watch-paint-dry/WinOverlay";
import FailOverlay from "@/components/watch-paint-dry/FailOverlay";

export default function WatchPaintDry() {
  return (
    <>
      <nav className="absolute z-100 top-6 left-6">
        <a href="/" className='transition-all hover:scale-105 active:scale-102'>
          <Logo color='black' />
        </a>
      </nav>

      <PaintDryProvider>
        <IntroductionOverlay />
        <FailOverlay />
        <WinOverlay />
        <PaintDry color="random" />
      </PaintDryProvider>
    </>
  )
}