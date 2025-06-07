"use client";

import { useEffect, useState } from "react"

import EightBallSvg from "./EightBallSvg"
import ResizableText from "../base/ResizeableText"
import styles from "../../styles/Magic8BallEmbed.module.css"
import textStyles from '../../styles/EightBallText.module.css'
import { useGlobal } from "../context/GlobalContext"

export default function Magic8BallEmbed() {
  const { diceSize } = useGlobal();

  const [answer, setAnswer] = useState<string | null>('[undefined]');
  const [question,setQuestion] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setAnswer(urlParams.get('answer') || '[undefined]');
    setQuestion(urlParams.get('question')); // You can use this if needed
  }, []);

  return (
    <div className={styles.eightBall}>
      <h1>{question}</h1>
      <EightBallSvg currentState="result" />
      <ResizableText
        maxWidth={diceSize.width}
        maxHeight={diceSize.height}
        minFontSize={1}
        initialFontSize={30}
        className={textStyles.eightBallText}
      >
        {answer}
      </ResizableText>
    </div>
  );
}