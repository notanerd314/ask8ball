"use client"

import { useGlobal, BallStateType } from "../context/GlobalContext";
import { useRef, useEffect, useCallback, useState } from "react";

type Props = {
  currentState: BallStateType,
  diceStyle?: React.CSSProperties,
};

export const EightBallSvg: React.FC<Props> = ({ currentState, diceStyle }) => {
  const { setDiceSize } = useGlobal();
  const diceRef = useRef<SVGPathElement>(null);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  const updateSize = useCallback(() => {
    if (!diceRef.current) return;
    const rect = diceRef.current.getBoundingClientRect();
    setDiceSize({
      width: rect.width - rect.width / 2.5,
      height: rect.height - rect.height / 2.5,
    });
  }, [setDiceSize, diceRef]);

  const [canShowDefault, setCanShowDefault] = useState(currentState === "normal" || currentState === "shaking");
  const [canShowResult, setCanShowResult] = useState(currentState === "result");
  const [canShowError, setCanShowError] = useState(currentState === "error");

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        updateSize();
      }, 100); // 100ms debounce
    };

    window.addEventListener('resize', handleResize);
    updateSize(); // initial call

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
    };
  }, [updateSize]);

  useEffect(() => {
    setCanShowDefault(currentState === "normal" || currentState === "shaking");
    setCanShowResult(currentState === "result");
    setCanShowError(currentState === "error");
  }, [currentState]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="348 234 440 440"
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
      </defs>

      <ellipse cx="568" cy="454" fill={canShowResult ? "url(#borderGrad)" : "white"} rx="115" ry="113" />
      <path fill={canShowDefault ? "url(#innerBackgroundGrad)" : "url(#innerDiceBackgroundGrad)"} stroke="transparent" strokeMiterlimit="10" d="M678 454.4c1.4-58.6-48.9-107-109.8-105.5-61-1.4-111.2 47-109.7 105.5-1.5 58.5 48.8 106.9 109.7 105.5 61 1.4 111.2-46.7 109.7-105.5z" />
      <path fill={canShowResult ? "#303084" : canShowError ? "#fff" : "none"} style={diceStyle} ref={diceRef} stroke="transparent" d="M481.3 402.7c-3.1-5.7.3-10.4 8.2-10.7 50.6-1.6 107.6-1.6 157.4.3 7.6.2 11 5.2 7.9 10.6a2332.4 2332.4 0 0 1-80 131.1c-3.6 5.7-9.6 5.7-13.3 0a2645.3 2645.3 0 0 1-80.1-131.3z" />

      <ellipse cx="570" cy="425.4" fill="none" stroke="#141919" strokeWidth="20" rx="30" ry="30" opacity={canShowDefault ? "1" : "0"} />
      <ellipse cx="570" cy="485.4" fill="none" stroke="#141919" strokeWidth="20" rx="30" ry="30" opacity={canShowDefault ? "1" : "0"} />
    </svg>
  )
}

export default EightBallSvg
