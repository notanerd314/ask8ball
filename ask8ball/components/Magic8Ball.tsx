"use client";

import React, { useState, useEffect, useRef } from 'react'
import { getRandomArrayElement } from '../reuse'
import { useGlobal } from './GlobalContext';
import { CloseIcon, ReplyIcon } from './FontAwesome';
import EightBallText from './EightBallText';
import EightBallSvg from './EightBallSvg';
import styles from '../styles/Magic8Ball.module.css'

function Magic8Ball() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shakeTimeoutRef = useRef(null);
  const fadeInTimeoutRef = useRef(null);
  const questionRef = useRef<HTMLInputElement>(null);

  const { allAnswers, answer, setAnswer, isShaking, setIsShaking, shownResult, setShownResult } = useGlobal();

  const { setQuestion } = useGlobal();
  const [eightBallDiceStyle, setEightBallDiceStyle] = useState({ opacity: "0", transition: "none" });

  useEffect(() => {
    audioRef.current = new Audio('/sounds/shaking.mp3');
    return () => {
      clearTimeout(shakeTimeoutRef.current ?? undefined);
      clearTimeout(fadeInTimeoutRef.current ?? undefined);
    };
  }, [])

  const shakeEightBall = () => {
    if (!isShaking) {
      if (allAnswers.length < 1) {
        alert("No responses are provided, how am I supposed to answer your questions??????")
        return
      }

      console.log("Shook eight ball like your balls");
      audioRef!.current!.play();
      setIsShaking(true);
      setShownResult(false);
      setAnswer(getRandomArrayElement(allAnswers));
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

  const resetQuestion = () => {
    if (questionRef.current) {
      questionRef.current.value = "";
    }
  }

  return (
    <>
      <div
        id="eightBallWrapper"
        onClick={shakeEightBall}
        className={`${styles.eightBall} ${isShaking ? styles.shake : ''}`}
      >
        <EightBallSvg isShaking={shownResult} diceStyle={eightBallDiceStyle} />
        <EightBallText maxWidth={10} maxHeight={10} minFontSize={10} initialFontSize={30} eightBallDiceStyle={eightBallDiceStyle}>{answer}</EightBallText>
      </div>

      <div className={styles.askQuestion}>
        <div className={styles.askQuestionInput}>
          <input
            type='text'
            ref={questionRef}
            placeholder='Ask a question...'
            disabled={isShaking}
            onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => {
              if (evt.key === "Enter") {
                evt.preventDefault();
                shakeEightBall();
              }
            }}
          />
          <button type="reset" disabled={isShaking} onClick={resetQuestion} title='Reset question'>
            <CloseIcon />
          </button>
        </div>
        <button type="button" className={`${styles.askQuestionButton} buttonBlue`} disabled={isShaking} onClick={shakeEightBall} title="Shake it!">
          <ReplyIcon />
        </button>
      </div>
    </>
  )
}

export default Magic8Ball

