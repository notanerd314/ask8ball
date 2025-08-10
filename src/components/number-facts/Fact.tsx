import FactNumber from "./FactNumber";

export default function Fact(
  { number, fact, source }: { number: string, fact: string, source: string | null }
) {
  return (
    <section id={`fact-${number}`} className="bg-gradient-to-b from-gray-200 to-gray-300 w-full min-h-36 p-5 flex gap-7 items-center">
      <FactNumber number={number} />
      <div>
        <p className="text-2xl font-bold">{fact}</p>
        {source && <a className="text-sm underline text-blue-600" href={source} title="Source">{source}</a>}
      </div>
    </section>
  )
}