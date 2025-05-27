"use client";

import { useState, useEffect, useRef } from 'react';
import styles from '../styles/EightBallText.module.css';

type ShrinkProps = {
  children: React.ReactNode;
  maxWidth: number;
  maxHeight: number;
  minFontSize: number;
  initialFontSize: number;
  eightBallDiceStyle?: { opacity: string; transition: string };
};

const EightBallText = ({
  children,
  maxWidth,       // in vw units
  maxHeight,      // in vh units
  minFontSize,
  initialFontSize,
  eightBallDiceStyle,
}: ShrinkProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const [maxWidthPx, setMaxWidthPx] = useState(0);
  const [maxHeightPx, setMaxHeightPx] = useState(0);
  const [fontSize, setFontSize] = useState(initialFontSize);

  useEffect(() => {
    function updateSizes() {
      // const multiplier = (window.innerWidth < 800 || window.innerHeight < 800) ? 2 : 1;
      const multiplier = 1;
      setMaxWidthPx(window.innerWidth * (maxWidth * multiplier / 100));
      setMaxHeightPx(window.innerHeight * (maxHeight * multiplier / 100));
    }

    updateSizes();

    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [maxWidth, maxHeight]);

  useEffect(() => {
    if (!textRef.current) return;

    let currentFontSize = initialFontSize;
    textRef.current.style.fontSize = currentFontSize + 'px';

    while (textRef.current.scrollHeight > maxHeightPx && currentFontSize > minFontSize) {
      currentFontSize -= 1;
      textRef.current.style.fontSize = currentFontSize + 'px';
    }

    setFontSize(currentFontSize);
  }, [children, maxHeightPx, minFontSize, initialFontSize]);

  // Render nothing until sizes are known (optional)
  if (maxWidthPx === 0 || maxHeightPx === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: maxHeightPx + 'px',
        overflow: 'hidden',
      }}
      className={styles.eightBallText}
    >
      <p
        ref={textRef}
        style={{
          fontSize: fontSize + 'px',
          margin: 0,
          maxWidth: maxWidthPx + 'px',
          ...eightBallDiceStyle,
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default EightBallText;
