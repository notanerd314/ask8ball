import { StarIcon } from '../utils/FontAwesome'

type Props = {
  quote: string;
  author: string;
  stars: number;
}

interface StarProps {
  stars: number; // Can be 0 to 5, including halves like 3.5
  className?: string;
}

export function StarRating({ stars, className = "" }: StarProps) {
  return (
    <div className={'flex' + ' ' + className}>
      {Array.from({ length: stars }).map((_, i) => (
        <StarIcon key={`filled-${i}`} color="#fcba03" />
      ))}
      {Array.from({ length: 5 - stars }).map((_, i) => (
        <StarIcon key={`empty-${i}`} color="#000000" />
      ))}
    </div>
  )
}

/*
  * Best component ever.
  * @param quote
  * @param author
  * @param stars
  * @returns [JSX.Element, actualFun]
*/
export default function UserReview({ quote, author, stars }: Props) {
  return (
    <article className="relative flex flex-col w-xs p-3 text-center border-2 border-transparent shadow-lg gap-2 transition duration-300 ease-in-out rounded-md bg-slate-200 hover:border-indigo-500 hover:-translate-y-1 dark:bg-slate-900">
      <StarRating className='mb-1' stars={stars} />
      <p>&quot;{quote}&quot;</p>
      <p className='text-sm italic text-gray-500 dark:text-gray-300'>- {author}</p>
    </article>
  )
}
