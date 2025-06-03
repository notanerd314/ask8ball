"use client"

import { useRef } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { TwitterIcon } from '../common/FontAwesome';
import Modal from '../base/Modal';
import '../../styles/globals.css'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ShareDialog({ isOpen, onClose }: ModalProps) {
  const { answer }: { answer: string } = useGlobal();
  const { question } = useGlobal();

  return (
    <Modal isOpen={isOpen} onOpen={() => {}} onClose={onClose}>
      <h1>Share Result</h1>
      <p>Question: {question}</p>
      <p>Answer: {answer}</p>
      <button className='buttonBlack'>
        <TwitterIcon /> Share on X
      </button>
      <iframe width={500} height={500} src={`/embed?question=${encodeURIComponent(question)}&answer=${encodeURIComponent(answer)}`}></iframe>
      {/* <canvas width={500} height={500} ref={canvasRef}></canvas> */}
    </Modal>
  )
}

export default ShareDialog