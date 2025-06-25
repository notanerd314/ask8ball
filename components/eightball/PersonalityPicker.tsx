import { PersonalityConfig } from "../../lib/prompts";
import { getAllPersonalities } from "../../lib/api";
import Link from "next/link";
import * as motion from "motion/react-client";

export function Personality({ personality, index }: { personality: PersonalityConfig; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link 
        href={`/play/${personality.linkname}`} 
        className="block p-6 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-purple-800 hover:to-indigo-900 text-white rounded-xl h-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl border border-slate-700 hover:border-purple-500 group"
      >
        <div className="flex flex-col gap-3 text-center w-full h-full">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
            {personality.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold group-hover:text-purple-300 transition-colors duration-300">
            {personality.name}
          </h2>
          <p className="text-slate-300 group-hover:text-slate-200 text-sm leading-relaxed flex-1">
            {personality.long_name}
          </p>
          <div className="mt-auto pt-3 border-t border-slate-600 group-hover:border-purple-500 transition-colors duration-300">
            <span className="text-xs text-slate-400 group-hover:text-purple-300 font-medium">
              Try this personality →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default async function PersonalityPicker() {
  const personalitiesList = await getAllPersonalities();

  return (
    <motion.section 
      className="py-16 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Explore Different Personalities
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Each personality brings its own unique flavor to your fortune-telling experience. 
            Choose one that matches your mood!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalitiesList.map((personality, index) => (
            <Personality key={personality.linkname} personality={personality} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-slate-400 text-sm">
            More personalities coming soon! Each one is carefully crafted for a unique experience.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}