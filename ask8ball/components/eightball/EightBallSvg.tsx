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
      width: rect.width - rect.width / 2.3,
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
        <radialGradient id="a" cx="65.1" cy="91" r="146.6" gradientTransform="matrix(6 0 0 5 149.7 -166.2)" gradientUnits="userSpaceOnUse">
          <stop offset="0" />
          <stop offset="1" />
        </radialGradient>
      </defs>
      <path fill="#fff" d="M375.3 370c-.7 0-1.2-.2-2-.4a4 4 0 0 1-1.9-5.8 224 224 0 0 1 87.3-92c2.2-1.1 5-.4 6.2 1.5 1.2 2.1.5 4.7-1.5 6a213.2 213.2 0 0 0-83.9 88.3 4.9 4.9 0 0 1-4.2 2.4zm106.8-101c-1.7 0-3.2-1-4-2.4-.9-2.1 0-4.8 2.3-5.7 20.5-9 42-15.3 64.4-18.1 2.4-.3 4.7 1.4 4.9 3.6a4.3 4.3 0 0 1-3.7 4.7 223.3 223.3 0 0 0-61.9 17.4c-.5.5-1.2.5-2 .5z" />
      <path fill="#141919" d="M682.4 454.4c1.7-61.2-50.6-111.4-114.2-109.8-63.6-1.6-116 48.6-114.2 109.8-1.7 61.1 50.6 111.4 114.2 109.7 63.6 2 116-48.6 114.2-109.7z" />
      <path fill={canShowDefault ? "#fff" : "none"} stroke="#141919" strokeMiterlimit="10" d="M678 454.4c1.4-58.6-48.9-107-109.8-105.5-61-1.4-111.2 47-109.7 105.5-1.5 58.5 48.8 106.9 109.7 105.5 61 1.4 111.2-46.7 109.7-105.5z" />
      <path fill="#262D2D" d="M568.2 331.8c-71.3-3.3-131 54-127.5 122.6-3.5 68.5 56.2 125.9 127.5 122.6 71.3 3.3 131-54.1 127.5-122.6 3.5-68.5-56.2-125.9-127.5-122.6zm0 237.8c-66.8 2.1-122-51-119.6-115-2.2-64.2 53-117.3 119.6-115 66.8-2 122 51 119.6 115 2.5 64-52.8 117.1-119.6 115z" />
      <path fill={canShowResult ? "#303084" : canShowError ? "#FF0000" : "none"} style={diceStyle} ref={diceRef} stroke="transparent" d="M481.3 402.7c-3.1-5.7.3-10.4 8.2-10.7 50.6-1.6 107.6-1.6 157.4.3 7.6.2 11 5.2 7.9 10.6a2332.4 2332.4 0 0 1-80 131.1c-3.6 5.7-9.6 5.7-13.3 0a2645.3 2645.3 0 0 1-80.1-131.3z" />

      <ellipse cx="570" cy="420.4" fill="#fff" stroke="#141919" strokeWidth="15" rx="36" ry="34.5" opacity={canShowDefault ? "1" : "0"} />
      <ellipse cx="570" cy="489.4" fill="#fff" stroke="#141919" strokeWidth="15" rx="36" ry="34.5" opacity={canShowDefault ? "1" : "0"} />
    </svg>
  )
}

export default EightBallSvg
