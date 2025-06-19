"use client";

import React, { useState } from 'react';
import { useEightBall } from '../context/EightBallContext';
import ResizableText from '../common/ResizeableText';
import EightBallSvg from './EightBallSvg';

import styles from '../../styles/Magic8Ball.module.css';
import textStyles from '../../styles/EightBallText.module.css';

import useEightBallShake from '../hooks/ShakeEightBall';
import QuestionInput from './QuestionInput';

const TapToShake = ({ shakeCount }: { shakeCount: number }) => (
  <p
    className='p-3 px-6 text-3xl font-bold text-center text-white bg-indigo-500 rounded-md wiggle'
    hidden={shakeCount > 0}
  >
    Click me to reveal your destiny.
  </p>
);

function Magic8Ball() {
  const {
    answer,
    ballCurrentState,
    diceStyle,
  } = useEightBall();
  const { shakeEightBall } = useEightBallShake();
  const [diceSize, setDiceSize] = useState({ width: 0, height: 0 });

  return (
    <div className={styles.eightBallWrapper}>
      <button
        id="eightBallWrapper"
        onClick={shakeEightBall}
        className={`${styles.eightBall} ${ballCurrentState === "shaking" ? styles.shake : ''}`}
        title="Click me to reveal your destiny."
        disabled={ballCurrentState === "shaking"}
      >
        <EightBallSvg currentState={ballCurrentState} diceStyle={diceStyle} setDiceSize={setDiceSize} />

        <ResizableText
          minFontSize={10}
          initialFontSize={40}
          maxWidth={diceSize.width}
          maxHeight={diceSize.height}
          extraStyle={diceStyle}
          className={textStyles.eightBallText}
        >
          {ballCurrentState !== "error" ? answer : ">:("}
        </ResizableText>
      </button>

      <QuestionInput />
    </div>
  );
}

export default Magic8Ball;
