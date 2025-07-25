import { getAllPersonalities } from "@/helpers/api"
import Link from "next/link"
import { useEightBall } from "./EightBallContext";

export default function PersonalitySelector() {
  const personalities = getAllPersonalities();

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4">
      {personalities.map(p => (
        <Link
          href={`/eightball/${p.linkname}`}
          key={p.linkname}
          className={
            `flex items-center gap-1.5 text-lg font-medium py-2 px-4 rounded-full shadow-lg
            hover:scale-105 hover:brightness-110 active:scale-95 transition-all
            border border-white/40
          `}
          style={{ backgroundColor: `${p.theme?.accentColor}77` }}
          title={p.description}
        >
          <span className="text-2xl">{p.theme?.icon}</span>
          {p.name}
        </Link>
      ))}
    </div>
  )
}