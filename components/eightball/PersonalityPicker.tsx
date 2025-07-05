import { getAllPersonalities } from "../../lib/api";
import PersonalityCard from "./PersonalityCard";

export default async function PersonalityPicker() {
  const personalitiesList = await getAllPersonalities();

  return (
    <section>
      <h2 className='text-center'>Try more personalities</h2>

      <div className='grid grid-cols-2 gap-6 p-5 mx-auto xl:w-5xl lg:w-4xl md:grid-cols-3 items-stretch'>
        {personalitiesList.map((personality, index) => (
          <PersonalityCard key={personality.linkname} personality={personality} />
        ))}
      </div>
    </section>
  );
}