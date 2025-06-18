"use client";

import React, { useState, useRef } from 'react';
import { useGlobal } from '../context/GlobalContext';
import ResizableText from '../common/ResizeableText';
import EightBallSvg from './EightBallSvg';
import Modal from '../common/Modal';

import styles from '../../styles/Magic8Ball.module.css';
import textStyles from '../../styles/EightBallText.module.css';

import { getRandomItem } from '../../lib/rng';
import { CloseIcon } from '../utils/FontAwesome';

import { shakeSounds, errorSound } from '../../lib/sounds';

import { useSound } from 'use-sound'

const getAnswer = async (question: string) => {
  const res = await fetch("/api/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const data = await res.json();
  console.log(data);
  return data;
};

const TapToShake = ({ shakeCount }: { shakeCount: number }) => (
  <p
    className='p-3 px-6 text-3xl font-bold text-center text-white bg-indigo-500 rounded-md wiggle'
    hidden={shakeCount > 0}
  >
    Click me to reveal your destiny.
  </p>
);

const QuestionInput = ({
  ballCurrentState,
  shakeEightBall,
}: {
  ballCurrentState: string;
  shakeEightBall: () => void;
}) => {
  const questionRef = useRef<HTMLInputElement>(null);
  const { setQuestion } = useGlobal();

  const deleteQuestion = () => {
    if (questionRef.current) questionRef.current.value = "";
    setQuestion("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") shakeEightBall();
    else if (e.key === "Delete") deleteQuestion();
  };

  return (
    <div className='flex flex-row gap-1 mt-2.5'>
      <input
        ref={questionRef}
        type='text'
        placeholder='Ask a question...'
        className='!text-[1.5rem] w-[70vw] lg:w-[30rem]'
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={ballCurrentState === "shaking"}
      />
      <button
        className='!text-2xl buttonRed'
        onClick={deleteQuestion}
        disabled={ballCurrentState === "shaking"}
        title='Clear question'
      >
        <CloseIcon />
      </button>
    </div>
  );
};

function Magic8Ball() {
  const {
    answer,
    setAnswer,
    ballCurrentState,
    setBallCurrentState,
    diceSize,
    question,
  } = useGlobal();

  const [playShakeSound1] = useSound(shakeSounds[0]);
  const [playShakeSound2] = useSound(shakeSounds[1]);
  const [playErrorSound] = useSound(errorSound);

  const [eightBallDiceStyle, setEightBallDiceStyle] = useState({
    opacity: "0",
    transition: "none",
  });
  const [shakeCount, setShakeCount] = useState(0);
  const [jsonResult, setJsonResult] = useState("");
  const [enableHelpModal, setEnableHelpModal] = useState(true);
  const [helpModalOpened, sethelpModalOpened] = useState(false);

  const shakeEightBall = async () => {
    setEightBallDiceStyle({ opacity: "0", transition: "none" });
    setBallCurrentState("shaking");

    const answerData = await getAnswer(question);

    setAnswer(answerData.response);
    setJsonResult(JSON.stringify(answerData, null, 2));
    setShakeCount((prev) => prev + 1);
    
    getRandomItem([playShakeSound1, playShakeSound2])();

    setTimeout(() => {
      setBallCurrentState("result");
      setTimeout(() => {
        setEightBallDiceStyle({
          transition: "opacity 0.75s ease",
          opacity: "1",
        });
        console.log("Shown result");
      }, 500);
    }, 2200);
  };

  return (
    <div className={styles.eightBallWrapper}>
      <code>{jsonResult}</code>

      <TapToShake shakeCount={shakeCount} />

      <button
        id="eightBallWrapper"
        onClick={shakeEightBall}
        className={`${styles.eightBall} ${ballCurrentState === "shaking" ? styles.shake : ''}`}
        title="Click me to reveal your destiny."
        disabled={ballCurrentState === "shaking"}
      >
        <EightBallSvg currentState={ballCurrentState} diceStyle={eightBallDiceStyle} />

        <ResizableText
          minFontSize={10}
          initialFontSize={40}
          maxWidth={diceSize.width}
          maxHeight={diceSize.height}
          extraStyle={eightBallDiceStyle}
          className={textStyles.eightBallText}
        >
          {ballCurrentState !== "error" ? answer : ">:("}
        </ResizableText>
      </button>

      <QuestionInput ballCurrentState={ballCurrentState} shakeEightBall={shakeEightBall} />

      {/* <label>
        <input type='checkbox' onChange={() => setEnableHelpModal(!enableHelpModal)} />
        Enable dark humor (You're on your own)
      </label> */}

      <Modal isOpen={helpModalOpened} onClose={() => sethelpModalOpened(false)}>
        <h1>Slow down right there...</h1>
        <p>
          If you're going through something serious, <b>this Magic 8 Ball isn't your place.</b><br />
          Talk to someone real. You matter more than a dumb response generator created by a soydev.
        </p>
        <p className='text-sm italic text-gray-500 dark:text-gray-300'>
          Or if you're just an edgelord, grow up.
        </p>
        <br />
        <button onClick={() => sethelpModalOpened(false)} className="buttonBlue mt-6">
          I understand.
        </button>
      </Modal>
    </div>
  );
}

export default Magic8Ball;
