"use client";

import { useEffect, useState } from "react"

import EightBallSvg from "./EightBallSvg"
import ResizableText from "../common/ResizeableText"
import styles from "../../styles/Magic8BallEmbed.module.css"
import textStyles from '../../styles/EightBallText.module.css'
import { useGlobal } from "../context/GlobalContext"

export default function Magic8BallEmbed() {
  const { diceSize } = useGlobal();

  const [answer, setAnswer] = useState<string | null>('[undefined]');
  const [question, setQuestion] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setAnswer(urlParams.get('answer') || '[undefined]');
    setQuestion(urlParams.get('question')); // You can use this if needed
  }, []);

  return (
    <div className="bg-white flex flex-col items-center justify-center h-screen">
      <h1 className="text-center font-bold m-5 text-black !text-6xl">{question}</h1>

      <div className="flex flex-col items-center relative rounded-full overflow-hidden my-10 w-[90%]">
        <EightBallSvg currentState="result" />
        <ResizableText
          maxWidth={diceSize.width}
          maxHeight={diceSize.height}
          minFontSize={10}
          initialFontSize={60}
          className={textStyles.eightBallText}
        >
          {answer}
        </ResizableText>
      </div>

      <p className="text-center m-5 text-black !text-3xl">Visit ask8ball.org to ask!</p>
    </div>
  );
}