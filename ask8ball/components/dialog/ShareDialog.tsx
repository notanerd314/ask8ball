import { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';
import { useGlobal } from '../GlobalContext';
import { TwitterIcon } from '../FontAwesome';
import { useMagic8BallRef } from '../Magic8BallRef';
import '../../styles/globals.css'

import { toPng } from 'html-to-image';

const ShareDialog = forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement>>((props, ref) => {
  const { answer } = useGlobal();
  const { question } = useGlobal();
  const magic8BallRef = useMagic8BallRef();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [imageSrc, setImageSrc] = useState<string>();

  const onClose = () => {
    dialogRef.current?.close();
  }

  const createImage = () => {
    console.log("Opening share dialog");
    toPng(magic8BallRef.current)
      .then(function (dataUrl: string) {
        alert('Generated image');
        setImageSrc(dataUrl);
      })
      .catch(function (error: Error) {
        console.error('Error generating image:', error);
      });
  }

  const balls = () => {
    console.log("ball")
  }

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  return (
    <dialog ref={dialogRef} onChange={createImage} {...props}>
      <h1>Share Result</h1>
      <p>Question: {question}</p>
      <p>Answer: {answer}</p>
      <button className='buttonBlack'>
        <TwitterIcon /> Share on X
      </button>
      <img src={imageSrc} alt="Magic 8 Ball Picture" />
      <button className="dialogClose" onClick={onClose}>x</button>
    </dialog>
  )
})

export default ShareDialog