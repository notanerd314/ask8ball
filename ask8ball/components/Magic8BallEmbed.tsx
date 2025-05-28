import EightBallSvg from "./EightBallSvg"
import EightBallText from "./EightBallText"
import styles from "../styles/Magic8BallEmbed.module.css"
import { useGlobal } from "./common/GlobalContext"

type Props = {
  answer?: string;
  question?: string;
}

const Magic8BallEmbed: React.FC<Props> = ({ answer, question }: Props) => {
  const { diceSize } = useGlobal();
  return (
    <>
      <div className={styles.eightBall}>
        <EightBallSvg isShaking={true} />
        <EightBallText maxWidth={diceSize.width} maxHeight={diceSize.height} minFontSize={1} initialFontSize={30}>{answer}</EightBallText>
      </div>
    </>
  )
}

export default Magic8BallEmbed