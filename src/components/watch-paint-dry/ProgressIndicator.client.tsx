'use client';

import { usePaintDry } from "./PaintDryContext.client";

export default function ProgressIndicator() {
  const { roundedProgress } = usePaintDry();

  return (
    <p
      className="text-5xl z-50 italic rounded-2xl font-bold p-3 absolute bottom-2 left-2 text-black"
      style={{
        textShadow: `
          -2px -2px 0 white,
           2px -2px 0 white,
          -2px  2px 0 white,
           2px  2px 0 white
        `,
      }}
    >
      {roundedProgress}%
    </p>
  );
}
