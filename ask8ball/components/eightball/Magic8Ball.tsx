"use client";

import React, { useState, useEffect, useRef } from 'react'
import { useGlobal } from '../context/GlobalContext';
import ResizableText from '../base/ResizeableText';
import EightBallSvg from './EightBallSvg';
import styles from '../../styles/Magic8Ball.module.css'
import textStyles from '../../styles/EightBallText.module.css'

import { getRandomItem } from '../../extensions/random';

import { toast } from 'react-toastify';

function Magic8Ball() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shakeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const questionRef = useRef<HTMLInputElement>(null);

  const {
    allAnswers,
    answer,
    setAnswer,
    isShaking,
    setIsShaking,
    shownResult,
    setShownResult,
    diceSize,
    setQuestion,
  } = useGlobal();

  const [eightBallDiceStyle, setEightBallDiceStyle] = useState({ opacity: "0", transition: "none" });

  useEffect(() => {
    audioRef.current = new Audio('/sounds/shaking.mp3');

    const shakeTimeout = shakeTimeoutRef.current;
    const fadeInTimeout = fadeInTimeoutRef.current;
    return () => {
      if (shakeTimeout) clearTimeout(shakeTimeout);
      if (fadeInTimeout) clearTimeout(fadeInTimeout);
    };
  }, [])

  const shakeEightBall = () => {
    if (!isShaking) {
      if (allAnswers.length < 1) {
        toast.error(
          "No responses are provided",
          {toastId: "no-responses"}
        );
        return
      }

      console.log("Shook eight ball like your balls");
      audioRef!.current!.play();
      setIsShaking(true);
      setShownResult(false);
      setAnswer(getRandomItem(allAnswers));
      setEightBallDiceStyle({ opacity: "0", transition: "none" });

      if (questionRef.current?.value.replace(" ", "")) {
        setQuestion(questionRef.current.value);
      } else {
        setQuestion("[No question]")
      }

      setTimeout(() => {
        setIsShaking(false);
        setShownResult(true);
        setTimeout(() => {
          setEightBallDiceStyle({ transition: "opacity 0.75s ease", opacity: "1" });
          console.log("Shown result")
        }, 500)
      }, 2000);
    }
  }

  return (
    <>
      <div className={styles.eightBallWrapper}>
        <button
          id="eightBallWrapper"
          onClick={shakeEightBall}
          className={`${styles.eightBall} ${isShaking ? styles.shake : ''}`}
        >
          <EightBallSvg isShaking={shownResult} diceStyle={eightBallDiceStyle} />
          <ResizableText
            minFontSize={10}
            initialFontSize={30}
            maxWidth={diceSize.width}
            maxHeight={diceSize.height}
            extraStyle={eightBallDiceStyle}
            className={textStyles.eightBallText}
          >
            {answer}
          </ResizableText>
        </button>
      </div>
    </>
  )
}

export default Magic8Ball

