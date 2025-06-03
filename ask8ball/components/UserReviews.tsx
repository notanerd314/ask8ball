import styles from '../styles/UserReviews.module.css'

import ResizableText from './base/ResizeableText';
import { StarIcon } from './common/FontAwesome'

type Props = {
  quote: string;
  author: string;
  stars: number;
}

type StarProps = {
  stars: number;
  className?: string
}

export function StarRating({ stars, className }: StarProps) {
  return (
    <div className={styles.stars + ' ' + className}>
      {Array.from({ length: stars }).map((_, i) => (
        <StarIcon key={`filled-${i}`} color="#fcba03" />
      ))}
      {Array.from({ length: 5 - stars }).map((_, i) => (
        <StarIcon key={`empty-${i}`} color="#000000" />
      ))}
    </div>
  )
}

export default function UserReview({ quote, author, stars }: Props) {
  return (
    <article className={styles.userReviews}>
      <p>"{quote}"</p>
      <p className={styles.userReviewsAuthor}>- {author}</p>
      <StarRating className={styles.userReviewsStars} stars={stars} />
    </article>
  )
}