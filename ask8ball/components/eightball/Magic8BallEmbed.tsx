import EightBallSvg from "./EightBallSvg"
import ResizableText from "../base/ResizeableText"
import styles from "../../styles/Magic8BallEmbed.module.css"
import textStyles from '../../styles/EightBallText.module.css'
import { useGlobal } from "../context/GlobalContext"

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
        <ResizableText maxWidth={diceSize.width} maxHeight={diceSize.height} minFontSize={1} initialFontSize={30} className={textStyles.eightBallText}>{answer}</ResizableText>
      </div>
    </>
  )
}

export default Magic8BallEmbed