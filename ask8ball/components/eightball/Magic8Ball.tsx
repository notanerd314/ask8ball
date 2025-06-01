"use client";

import React, { useState, useEffect, useRef } from 'react'
import { getRandomArrayElement } from '../../reuse'
import { useGlobal } from '../common/GlobalContext';
import { CloseIcon, ReplyIcon } from '../common/FontAwesome';
import ResizableText from '../base/ResizeableText';
import EightBallSvg from './EightBallSvg';
import styles from '../../styles/Magic8Ball.module.css'
import textStyles from '../../styles/EightBallText.module.css'

function Magic8Ball() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shakeTimeoutRef = useRef(null);
  const fadeInTimeoutRef = useRef(null);
  const questionRef = useRef<HTMLInputElement>(null);

  const { allAnswers, answer, setAnswer, isShaking, setIsShaking, shownResult, setShownResult, diceSize } = useGlobal();

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

  return (
    <>
      <div className={styles.eightBallWrapper}>
        <div
          id="eightBallWrapper"
          onClick={shakeEightBall}
          className={`${styles.eightBall} ${isShaking ? styles.shake : ''}`}
        >
          <EightBallSvg isShaking={shownResult} diceStyle={eightBallDiceStyle} />
          <ResizableText
            minFontSize={1}
            initialFontSize={30}
            maxWidth={diceSize.width}
            maxHeight={diceSize.height}
            extraStyle={eightBallDiceStyle}
            className={textStyles.eightBallText}
          >
            {answer}
          </ResizableText>
        </div>
      </div>
    </>
  )
}

export default Magic8Ball

