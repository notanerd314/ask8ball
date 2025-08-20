"use client";

import { useState, useEffect } from "react";
import style from "./EightBall.module.css";

import { useEightBall } from "./EightBallContext.client";
import EightBallSVG from "./EightBallSVG.client";
import useEightBallShake from "./hooks/useEightBallShake";
import EightBallText from "./EightBallText.client";
import { EightBallState } from "@/utils/eightball/types";

export default function EightBall() {
  const { currentPersonality, currentBallState, currentResponse } = useEightBall();
  const [diceStyle, setDiceStyle] = useState({ opacity: 0, transition: "none" })
  const [diceSize, setDiceSize] = useState({
    width: 0,
    height: 0
  });
  const { shakeEightBall } = useEightBallShake();

  useEffect(() => {
    if (currentBallState === EightBallState.Shaking) {
      setDiceStyle({
        opacity: 0,
        transition: "none"
      });
    } else if (currentBallState === EightBallState.Result) {
      setTimeout(() => {
        setDiceStyle({
          transition: `opacity 0.75s ease`,
          opacity: 1,
        });
        console.log("Shown result");
      }, 500);
    }
  }, [currentBallState]);

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