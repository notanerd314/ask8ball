import styles from '../styles/UserReviews.module.css'
import { StarIcon } from './common/FontAwesome'

type Props = {
  quote: string;
  author: string;
  stars: number;
}

type StarProps = {
  stars: number;
}

export function StarRating({ stars }: StarProps) {
  return (
    <div className={styles.stars}>
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
    <div className={styles.userReviews}>
      <p>{quote}</p>
      <p>{author}</p>
      <StarRating stars={stars} />
    </div>
  )
}