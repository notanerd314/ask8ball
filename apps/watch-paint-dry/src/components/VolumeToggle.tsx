import { useVolume } from "./VolumeContext"

export default function VolumeToggle() {
  const { volume, setVolume } = useVolume();
  
  return (
    <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="top-6 right-6 z-51 absolute text-6xl hover:scale-105 active:scale-95 transition-all cursor-pointer">
      {volume === 0 ? "🔇" : "🔊"}
    </button>
  )
}