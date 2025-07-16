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
 * Optimized eight ball component
 * @returns JSX element with interactive eight ball
 */
function Magic8Ball() {
  const {
    currentResponse,
    ballCurrentState,
    diceStyle,
    currentPersonality
  } = useEightBall();
  
  const { shakeEightBall } = useEightBallShake();
  const [diceSize, setDiceSize] = useState<DiceSize>({ width: 0, height: 0 });

  const getDisplayText = () => {
    if (ballCurrentState === "error") return "Something went wrong! 😵";
    if (ballCurrentState === "shaking") return "🔮";
    return currentResponse.response || "Ask me anything...";
  };

  const getButtonTitle = () => {
    switch (ballCurrentState) {
      case "shaking": return "Consulting the spirits...";
      case "result": return "Click to ask another question";
      default: return "Click me to reveal your destiny";
    }
  };

  return (
    <div className={styles.eightBallWrapper}>
      {/* Simplified eight ball */}
      <div className="relative">
        <button
          id="eightBallWrapper"
          onClick={shakeEightBall}
          className={`
            ${styles.eightBall} 
            ${ballCurrentState === "shaking" ? styles.shake : ''}
            relative group
          `}
          title={getButtonTitle()}
          disabled={ballCurrentState === "shaking"}
        >
          <EightBallSvg 
            currentState={ballCurrentState} 
            diceColor={currentPersonality.theme.accentColor} 
            diceStyle={diceStyle} 
            setDiceSize={setDiceSize} 
          />

          <ResizableText
            minFontSize={1}
            initialFontSize={40}
            maxWidth={diceSize.width}
            maxHeight={diceSize.height}
            extraStyle={diceStyle}
            className={textStyles.eightBallText}
          >
            {getDisplayText()}
          </ResizableText>

          {/* Simplified loading indicator */}
          {ballCurrentState === "shaking" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </button>
      </div>

      <QuestionInput />
    </div>
  );
}

export default Magic8Ball;