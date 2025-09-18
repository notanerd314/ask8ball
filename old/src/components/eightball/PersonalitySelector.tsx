"use client";

import { getAllPersonalities } from "../../utils/eightball/personalities"
import { useEightBall } from "./EightBallContext.client";
import { EightBallState } from "../../utils/eightball/types";
import Link from "next/link"

export default function PersonalitySelector() {
  const { currentBallState } = useEightBall();
  const personalities = getAllPersonalities();

  return (
    <div className="flex flex-wrap justify-center px-4 gap-4">
      {personalities.map(p => (
        <Link
          href={`/eightball/${p.linkname}`}
          key={p.linkname}
          className={
            `flex items-center gap-1.5 text-lg font-bold py-2 px-4 rounded-full shadow-lg
            hover:scale-105 hover:brightness-110 active:scale-95 transition-all
            border border-white/40 ${currentBallState === EightBallState.Shaking ? "cursor-not-allowed pointer-events-none opacity-50" : "cursor-pointer"}
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