"use client";

import { useState } from "react";
import style from "./EightBall.module.css";

import { useEightBall } from "./EightBallContext.client";
import EightBallSVG from "./EightBallSVG.client";
import useEightBallShake from "./hooks/useEightBallShake";
import EightBallText from "./EightBallText.client";
import { EightBallState } from "@/utils/eightball/types";

export default function EightBall() {
  const { currentPersonality, currentBallState, currentResponse, diceStyle } = useEightBall();
  const [diceSize, setDiceSize] = useState({
    width: 0,
    height: 0
  });
  const { shakeEightBall } = useEightBallShake();

  return (
    <button
      className={`
        ${style.eightBall}
        ${currentBallState === EightBallState.Shaking ? style.shake : ""}
      `}
      style={{
        border: `10px solid ${currentPersonality.theme?.accentColor}B3`,
      }}
      onClick={shakeEightBall}
    >
      <EightBallSVG
        diceColor={currentPersonality.theme?.accentColor!}
        currentState={currentBallState}
        diceStyle={diceStyle}
        setDiceSize={setDiceSize}
      />
      <EightBallText 
        minFontSize={1}
        initialFontSize={40}
        maxWidth={diceSize.width}
        maxHeight={diceSize.height}
        extraStyle={diceStyle}
        className={style.eightBallText}
      >
        {currentResponse.answer || "Ask me anything..."}
      </EightBallText>
    </button>
  )
}