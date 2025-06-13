"use client";

import React, { useState, useEffect, useRef } from 'react'
import { useGlobal } from '../context/GlobalContext';
import ResizableText from '../common/ResizeableText';
import EightBallSvg from './EightBallSvg';
import styles from '../../styles/Magic8Ball.module.css'
import textStyles from '../../styles/EightBallText.module.css'

import { getRandomItem, getRandomInt } from '../../lib/rng';
import { EightBallThoughts } from '../../lib/thoughts';

import { ReplyIcon } from '../utils/FontAwesome';

import { toast } from 'react-toastify';

function TapToShake({ shakeCount }: { shakeCount: number }) {
  return (
    <>
      {shakeCount === 0 && <p className='p-3 px-6 text-3xl font-bold text-center text-white bg-indigo-500 rounded-md wiggle'>Tap me to shake!</p>}
    </>
  );
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
    allAnswers,
    answer,
    setAnswer,
    ballCurrentState,
    setBallCurrentState,
    diceSize,
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
  const shakeEightBall = () => {
    setShakeCount(shakeCount + 1);
    setEightBallDiceStyle({ opacity: "0", transition: "none" });

    if (allAnswers.length < 1) {
      // If there are no responses, show an error message
      setBallCurrentState("error");
      errorRef.current?.play();
      setEightBallDiceStyle({ opacity: "1", transition: "none" });
      toast.error(
        "How am I supposed to work if I have no answers to choose from?",
        { toastId: "no-responses", autoClose: 4500 }
      );
      return;
    }

    console.log("Shook eight ball like your balls");
    // Play the shaking sound
    shakeSoundRef.current?.play();
    // Set the state of the 8 ball to "shaking"
    setBallCurrentState("shaking");
    // Generate a random answer from the list of responses
    setAnswer(getRandomItem(allAnswers));
    // Set the question to the value of the input field
    setQuestion(questionRef.current?.value || "No question");

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
          disabled={ballCurrentState === "shaking"}
        >
          {/* The 8 ball SVG */}
          <EightBallSvg currentState={ballCurrentState} diceStyle={eightBallDiceStyle} />
          {/* The text inside the 8 ball */}
          <ResizableText
            minFontSize={10}
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
        <div className='flex flex-row gap-1'>
          <input className='!text-[1.5rem] w-[70vw] lg:w-[30rem]' ref={questionRef} type='text' placeholder='Ask a question...' disabled={ballCurrentState === "shaking"}></input>
          <button className='!text-2xl buttonBlue' disabled={ballCurrentState === "shaking"} onClick={shakeEightBall}>
            <ReplyIcon />
          </button>
        </div>
        <button className='buttonGreen'>Share this result!</button>
      </div>
    </>
  )
}

export default Magic8Ball


