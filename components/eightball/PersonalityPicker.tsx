import { PersonalityConfig } from "../../lib/prompts";
import { getAllPersonalities } from "../../lib/api";
import Link from "next/link";

/** 
 * Enhanced personality card component with better visual design
 * @param personality - Personality configuration to display
 * @returns JSX element with modern personality card
 */
export function PersonalityCard({ personality }: { personality: PersonalityConfig }) {
  return (
    <Link
      href={`/play/${personality.linkname}`}
      className="group block relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
      aria-label={`Choose ${personality.name} personality`}
      title={`Choose ${personality.name} personality`}
    >
      {/* Background with personality theme */}
      <div 
        className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: personality.theme.cssBackground }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
      
      {/* Content */}
      <div className="relative p-6 h-48 flex flex-col justify-between text-white">
        {/* Icon and tag */}
        <div className="flex items-start justify-between">
          <div className="text-4xl md:text-5xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            {personality.theme.icon}
          </div>
          {personality.tag && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
              {personality.tag}
            </span>
          )}
        </div>
        
        {/* Title and description */}
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-bold group-hover:text-white/90 transition-colors duration-200">
            {personality.name}
          </h3>
          <p className="text-sm md:text-base text-white/80 leading-relaxed line-clamp-2">
            {personality.description}
          </p>
        </div>
        
        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-3xl"
        style={{
          background: `radial-gradient(circle at center, ${personality.theme.accentColor}40 0%, transparent 70%)`
        }}
      />
    </Link>
  );
}

/** 
 * Enhanced personality selection grid with better layout
 * @returns Promise resolving to JSX element with modern personality grid
 */
export default async function PersonalityPicker() {
  const personalitiesList = await getAllPersonalities();

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Choose Your Oracle
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Each personality brings its own unique wisdom and perspective to your questions
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-24"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-24"></div>
          </div>
        </div>

        {/* Personality grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {personalitiesList.map((personality) => (
            <PersonalityCard key={personality.linkname} personality={personality} />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            Can't decide? Start with the <strong className="text-white">Sarcastic</strong> personality – it's a fan favorite! ✨
          </p>
        </div>
      </div>
    </section>
  );
}