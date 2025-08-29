"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const PaintDryContext = createContext({
  isPaintDry: false,
  setIsPaintDry: (value: boolean) => { },
  dryProgress: 0,
  setDryProgress: (value: number) => { },
});

export const PaintDryProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPaintDry, setIsPaintDry] = useState(false);
  const [dryProgress, setDryProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDryProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsPaintDry(false);
          return p;
        }
        return p + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);


  return (
    <PaintDryContext.Provider value={{ isPaintDry, setIsPaintDry, dryProgress, setDryProgress }}>
      {children}
    </PaintDryContext.Provider>
  );
}

export const usePaintDry = () => useContext(PaintDryContext);