import PaintDryMain from "@/components/PaintDryMain.client";
import pkg from '@/../package.json';

const version = pkg.version;

export default function WatchPaintDry() {
  return (
    <>

      <PaintDryMain />

      <footer className="bottom-2 left-1/2 z-51 absolute px-2 w-full -translate-x-1/2">
        <p className="font-bold text-white text-xl text-center italic"
          style={{
            textShadow: "1px 0px 0px #000000"
          }}
        >
          VERSION {version}
        </p>
        <p className="text-md text-white/50 text-center">
          Made with 🖌 by notanerd
        </p>
      </footer>
    </>
  )
}