import React from 'react';

interface ResponsiveBackgroundProps {
  className?: string;
}

export default function ResponsiveBackground({ className = "" }: ResponsiveBackgroundProps) {
  return (
    <picture className={className}>
      <source media="(min-width: 1200px)" srcSet="/images/backgrounds/PC.jpg" />
      <source media="(min-width: 768px)" srcSet="/images/backgrounds/iPad.jpg" />
      <img
        className="fixed object-cover w-screen h-screen pointer-events-none -z-1"
        src="/images/backgrounds/Phone.jpg"
        alt="Background"
      />
    </picture>
  );
}