import FactNumber from "./FactNumber";

export default function Fact(
  { number, fact }: { number: string, fact: string }
) {
  return (
    <section id={`fact-${number}`} className="bg-gradient-to-b from-gray-200 to-gray-300 w-full min-h-36 p-5 flex gap-7 items-center">
      <FactNumber number={number} />
      <p className="text-2xl font-bold">{fact}</p>
    </section>
  )
}