import { PersonalityConfig } from "../../lib/prompts";
import { getAllPersonalities } from "../../lib/api";
import Link from "next/link";

/** 
 * Optimized personality card component
 * @param personality - Personality configuration to display
 * @returns JSX element with simplified personality card
 */
export function PersonalityCard({ personality }: { personality: PersonalityConfig }) {  
  return (
    <Link
      className="cursor-pointer shadow-2xl rounded-2xl overflow-hidden active:scale-95 hover:scale-105 transition-all duration-200 p-6 h-46 flex flex-col justify-between !text-white relative"
      style={{ background: personality.theme.cssBackground }}
      title={personality.description}
      href={`/${personality.linkname}`}
      scroll={false}
    >
      <div className="flex justify-between items-start">
        <span className="text-5xl">{personality.theme.icon}</span>
        {personality.tag && (
          <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">
            {personality.tag}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold">{personality.name}</h3>
        <p className="text-sm text-white/80 line-clamp-2">
          {personality.description}
        </p>
      </div>
    </Link>
  );
}


/** 
 * Optimized personality selection grid
 * @returns Promise resolving to JSX element with personality grid
 */
export default async function PersonalityPicker() {
  const personalitiesList = await getAllPersonalities(); // empty deps = only runs once

  return (
    <section className="py-12 px-4 bg-black/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Choose Your 8-Ball
          </h2>

          {/* Simplified decorative line */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <hr className="h-px border-white/30 w-36" />
            <span className="w-2 h-2  rounded-full bg-white/30"></span>
            <hr className="h-px border-white/30 w-36" />
          </div>
        </div>

        {/* Personality grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {personalitiesList.map((personality) => (
            <PersonalityCard key={personality.linkname} personality={personality} />
          ))}
          <PersonalityCard personality={{
            name: "More coming soon!",
            description: "Stay tuned for more personalities! If I ever will.",
            linkname: "sarcastic",
            prompt: '',
            examples: [],
            theme: {
              icon: "👀",
              accentColor: "bg-white/30",
              cssBackground: "linear-gradient(45deg, #1e293b, #0f172a)",
            }
          }} />
        </div>

        {/* Call to action */}
        <p className="text-center text-white/60 text-sm">
          Can't decide? Start with the
          <Link className="text-white font-bold" href="/sarcastic" scroll={false}> Sarcastic </Link>
          personality!
        </p>
      </div>
    </section>
  );
}