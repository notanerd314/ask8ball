import { getRandomItem } from "@/helpers/rng";

const taglines = [
  "im not copying neal.fun trust",
  "making nothing useful since 2025",
  "please play my stuff so i can get ad revenue",
  "i have too much free time",
  "someone stop me",
  "this is a mistake 😭",
  "scroll for free robux",
  "hey kid, want free candy?",
  "definitely not malware",
  "is this you? 6714 Lake Glen St",
  "wait, you actually clicked?",
  "this will be dead in like 2 months",
  "i have a life btw, weird right?"
]

export default function Tagline() {
  return (
    <p className="text-3xl mt-2 font-bold text-shadow-xl">
      {getRandomItem(taglines)}
    </p>
  );
}