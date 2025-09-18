"use client";

import { EightBallState } from "../../utils/eightball/types";
import useDiceSize from "./hooks/useDiceSize";

type Props = {
  currentState: EightBallState;
  diceColor: string;
  diceStyle: React.CSSProperties;
  setDiceSize: (size: { width: number; height: number }) => void;
};

/**
 * SVG component for eight ball visual representation
 */
export const EightBallSVG: React.FC<Props> = ({
  currentState,
  diceColor,
  diceStyle,
  setDiceSize,
}) => {
  const diceRef = useDiceSize(setDiceSize);

  const canShowDefault =
    currentState === EightBallState.Idle ||
    currentState === EightBallState.Shaking;
  const canShowResult = currentState === EightBallState.Result;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="348 234 440 440"
      className="absolute"
      width="100%"
      height="100%"
    >
      <defs>
        {/* Background: subtle accent-tinted glow */}
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={diceColor} />
          <stop offset="50%" stopColor="#1e1e2f" />
          <stop offset="100%" stopColor="#0d0d1a" />
        </radialGradient>

        {/* Border: soft accent blend to dark */}
        <linearGradient id="borderGrad" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1a1a28" />  {/* muted midnight blue */}
          <stop offset="35%" stopColor="#12121c" /> {/* soft shadow depth */}
        </linearGradient>

        {/* Idle background: deep with accent tint */}
        <linearGradient
          id="innerDiceBackgroundGrad"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#0a0a10" />      {/* deeper black */}
          <stop offset="100%" stopColor="#040409" />    {/* basically void */}
        </linearGradient>


        {/* Result background: glow with accent */}
        <linearGradient
          id="innerBackgroundGrad"
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="100%" stopColor="#f3e7ff" />
        </linearGradient>
      </defs>

      {/* Outer 8-ball sphere */}
      <ellipse cx="568" cy="454" fill="url(#bgGrad)" rx="220" ry="220" />

      <g transform="translate(568,454) scale(1.4) translate(-568,-454)">
        {/* Border ring */}
        <ellipse
          cx="568"
          cy="454"
          fill={canShowResult ? "url(#borderGrad)" : "#fefbff"}
          rx="115"
          ry="113"
        />

        {/* Dice background */}
        <path
          fill={
            canShowDefault
              ? "url(#innerBackgroundGrad)"
              : "url(#innerDiceBackgroundGrad)"
          }
          stroke="transparent"
          strokeMiterlimit="10"
          d="M678 454.4c1.4-58.6-48.9-107-109.8-105.5-61-1.4-111.2 47-109.7 105.5-1.5 58.5 48.8 106.9 109.7 105.5 61 1.4 111.2-46.7 109.7-105.5z"
        />

        {/* Dice / answer area */}
        <path
          fill={canShowResult ? diceColor : "none"}
          style={diceStyle}
          ref={diceRef}
          stroke="transparent"
          d="M481.3 402.7c-3.1-5.7.3-10.4 8.2-10.7 50.6-1.6 107.6-1.6 157.4.3 7.6.2 11 5.2 7.9 10.6a2332.4 2332.4 0 0 1-80 131.1c-3.6 5.7-9.6 5.7-13.3 0a2645.3 2645.3 0 0 1-80.1-131.3z"
        />

        {/* Optional rings */}
        <ellipse
          cx="570"
          cy="425.4"
          fill="none"
          stroke={diceColor}
          strokeWidth="20"
          rx="30"
          ry="30"
          opacity={canShowDefault ? "1" : "0"}
        />
        <ellipse
          cx="570"
          cy="485.4"
          fill="none"
          stroke={diceColor}
          strokeWidth="20"
          rx="30"
          ry="30"
          opacity={canShowDefault ? "1" : "0"}
        />
      </g>
    </svg>
  );
};

export default EightBallSVG;
