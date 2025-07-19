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
      className="cursor-pointer shadow-2xl rounded-3xl overflow-hidden active:scale-95 hover:scale-110 transition-all duration-300 p-8 h-52 flex flex-col justify-between !text-white relative border-4 border-white/20 hover:border-white/40"
      style={{ background: personality.theme.cssBackground }}
      title={personality.description}
      href={`/${personality.linkname}`}
      scroll={false}
    >
      <div className="flex justify-between items-start">
        <span className="text-6xl drop-shadow-lg">{personality.theme.icon}</span>
        {personality.tag && (
          <span className="text-sm font-bold bg-black/50 px-3 py-1 rounded-full border-2 border-white/30">
            {personality.tag}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-black mb-2 drop-shadow-lg">{personality.name}</h3>
        <p className="text-base font-bold text-white/90 line-clamp-2 drop-shadow-md">
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
    <section className="py-16 px-6 bg-black/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl md:text-7xl font-black">
            🎱 CHOOSE YOUR MAGIC! 🎱
          </h2>

          {/* Simplified decorative line */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent w-48 rounded-full"></div>
            <span className="text-4xl">✨</span>
            <div className="h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent w-48 rounded-full"></div>
          </div>
        </div>

        {/* Personality grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {personalitiesList.map((personality) => (
            <PersonalityCard key={personality.linkname} personality={personality} />
          ))}
          <PersonalityCard personality={{
            name: "MORE MAGIC SOON!",
            description: "Stay tuned for more wild personalities! The magic never stops! ✨",
            linkname: "sarcastic",
            prompt: '',
            examples: [],
            theme: {
              icon: "🔮",
              accentColor: "#8B5CF6",
              cssBackground: "linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)",
            }
          }} />
        </div>

        {/* Call to action */}
        <p className="text-center text-white/80 text-xl font-bold bg-black/40 px-8 py-4 rounded-3xl border-4 border-white/20 max-w-2xl mx-auto">
          Can't decide? Start with the 
          <Link className="text-yellow-400 font-black hover:text-pink-400 transition-colors" href="/sarcastic" scroll={false}> SARCASTIC 😒 </Link>
          personality for maximum chaos!
        </p>
      </div>
    </section>
  );
}