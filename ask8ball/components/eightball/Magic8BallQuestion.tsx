"use client";

import { useGlobal } from "../common/GlobalContext";
import styles from "../../styles/Magic8Ball.module.css"
import { CloseIcon, ReplyIcon } from "../common/FontAwesome";
import { useRef } from "react";

function Magic8BallQuestion() {
  const { setQuestion, isShaking } = useGlobal();
  const questionRef = useRef<HTMLInputElement>(null);

  const resetQuestion = () => {
    if (questionRef.current) {
      questionRef.current.value = "";
    }
  }

  const onChange = () => {
    if (questionRef.current) {
      setQuestion(questionRef.current.value);
    }
  } 

  return (
    <div onChange={onChange} className={styles.askQuestionInput}>
      <input
        type='search'
        ref={questionRef}
        placeholder='Ask a question...'
        disabled={isShaking}
      />
      <button type="button" disabled={isShaking} onClick={resetQuestion} title='Reset question'>
        <CloseIcon />
      </button>
    </div>
  )
}

export default Magic8BallQuestion