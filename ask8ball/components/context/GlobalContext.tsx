"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

const GlobalContext = createContext<any>({});

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [allAnswers, setAllAnswers] = useState([
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'You may rely on it',
    'As I see it yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
    'Reply hazy try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    'Don\'t count on it',
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful'
  ]);

  const [isShaking, setIsShaking] = useState(false);
  const [question, setQuestion] = useState("[No question]");
  const [shownResult, setShownResult] = useState(false);
  const [answer, setAnswer] = useState("[No answer]");
  const [diceSize, setDiceSize] = useState({ width: 0, height: 0 });
  
  return (
    <GlobalContext.Provider value={{ allAnswers, setAllAnswers, isShaking, setIsShaking, question, setQuestion, answer, setAnswer, shownResult, setShownResult, diceSize, setDiceSize }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);