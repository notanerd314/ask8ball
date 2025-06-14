"use client";

import React, { useState, useEffect, useRef } from 'react'
import { useGlobal } from '../context/GlobalContext';
import ResizableText from '../common/ResizeableText';
import EightBallSvg from './EightBallSvg';
import styles from '../../styles/Magic8Ball.module.css'
import textStyles from '../../styles/EightBallText.module.css'

import { getRandomItem, getRandomInt } from '../../lib/rng';
import { EightBallThoughts } from '../../lib/thoughts';

import { CloseIcon } from '../utils/FontAwesome';

async function getAnswer(question: string) {
  const res = await fetch("/api/ask-ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: question }),
  });


  const data = await res.json();
  console.log(data);
  return data.response;
}

function TapToShake({ shakeCount }: { shakeCount: number }) {
  return <p className='p-3 px-6 text-3xl font-bold text-center text-white bg-indigo-500 rounded-md wiggle' hidden={shakeCount > 0}>Click me to reveal your destiny.</p>
}

/**
 * The main final boss
 * 
 * A clickable 8 ball with a question and an answer.
 * When clicked, the ball shakes and a random answer is selected.
 * I hate this component specifcally.
 * 
 * @returns [JSX.Element, existentalCrisis]
 */
function Magic8Ball() {
  // References to the audio element and the input field
  const shakeSoundRef = useRef<HTMLAudioElement | null>(null);
  const errorRef = useRef<HTMLAudioElement | null>(null);

  const shakeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const thoughtsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const questionRef = useRef<HTMLInputElement>(null);

  // The current state of the 8 ball
  const {
    answer,
    setAnswer,
    ballCurrentState,
    setBallCurrentState,
    diceSize,
    question,
    setQuestion,
  } = useGlobal();

  // The style of the 8 ball
  const [eightBallDiceStyle, setEightBallDiceStyle] = useState({ opacity: "0", transition: "none" });
  const [shakeCount, setShakeCount] = useState(0);

  useEffect(() => {
    // Create audio elements
    shakeSoundRef.current = new Audio('/sounds/shaking.mp3');
    errorRef.current = new Audio('/sounds/error.mp3');

    // Clean up the timeouts when the component is unmounted
    const shakeTimeout = shakeTimeoutRef.current;
    const fadeInTimeout = fadeInTimeoutRef.current;
    return () => {
      if (shakeTimeout) clearTimeout(shakeTimeout);
      if (fadeInTimeout) clearTimeout(fadeInTimeout);
    };
  }, [])

  useEffect(() => {
    const thoughtsLoop = () => {
      thoughtsTimeoutRef.current = setTimeout(() => {
        console.log(getRandomItem(EightBallThoughts));
        thoughtsLoop(); // loop again
      }, getRandomInt(10000, 17000));
    };

    thoughtsLoop();

    return () => {
      if (thoughtsTimeoutRef.current) clearTimeout(thoughtsTimeoutRef.current);
    };
  }, [shakeCount]);

  /**
   * Function to shake the fucking eight ball.
   * If the ball is already shaking or there are no responses, you're fucked.
   * 
   * @returns void
   */
  const shakeEightBall = async () => {
    const currentQuestion = questionRef.current?.value || "[No question]";

    setQuestion(currentQuestion);
    setEightBallDiceStyle({ opacity: "0", transition: "none" });
    setBallCurrentState("shaking");

    setAnswer(await getAnswer(currentQuestion));

    setShakeCount(shakeCount + 1);
    shakeSoundRef.current?.play();

    // After 2 seconds, set the state of the 8 ball to "result"
    setTimeout(() => {
      setBallCurrentState("result");
      // After another 500ms, set the style of the 8 ball to "opacity: 1"
      setTimeout(() => {
        setEightBallDiceStyle({ transition: "opacity 0.75s ease", opacity: "1" });
        console.log("Shown result")
      }, 500)
    }, 2000);
  }

  const deleteAnswer = () => {
    if (questionRef.current) {
      questionRef.current.value = "";
    }

    setAnswer("");
  }

  const checkKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      shakeEightBall();
    } else if (e.key === 'Delete') {
      deleteAnswer();
    }
  }

  return (
    <>
      {/* The 8 ball wrapper */}
      <div className={styles.eightBallWrapper}>
        <TapToShake shakeCount={shakeCount} />

        {/* The 8 ball button */}
        <button
          id="eightBallWrapper"
          onClick={shakeEightBall}
          className={`${styles.eightBall} ${ballCurrentState === "shaking" ? styles.shake : ''}`}
          title='Click me to reveal your destiny.'
          disabled={ballCurrentState === "shaking"}
        >
          {/* The 8 ball SVG */}
          <EightBallSvg currentState={ballCurrentState} diceStyle={eightBallDiceStyle} />
          {/* The text inside the 8 ball */}
          <ResizableText
            minFontSize={18}
            initialFontSize={40}
            maxWidth={diceSize.width}
            maxHeight={diceSize.height}
            extraStyle={eightBallDiceStyle}
            className={textStyles.eightBallText}
          >
            {/* If the 8 ball is in an error state, show an error message, otherwise show the answer */}
            {ballCurrentState !== "error" ? answer : ">:("}
          </ResizableText>
        </button>

        <div className='flex flex-row gap-1 mt-2.5'>
          <input className='!text-[1.5rem] w-[70vw] lg:w-[30rem]' ref={questionRef} type='text' placeholder='Ask a question...' onKeyDown={(e) => checkKeys(e)} disabled={ballCurrentState === "shaking"}></input>
          <button className='!text-2xl buttonRed' disabled={ballCurrentState === "shaking"} onClick={deleteAnswer}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </>
  )
}

export default Magic8Ball


