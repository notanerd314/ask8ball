"use client";

import { useState, useEffect, useRef } from 'react';

type EightBallTextProps = {
  children: React.ReactNode;
  maxWidth: number;       // in vw units
  maxHeight: number;      // in vh units
  minFontSize: number;
  initialFontSize: number;
  extraStyle?: React.CSSProperties;
  className?: string;
} & React.HTMLProps<HTMLParagraphElement>;

/** 
 * Text component that automatically resizes font to fit within specified dimensions
 * @param children - Text content to display
 * @param maxWidth - Maximum width in pixels
 * @param maxHeight - Maximum height in pixels
 * @param minFontSize - Minimum allowed font size
 * @param initialFontSize - Starting font size
 * @param extraStyle - Additional CSS styles
 * @param className - CSS class names
 * @returns JSX element with auto-resizing text
 */
const EightBallText = ({
  children,
  maxWidth,       // in vw units
  maxHeight,      // in vh units
  minFontSize,
  initialFontSize,
  extraStyle,
  className
}: EightBallTextProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState(initialFontSize);

  useEffect(() => {
    if (!textRef.current) return;

    let currentFontSize = initialFontSize;
    textRef.current.style.fontSize = currentFontSize + 'px';

    while (textRef.current.scrollHeight > maxHeight && currentFontSize > minFontSize) {
      currentFontSize -= 1;
      textRef.current.style.fontSize = currentFontSize + 'px';
    }

    setFontSize(currentFontSize);
  }, [children, maxWidth, maxHeight, minFontSize, initialFontSize]);

  // Render nothing until sizes are known (optional)

  return (
    <p
      ref={textRef}
      className={"text-wrap pointer-events-none " + className}
      style={{
        fontSize: fontSize + 'px',
        maxWidth: maxWidth + 'px',
        ...extraStyle
      }}
    >
      {children}
    </p>
  );
};

export default EightBallText;
