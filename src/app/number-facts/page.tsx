import Fact from "@/components/number-facts/Fact";
import facts from "@/helpers/number-facts/facts";

export default async function NumberFacts() {
  return (
    <>
      <header className="pt-30 text-center space-y-1.5">
        <h1 className="text-6xl font-bold bg-white">Number Facts</h1>
        <h2 className="text-3xl bg-white ">Random facts about numbers, from 0 to 200!</h2>
      </header>

      <main className="mx-auto max-w-4xl px-10 mt-10 space-y-2 mb-10">
        {Object.entries(facts).map(([number, fact]) => (
          <Fact key={number} number={number} fact={fact.fact} source={fact.source} />
        ))}
      </main>

      <footer className="bg-white pb-5 pt-1">
        <p className="text-center">
          The facts are provided by <a href="http://numbersapi.com/" target="_blank" className="font-bold underline">numbersapi.com</a>
        </p>
        <p className="text-center">
          Made with 🔢 by notanerd
        </p>
      </footer>
    </>
  )
}