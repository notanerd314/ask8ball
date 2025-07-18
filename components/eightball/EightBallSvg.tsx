"use client"

import { BallStateType, DiceSize } from "../../lib/types/eightball";
import useDiceSize from "./hooks/useDiceSize";

type Props = {
  currentState: BallStateType;
  diceColor: string;
  diceStyle?: React.CSSProperties;
  setDiceSize: (size: DiceSize) => void;
};

/** 
 * SVG component for eight ball visual representation
 * @param currentState - Current state of the eight ball
 * @param diceColor - Color for the dice/answer area
 * @param diceStyle - CSS styles for the dice element
 * @param setDiceSize - Function to update dice size measurements
 * @returns JSX element with eight ball SVG
 */
export const EightBallSvg: React.FC<Props> = ({
  currentState,
  diceColor,
  diceStyle,
  setDiceSize
}) => {
  const diceRef = useDiceSize(setDiceSize);

  const canShowDefault = currentState === "normal" || currentState === "shaking";
  const canShowResult = currentState === "result";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="348 234 440 440"
      className="absolute"
      width="100%"
      height="100%"
    >
      <defs>
        <linearGradient id="innerDiceBackgroundGrad" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#282828" />
          <stop offset="50%" stopColor="#0F0F0F" />
        </linearGradient>

        <linearGradient id="borderGrad" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="35%" stopColor="#282828" />
        </linearGradient>

        <linearGradient id="innerBackgroundGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#DBDBDB" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>

        <radialGradient id="bgGrad" cx="10%" cy="10%" r="70%">
          <stop offset="0%" stopColor="rgb(59, 59, 59)" />
          <stop offset="50%" stopColor="rgba(0, 0, 0, 1)" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
      </defs>

      <ellipse cx="568" cy="454" fill="url(#bgGrad)" rx="220" ry="220" />

      <g transform="translate(568,454) scale(1.25) translate(-568,-454)">
        <ellipse
          cx="568"
          cy="454"
          fill={canShowResult ? "url(#borderGrad)" : "white"}
          rx="115"
          ry="113"
        />
        <path
          fill={canShowDefault ? "url(#innerBackgroundGrad)" : "url(#innerDiceBackgroundGrad)"}
          stroke="transparent"
          strokeMiterlimit="10"
          d="M678 454.4c1.4-58.6-48.9-107-109.8-105.5-61-1.4-111.2 47-109.7 105.5-1.5 58.5 48.8 106.9 109.7 105.5 61 1.4 111.2-46.7 109.7-105.5z"
        />
        <path
          fill={canShowResult ? diceColor : "none"}
          style={diceStyle}
          ref={diceRef}
          stroke="transparent"
          d="M481.3 402.7c-3.1-5.7.3-10.4 8.2-10.7 50.6-1.6 107.6-1.6 157.4.3 7.6.2 11 5.2 7.9 10.6a2332.4 2332.4 0 0 1-80 131.1c-3.6 5.7-9.6 5.7-13.3 0a2645.3 2645.3 0 0 1-80.1-131.3z"
        />
        <ellipse
          cx="570"
          cy="425.4"
          fill="none"
          stroke="#141919"
          strokeWidth="20"
          rx="30"
          ry="30"
          opacity={canShowDefault ? "1" : "0"}
        />
        <ellipse
          cx="570"
          cy="485.4"
          fill="none"
          stroke="#141919"
          strokeWidth="20"
          rx="30"
          ry="30"
          opacity={canShowDefault ? "1" : "0"}
        />
      </g>

    </svg>
  );
};

export default EightBallSvg;