import { getRandomItem } from "@/rng";

export function GET(req: Request) {
  const facts = [
    { statement: "Bananas are berries.", isTrue: true },
    { statement: "Sharks existed before trees.", isTrue: true },
    { statement: "Humans can breathe in space without a suit.", isTrue: false },
    { statement: "Honey never spoils.", isTrue: true },
    { statement: "The Great Wall of China is visible from the Moon.", isTrue: false },
    { statement: "Octopuses have three hearts.", isTrue: true },
    { statement: "Lightning never strikes the same place twice.", isTrue: false },
    { statement: "Sloths can hold their breath longer than dolphins.", isTrue: false },
    { statement: "There’s a species of jellyfish that is immortal.", isTrue: true },
    { statement: "Goldfish only have a 3-second memory.", isTrue: false }
  ];

  // Pick a random fact to return
  const randomFact = getRandomItem(facts);

  return new Response(JSON.stringify(randomFact), {
    headers: { "Content-Type": "application/json" }
  });
}
