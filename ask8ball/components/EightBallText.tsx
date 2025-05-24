
import { useEffect, useRef, useState } from 'react';
import styles from "../styles/EightBallText.module.css"

type ShrinkProps = {
  children: React.ReactNode;
  maxWidth: number;
  maxHeight: number;
  minFontSize: number;
  initialFontSize: number;
  eightBallDiceStyle: { opacity: string; transition: string };
};

const EightBallText = ({ children, maxWidth, maxHeight, minFontSize, initialFontSize, eightBallDiceStyle }: ShrinkProps) => {
  const containerRef = useRef(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState(initialFontSize);

  useEffect(() => {
    if (!textRef.current) return;

    let currentFontSize = initialFontSize;

    // Reset font size before measuring
    textRef.current.style.fontSize = currentFontSize + 'px';

    // Shrink font size until fits or hits minFontSize
    while (textRef.current.scrollHeight > maxHeight && currentFontSize > minFontSize) {
      currentFontSize -= 1;
      textRef.current.style.fontSize = currentFontSize + 'px';
    }

    setFontSize(currentFontSize);
  }, [children, maxHeight, minFontSize, initialFontSize]);

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: maxHeight + 'px',
        overflow: 'hidden',
      }}
      className="text-container"
    >
      <p className={styles.eightBallText} ref={textRef} style={{ fontSize: fontSize + 'px', margin: 0, maxWidth: maxWidth, ...eightBallDiceStyle }}>
        {children}
      </p>
    </div>
  );
};

export default EightBallText;
