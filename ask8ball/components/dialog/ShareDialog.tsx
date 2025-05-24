import { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';
import { useGlobal } from '../GlobalContext';
import { TwitterIcon } from '../FontAwesome';
import { useMagic8BallRef } from '../Magic8BallRef';
import Modal from '../default/Modal';
import '../../styles/globals.css'

import { toPng } from 'html-to-image';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ShareDialog({ isOpen, onClose }: ModalProps) {
  const { answer } = useGlobal();
  const { question } = useGlobal();
  const magic8BallRef = useMagic8BallRef();

  const [imageSrc, setImageSrc] = useState<string>();

  const createImage = () => {
    console.log("Opening share dialog");
    toPng(magic8BallRef.current, {
      cacheBust: true,
      skipFonts: true
    })
      .then(function (dataUrl: string) {
        setImageSrc(dataUrl);
      })
      .catch(function (error: Error) {
        console.error('Error generating image:', error);
      });
  }

  return (
    <Modal isOpen={isOpen} onOpen={createImage} onClose={onClose}>
      <h1>Share Result</h1>
      <p>Question: {question}</p>
      <p>Answer: {answer}</p>
      <button className='buttonBlack'>
        <TwitterIcon /> Share on X
      </button>
      <img width={300} height={300} src={imageSrc} alt="Magic 8 Ball Picture" />
    </Modal>
  )
}

export default ShareDialog