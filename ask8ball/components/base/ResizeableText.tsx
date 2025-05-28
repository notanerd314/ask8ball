"use client";

import { useState, useEffect, useRef } from 'react';

type ResizableTextProps = {
  children: React.ReactNode;
  maxWidth: number;       // in vw units
  maxHeight: number;      // in vh units
  minFontSize: number;
  initialFontSize: number;
  extraStyle?: React.CSSProperties;
  className?: string;
} & React.HTMLProps<HTMLParagraphElement>;

const ResizableText = ({
  children,
  maxWidth,       // in vw units
  maxHeight,      // in vh units
  minFontSize,
  initialFontSize,
  extraStyle,
  className
}: ResizableTextProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState(initialFontSize);

  useEffect(() => {
    if (!textRef.current) return;

    console.log(maxWidth, maxHeight)

    let currentFontSize = initialFontSize;
    textRef.current.style.fontSize = currentFontSize + 'px';

    while (textRef.current.scrollHeight > maxHeight && currentFontSize > minFontSize) {
      currentFontSize -= 1;
      textRef.current.style.fontSize = currentFontSize + 'px';
    }

    while (textRef.current.scrollWidth > maxWidth && currentFontSize > minFontSize) {
      currentFontSize -= 1;
      textRef.current.style.fontSize = currentFontSize + 'px';
    }

    setFontSize(currentFontSize);
  }, [children, maxWidth, maxHeight, minFontSize, initialFontSize]);

  // Render nothing until sizes are known (optional)

  return (
    <p
      ref={textRef}
      style={{
        fontSize: fontSize + 'px',
        margin: 0,
        maxWidth: maxWidth + 'px',
        overflow: 'hidden',
        ...extraStyle
      }}
      className={className}
    >
      {children}
    </p>
  );
};

export default ResizableText;
