import EightBallSvg from "./EightBallSvg"
import EightBallText from "./EightBallText"
import styles from "../styles/Magic8BallEmbed.module.css"

type Props = {
  answer?: string;
  question?: string;
}

const Magic8BallEmbed: React.FC<Props> = ({ answer, question }: Props) => {
  return (
    <div className={styles.embedContainer}>
      {/* <h1>{question}</h1> */}
      <div className={styles.eightBall}>
        <EightBallSvg isShaking={true} />
        <EightBallText maxWidth={15} maxHeight={15} minFontSize={5} initialFontSize={30}>{answer}</EightBallText>
      </div>
    </div>
  )
}

export default Magic8BallEmbed