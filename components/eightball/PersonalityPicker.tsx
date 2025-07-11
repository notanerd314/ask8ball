import { PersonalityConfig } from "../../lib/prompts";
import { getAllPersonalities } from "../../lib/api";
import Link from "next/link";

const PERSONALITY_CARD_CLASSES = "block p-4 !text-white rounded-xl h-48 hover:scale-105 hover:-translate-y-2 transition-all border-2 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 active:translate-0 leading-normal text-center";
const ICON_CLASSES = "w-auto text-5xl";
const TITLE_BASE_CLASSES = "!text-3xl font-bold";
const TITLE_WITH_TAG_CLASSES = "flex items-center justify-center mt-2 mb-1 gap-2";
const TAG_CLASSES = "!text-[0.95rem]";

/** 
 * Individual personality card component
 * @param personality - Personality configuration to display
 * @returns JSX element with clickable personality card
 */
export function PersonalityCard({ personality }: { personality: PersonalityConfig }) {
  const titleClasses = `${TITLE_BASE_CLASSES} ${
    personality.tag ? TITLE_WITH_TAG_CLASSES : ""
  }`;

  const cardClasses = `${PERSONALITY_CARD_CLASSES} ${personality.theme.tailwindHoverClass}`;

  return (
    <Link
      href={`/play/${personality.linkname}`}
      className={cardClasses}
      aria-label={`Choose ${personality.name} personality`}
      title={`Choose ${personality.name} personality`}
    >
      <span className={ICON_CLASSES} aria-hidden="true">{personality.theme.icon}</span>
      <h2 className={titleClasses}>
        {personality.name}
        {personality.tag && <mark className={TAG_CLASSES}>{personality.tag}</mark>}
      </h2>
      <p>{personality.description}</p>
    </Link>
  );
}

/** 
 * Grid of personality cards for selection
 * @returns Promise resolving to JSX element with personality selection grid
 */
export default async function PersonalityPicker() {
  const personalitiesList = await getAllPersonalities();

  return (
    <section aria-labelledby="personality-picker-title">
      <h2 id="personality-picker-title" className='text-center'>Try more personalities</h2>

      <div 
        className='items-stretch p-5 mx-auto grid grid-cols-2 gap-6 xl:w-5xl lg:w-4xl md:grid-cols-3'
        role="grid"
        aria-label="Personality selection grid"
      >
        {personalitiesList.map((personality, index) => (
          <div key={personality.linkname} role="gridcell">
            <PersonalityCard personality={personality} />
          </div>
        ))}
      </div>
    </section>
  );
}