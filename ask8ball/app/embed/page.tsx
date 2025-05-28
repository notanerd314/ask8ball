"use client"

import '../../styles/globals.css'
import Magic8BallEmbed from '../../components/Magic8BallEmbed'
import { GlobalProvider } from '../../components/common/GlobalContext';

import { useEffect, useState } from 'react';

export default function Page() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [question, setQuestion] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setAnswer(urlParams.get('answer'));
    setQuestion(urlParams.get('question'));
  }, []);

  return (
    <>
      <GlobalProvider>
        <Magic8BallEmbed
          answer={answer ? answer : '[No answer defined]'}
          question={question ? question : '[No question defined]'}
        />
      </GlobalProvider>
    </>
  );
}

