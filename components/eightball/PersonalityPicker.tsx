import { PersonalityConfig } from "../../lib/prompts"
import { getAllPersonalities } from "../../lib/api"
import Link from "next/link"

export function Personality({ personality }: { personality: PersonalityConfig }) {
  return (
    <Link href={`/play/${personality.linkname}`} className=" !bg-gray-500 p-4 !text-white rounded-md h-full hover:scale-105 transition-transform">
      <div className="flex flex-col gap-1 text-center w-full">
        <h1>{personality.name}</h1>
        <p>{personality.long_name}</p>
      </div>
    </Link>
  )
}

export default async function PersonalityPicker() {
  const personalitiesList = await getAllPersonalities()
  console.log("Personalities:", personalitiesList)

  return (
    <div className=''>
      <h1 className='text-center'>Try more personalities</h1>
      <div className='grid grid-cols-2 xl:w-5xl lg:w-3xl lg:grid-cols-3 p-5 gap-5 mx-auto'>
        {personalitiesList.map((personality, index) => (
          <Personality key={index} personality={personality} />
        ))}
      </div>
    </div>
  )
}
