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
            minFontSize={12}
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
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </button>

        {/* Simplified status indicator */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${ballCurrentState === "shaking" ? "bg-yellow-500/20 text-yellow-200" : ""}
            ${ballCurrentState === "result" ? "bg-green-500/20 text-green-200" : ""}
            ${ballCurrentState === "error" ? "bg-red-500/20 text-red-200" : ""}
            ${ballCurrentState === "normal" ? "bg-white/10 text-white/60" : ""}
          `}>
            {ballCurrentState === "shaking" && "Thinking..."}
            {ballCurrentState === "result" && "Revealed!"}
            {ballCurrentState === "error" && "Error"}
            {ballCurrentState === "normal" && "Ready"}
          </div>
        </div>
      </div>

      <QuestionInput />
    </div>
  );
}

export default Magic8Ball;