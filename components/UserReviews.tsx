import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type Props = {
  quote: string;
  author: string;
  stars: number;
}

interface StarProps {
  stars: number; // Can be 0 to 5, including halves like 3.5
  className?: string;
}

/** 
 * Renders star rating display
 * @param stars - Number of stars to display (0-5)
 * @param className - Additional CSS classes
 * @returns JSX element with star rating
 */
export function StarRating({ stars, className = "" }: StarProps) {
  return (
    <div className={'flex' + ' ' + className}>
      {Array.from({ length: stars }).map((_, i) => (
        <FontAwesomeIcon key={`filled-${i}`} icon={faStar} color="#fcba03" />
      ))}
      {Array.from({ length: 5 - stars }).map((_, i) => (
        <FontAwesomeIcon key={`empty-${i}`} icon={faStar} color="#000000" />
      ))}
    </div>
  )
}

/** 
 * User review component with star rating
 * @param quote - Review text content
 * @param author - Name of the reviewer
 * @param stars - Star rating (0-5)
 * @returns JSX element displaying user review
 */
export default function UserReview({ quote, author, stars }: Props) {
  return (
    <article className="relative flex flex-col p-3 text-center border-2 border-transparent shadow-lg w-xs gap-2 transition duration-300 ease-in-out rounded-md bg-slate-200 hover:border-indigo-500 hover:-translate-y-1 dark:bg-slate-900">
      <StarRating className='mb-1' stars={stars} />
      <p>"{quote}"</p>
      <p className='text-sm italic text-gray-500 dark:text-gray-300'>- {author}</p>
    </article>
  )
}