import { PersonalityConfig } from "../../lib/prompts"
import { getAllPersonalities } from "../../lib/api"

import Link from "next/link"

export function Personality({ personality }: { personality: PersonalityConfig }) {
  return (
    <Link
      href={`/play/${personality.linkname}`}
      className={`block p-4 !text-white rounded-xl h-48 hover:scale-105 hover:-translate-y-2 transition-all border-2 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 ${personality.theme.tailwindHoverClass} active:translate-0 leading-normal text-center`}
      aria-label={`Choose ${personality.name} personality`}
      title={`Choose ${personality.name} personality`}
      role="link"
    >
      <span className="w-auto text-5xl">{personality.theme.icon}</span>
      <h2 className={`!text-3xl font-bold ${personality.tag && "flex items-center justify-center mt-2 mb-1 gap-2"}`}>
        {personality.name}
        {personality.tag && <mark className="!text-[0.95rem]">{personality.tag}</mark>}
      </h2>
      <p>{personality.description}</p>

    </Link>
  )
}

export default async function PersonalityPicker() {
  const personalitiesList = await getAllPersonalities()
  console.log("Personalities:", personalitiesList)

  return (
    <section>
      <h2 className='text-center'>Try more personalities</h2>

      <div className='grid grid-cols-2 gap-6 p-5 mx-auto xl:w-5xl lg:w-4xl md:grid-cols-3 items-stretch'>
        {personalitiesList.map((personality, index) => (
          <Personality key={index} personality={personality} />
        ))}
      </div>
    </section>
  )
}
