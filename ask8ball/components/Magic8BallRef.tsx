"use client";

import { createContext, useContext, useRef } from 'react';

const RefContext = createContext<React.RefObject<any> | null>(null);

export const Magic8BallRef = ({ children }: { children: React.ReactNode }) => {
  const globalRef = useRef(null);

  return (
    <RefContext.Provider value={globalRef}>
      {children}
    </RefContext.Provider>
  );
};

export const useMagic8BallRef = () => {
  const ctx = useContext(RefContext);
  if (!ctx) throw new Error("useGlobalRef must be used inside a RefProvider");
  return ctx;
};
