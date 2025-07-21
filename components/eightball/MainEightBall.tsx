"use client";

import React, { useState } from 'react';
import { EightBallProvider, useEightBall } from "./context/EightBallContext";
import ResizableText from '../common/ResizeableText';
import EightBallSvg from './EightBallSvg';
import useEightBallShake from './hooks/useEightBallShake';
import { DiceSize, PersonalityConfig } from '../../lib/types/eightball';
import { personalitiesList } from '../../lib/personalities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCamera, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import useCopyText, { generateShareText } from './hooks/useCopyShareText';
import useQuestionInput from './hooks/useQuestionInput';
import { QUESTION_MAX_LENGTH } from '../../lib/constants/eightball';

import styles from '../../styles/Magic8Ball.module.css';
import textStyles from '../../styles/EightBallText.module.css';

/** 
 * Unified single-page eight ball experience
 * @returns JSX element with complete eight ball interface
 */
function UnifiedEightBallContent() {
  const {
    currentResponse,
    ballCurrentState,
    diceStyle,
    currentPersonality,
    setCurrentPersonality,
    question
  } = useEightBall();
  
  const { shakeEightBall } = useEightBallShake();
  const [diceSize, setDiceSize] = useState<DiceSize>({ width: 0, height: 0 });
  const { copyText, copyIndicated } = useCopyText(currentResponse);
  const {
    questionRef,
    charactersLeft,
    changeQuestion,
    isDisabled
  } = useQuestionInput();

  const hasResponse = !!currentResponse.response && ballCurrentState !== "shaking";

  const getDisplayText = () => {
    if (ballCurrentState === "error") return "Something went wrong! 😵";
    if (ballCurrentState === "shaking") return "🔮";
    return currentResponse.response || "Ask me anything...";
  };

  const handleSubmit = () => {
    questionRef.current?.blur();
    shakeEightBall();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const progress = Math.max(0, ((QUESTION_MAX_LENGTH - charactersLeft) / QUESTION_MAX_LENGTH) * 100);
  const charColor = charactersLeft <= 0
    ? "text-red-400"
    : charactersLeft <= 30
      ? "text-yellow-400"
      : "text-white/40";

  const progressColor = charactersLeft <= 0
    ? "bg-red-400"
    : charactersLeft <= 30
      ? "bg-yellow-400"
      : "bg-green-400";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Cosmic background with personality theme */}
      <div
        className="fixed inset-0 opacity-90 -z-50"
        style={{ 
          background: `${currentPersonality.theme.cssBackground}, radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1), transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2), transparent 50%)`
        }}
      />
      
      {/* Subtle noise overlay */}
      <div className="fixed inset-0 opacity-20 -z-40 bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.4\"/%3E%3C/svg%3E')]" />

      {/* Main container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
        
        {/* 1. Title and tagline */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl">
            Ask the 8 Ball
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-medium">
            The fortune teller you didn't know you don't need
          </p>
        </div>

        {/* 2. Personality selector */}
        <div className="w-full max-w-3xl">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {personalitiesList.map((personality) => (
              <button
                key={personality.linkname}
                onClick={() => setCurrentPersonality(personality)}
                className={`
                  px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm md:text-base
                  border-2 backdrop-blur-sm
                  ${currentPersonality.linkname === personality.linkname
                    ? 'bg-white/20 border-white/60 text-white shadow-lg scale-105'
                    : 'bg-black/20 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/40 hover:scale-102'
                  }
                `}
                style={{
                  boxShadow: currentPersonality.linkname === personality.linkname 
                    ? `0 0 20px ${personality.theme.accentColor}40` 
                    : 'none'
                }}
              >
                <span className="mr-2">{personality.theme.icon}</span>
                {personality.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Selected personality description */}
        <div className="text-center max-w-2xl">
          <p className="text-white/60 text-sm md:text-base italic">
            {currentPersonality.description}
          </p>
        </div>

        {/* 4. Question input bar */}
        <div className="w-full max-w-2xl space-y-3">
          <div className="relative">
            <input
              ref={questionRef}
              type="text"
              placeholder="Ask a yes or no question..."
              maxLength={QUESTION_MAX_LENGTH}
              onKeyDown={handleKeyDown}
              onChange={changeQuestion}
              disabled={isDisabled}
              className={`
                w-full px-6 py-4 text-lg md:text-xl rounded-2xl
                bg-black/30 backdrop-blur-sm border-2 border-white/20
                text-white placeholder-white/50
                focus:border-white/60 focus:ring-4 focus:ring-white/10 focus:outline-none
                transition-all duration-300
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              style={{
                boxShadow: `0 0 30px ${currentPersonality.theme.accentColor}20`
              }}
            />
            <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium ${charColor}`}>
              {charactersLeft}
            </span>
          </div>
          
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-200 rounded-full`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 5. Animated 8-ball in center */}
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative">
            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              className={`
                ${styles.eightBall} 
                ${ballCurrentState === "shaking" ? styles.shake : ''}
                relative group
              `}
              style={{
                filter: `drop-shadow(0 0 40px ${currentPersonality.theme.accentColor}40)`,
                height: 'min(50vw, 50vh, 400px)'
              }}
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

              {ballCurrentState === "shaking" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"
                    style={{ borderTopColor: currentPersonality.theme.accentColor }}
                  />
                </div>
              )}
            </button>
          </div>

          {/* Shake button when not shaking */}
          {ballCurrentState !== "shaking" && (
            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              className={`
                px-8 py-3 rounded-2xl font-bold text-lg
                bg-gradient-to-r from-purple-500 to-pink-500
                hover:from-purple-600 hover:to-pink-600
                text-white shadow-lg hover:shadow-xl
                transition-all duration-300 hover:scale-105
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <FontAwesomeIcon icon={faRefresh} className="mr-2" />
              {hasResponse ? "Ask Again" : "Shake the Ball"}
            </button>
          )}
        </div>

        {/* 7. Action buttons */}
        <div 
          className="flex flex-wrap items-center justify-center gap-4 transition-all duration-500"
          style={{
            opacity: hasResponse ? 1 : 0,
            transform: hasResponse ? "translateY(0)" : "translateY(20px)",
            pointerEvents: hasResponse ? "auto" : "none"
          }}
        >
          <button
            onClick={copyText}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-2xl font-medium
              transition-all duration-300 hover:scale-105
              ${copyIndicated
                ? 'bg-green-500/40 text-green-300 border-2 border-green-500/50'
                : 'bg-yellow-400/40 hover:bg-yellow-400/50 text-white border-2 border-yellow-400/50'
              }
            `}
          >
            <FontAwesomeIcon icon={copyIndicated ? faCheck : faCopy} />
            <span className="hidden sm:inline">
              {copyIndicated ? "Copied!" : "Copy"}
            </span>
          </button>

          <a
            href={hasResponse ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(currentResponse))}` : "#"}
            target={hasResponse ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`
              flex items-center gap-2 px-6 py-3 rounded-2xl font-medium
              transition-all duration-300 hover:scale-105
              bg-blue-500/40 hover:bg-blue-500/50 text-white border-2 border-blue-500/50
            `}
          >
            <FontAwesomeIcon icon={faXTwitter} />
            <span className="hidden sm:inline">Tweet</span>
          </a>

          <a
            href={hasResponse ? `/api/image/share-result?question=${currentResponse.question}&response=${currentResponse.response}&personality=${currentResponse.personality}&sig=${currentResponse.shareSig}` : "#"}
            download={`${currentResponse.question}.jpg`}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-2xl font-medium
              transition-all duration-300 hover:scale-105
              bg-red-500/40 hover:bg-red-500/50 text-white border-2 border-red-500/50
            `}
          >
            <FontAwesomeIcon icon={faCamera} />
            <span className="hidden sm:inline">Save</span>
          </a>
        </div>

        {/* 8. Disclaimer at the bottom */}
        <div className="text-center max-w-2xl mt-8">
          <p className="text-white/40 text-xs md:text-sm">
            The responses are AI-generated for entertainment purposes only. Don't take them seriously or use them for important life decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

/** 
 * Main content with provider
 * @param personalityData - Personality configuration for the eight ball
 * @returns JSX element of the main content wrapped with the provider
 */
export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  return (
    <EightBallProvider personalityData={personalityData}>
      <UnifiedEightBallContent />
    </EightBallProvider>
  );
}