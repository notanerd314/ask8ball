import styles from '../styles/UserReviews.module.css'

import { StarIcon, HalfStarIcon } from './common/FontAwesome'

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
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`${styles.stars} ${className}`}>
      {/* Filled stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarIcon key={`filled-${i}`} color="#fcba03" />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <HalfStarIcon
          key="half"
          leftColor="#fcba03"
          rightColor="#000000"
        />
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <StarIcon key={`empty-${i}`} color="#000000" />
      ))}
    </div>
  );
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
    <article className={styles.userReviews}>
      <p>&quot;{quote}&quot;</p>
      <p className={styles.userReviewsAuthor}>- {author}</p>
      <StarRating className={styles.userReviewsStars} stars={stars} />
    </article>
  )
}