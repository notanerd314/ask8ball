import { getAllPersonalities } from "@/helpers/api"
import Link from "next/link"
import { useEightBall } from "./EightBallContext";

export default function PersonalitySelector() {
  const personalities = getAllPersonalities();
  const { currentPersonality } = useEightBall();

  return (
    <div className="flex gap-4">
      {personalities.map(p => (
        <Link
          href={`/${p.linkname}`}
          key={p.linkname}
          className={
            `flex items-center gap-1.5 text-lg font-medium py-2 px-4 rounded-full shadow-lg
            hover:scale-105 hover:brightness-110 active:scale-95 transition-all
            ${currentPersonality.linkname === p.linkname ? "border-2 border-white" : "border border-white/30"}
          `}
          style={{ backgroundColor: `${p.theme?.accentColor}66` }}
          title={p.description}
        >
          <span className="text-2xl">{p.theme?.icon}</span>
          {p.name}
        </Link>
      ))}
    </div>
  )
}