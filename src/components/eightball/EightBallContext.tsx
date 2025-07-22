import { PersonalityConfig } from '@/helpers/types';
import { sarcasticPersonality } from '@/personalities';
import { createContext, useContext, useState, ReactNode } from 'react';

interface EightBallContextType {
  currentPersonality: PersonalityConfig;
  setCurrentPersonality: (personality: PersonalityConfig) => void;
}

interface EightBallProviderProps {
  children: ReactNode;
  personality: PersonalityConfig;
}

const EightBallContext = createContext<EightBallContextType | undefined>(undefined);

export const EightBallProvider = ({ children, personality }: EightBallProviderProps) => {
  const [currentPersonality, setCurrentPersonality] = useState<PersonalityConfig>(personality);

  return (
    <EightBallContext.Provider value={{ currentPersonality, setCurrentPersonality }}>
      {children}
    </EightBallContext.Provider>
  );
};


export const useEightBall = (): EightBallContextType => {
  const context = useContext(EightBallContext);
  if (!context) throw new Error('useEightBall must be used within an EightBallProvider');
  return context;
};