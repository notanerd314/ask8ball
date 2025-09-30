import { useLocalStorage } from "@notanerd/hooks";
import React, { createContext, useContext, useState, useCallback } from "react";

type VolumeContextType = {
  volume: number | undefined;
  setVolume: (value: number) => void;
};

const VolumeContext = createContext<VolumeContextType>({
  volume: 1,
  setVolume: () => {},
});

export const VolumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [volume, setVolumeState] = useLocalStorage("volume", 1);

  const setVolume = useCallback((value: number) => {
    setVolumeState(value);
  }, []);

  return (
    <VolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};

export const useVolume = () => useContext(VolumeContext);
