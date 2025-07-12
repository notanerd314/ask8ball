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
 * Enhanced eight ball component with improved animations and feedback
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
      {/* Enhanced eight ball with personality-based glow */}
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
          style={{
            boxShadow: ballCurrentState === "result" 
              ? `0 0 60px ${currentPersonality.theme.accentColor}40, 0 0 120px ${currentPersonality.theme.accentColor}20`
              : undefined
          }}
        >
          {/* Hover glow effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"
            style={{
              background: `radial-gradient(circle, ${currentPersonality.theme.accentColor}40 0%, transparent 70%)`
            }}
          />

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

          {/* Loading indicator for shaking state */}
          {ballCurrentState === "shaking" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </button>

        {/* Status indicator */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className={`
            px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md
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