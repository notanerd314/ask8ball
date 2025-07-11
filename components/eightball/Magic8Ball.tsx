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

/** 
 * Main eight ball component with shake functionality
 * @returns JSX element with interactive eight ball
 */
function Magic8Ball() {
  const {
    currentResponse,
    ballCurrentState,
    diceStyle,
    currentPersonality
  } = useEightBall();
  
  const { shakeEightBall, isLoading } = useEightBallShake();
  const [diceSize, setDiceSize] = useState<DiceSize>({ width: 0, height: 0 });

  const getDisplayText = () => {
    return ballCurrentState !== "error" ? currentResponse.response : ">:(";
  };

  const isShaking = ballCurrentState === "shaking" || isLoading;
  return (
    <div className={styles.eightBallWrapper}>
      <button
        id="eightBallWrapper"
        onClick={shakeEightBall}
        className={`${styles.eightBall} ${isShaking ? styles.shake : ''}`}
        title="Click me to reveal your destiny."
        disabled={isShaking}
        aria-label={`Magic 8 Ball with ${currentPersonality.name} personality. ${isShaking ? 'Thinking...' : 'Click to ask a question'}`}
        aria-live="polite"
        aria-atomic="true"
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
          aria-live="polite"
        >
          {getDisplayText()}
        </ResizableText>
      </button>

      <QuestionInput />
    </div>
  );
}

export default Magic8Ball;