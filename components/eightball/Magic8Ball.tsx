"use client";

import React, { useState } from 'react';
import { useEightBall } from './context/EightBallContext';
import ResizableText from '../common/ResizeableText';
import EightBallSvg from './EightBallSvg';
import QuestionInput from './QuestionInput';
import useEightBallShake from './hooks/useEightBallShake';
import { DiceSize } from '../../lib/types/eightball';

import styles from '../../styles/Magic8Ball.module.css';
import textStyles from '../../styles/EightBallText.module.css';

function Magic8Ball() {
  const {
    answer,
    ballCurrentState,
    diceStyle,
    currentPersonality
  } = useEightBall();
  
  const { shakeEightBall } = useEightBallShake();
  const [diceSize, setDiceSize] = useState<DiceSize>({ width: 0, height: 0 });

  const getDisplayText = () => {
    return ballCurrentState !== "error" ? answer : ">:(";
  };

  return (
    <div className={styles.eightBallWrapper}>
      <button
        id="eightBallWrapper"
        onClick={shakeEightBall}
        className={`${styles.eightBall} ${ballCurrentState === "shaking" ? styles.shake : ''}`}
        title="Click me to reveal your destiny."
        disabled={ballCurrentState === "shaking"}
      >
        <EightBallSvg 
          currentState={ballCurrentState} 
          diceColor={currentPersonality.theme.accentColor} 
          diceStyle={diceStyle} 
          setDiceSize={setDiceSize} 
        />

        <ResizableText
          minFontSize={10}
          initialFontSize={40}
          maxWidth={diceSize.width}
          maxHeight={diceSize.height}
          extraStyle={diceStyle}
          className={textStyles.eightBallText}
        >
          {getDisplayText()}
        </ResizableText>
      </button>

      <QuestionInput />
    </div>
  );
}

export default Magic8Ball;