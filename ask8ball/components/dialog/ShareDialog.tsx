import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useGlobal } from '../GlobalContext';
import '../../styles/globals.css'

const ShareDialog = forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement>>((props, ref) => {
  const { answer } = useGlobal();
  const { question } = useGlobal();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const onClose = () => {
    dialogRef.current?.close();
  }

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  return (
    <dialog ref={dialogRef} {...props}>
      <h2>Share</h2>
      <p>Question: {question}</p>
      <p>Answer: {answer}</p>
      <button className="dialogClose" onClick={onClose}>x</button>
    </dialog>
  )
})

export default ShareDialog