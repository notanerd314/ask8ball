"use client";

import React, { useState } from 'react';
import { useEightBall } from '../context/EightBallContext';
import ResizableText from '../common/ResizeableText';
import EightBallSvg from './EightBallSvg';

import styles from '../../styles/Magic8Ball.module.css';
import textStyles from '../../styles/EightBallText.module.css';

import useEightBallShake from '../hooks/ShakeEightBall';
import QuestionInput from './QuestionInput';

import * as motion from "motion/react-client"

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
      <motion.button
        id="eightBallWrapper"
        onClick={shakeEightBall}
        className={`${styles.eightBall} ${ballCurrentState === "shaking" ? styles.shake : ''}`}
        title="Click me to reveal your destiny."
        disabled={ballCurrentState === "shaking"}
        whileTap={{ scale: 0.95 }}
        whileHover={{ 
          scale: ballCurrentState === "shaking" ? 1 : 1.05,
          filter: ballCurrentState === "shaking" ? "none" : "drop-shadow(0 20px 40px rgba(139, 92, 246, 0.3))"
        }}
        animate={{ 
          y: ballCurrentState === "shaking" ? 0 : [0, -8, 0],
          filter: ballCurrentState === "result" ? "drop-shadow(0 25px 50px rgba(139, 92, 246, 0.4))" : "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3))"
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            duration: 0.2,
            ease: "easeOut"
          },
          filter: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }}
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
      </motion.button>

      <QuestionInput />
    </div>
  );
}

export default Magic8Ball;