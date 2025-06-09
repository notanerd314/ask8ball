import styles from '../../styles/UserReviews.module.css'

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
    <article className="bg-white border-black border-2 rounded-lg text-center relative p-3 flex flex-col gap-2">
      <StarRating stars={stars} />
      <p>&quot;{quote}&quot;</p>
      <p className='italic text-gray-500 text-sm'>- {author}</p>
    </article>
  )
}
