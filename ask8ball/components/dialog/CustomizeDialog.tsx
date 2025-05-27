"use client";

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useGlobal } from '../common/GlobalContext';
import '../../styles/globals.css'

const CustomizeDialog = forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement>>((props, ref) => {
  const { setAllAnswers } = useGlobal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const plainTextResponses = `It is certain
It is decidedly so
Without a doubt
Yes definitely
You may rely on it
As I see it yes
Most likely
Outlook good
Yes
Signs point to yes
Reply hazy try again
Ask again later
Better not tell you now
Cannot predict now
Concentrate and ask again
Don't count on it
My reply is no
My sources say no
Outlook not so good
Very doubtful`;

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  function onClose() {
    const listAnswers = textareaRef.current?.value.split('\n')
      .map(line => line.trim())
      .filter(line => line);
    setAllAnswers(listAnswers);
    dialogRef.current?.close();
  }

  return (
    <dialog ref={dialogRef} onClose={onClose} {...props}>
      <h1>Options</h1>
      <p>Name of the custom magic 8 ball:</p>
      <input id="title-textarea" placeholder="Magic 8 Ball"></input>
      <p>All possible responses:</p>
      <textarea
        ref={textareaRef}
        id="options-textarea"
        placeholder="Click enter for next response..."
        defaultValue={plainTextResponses}
      ></textarea>
      <button className="dialogClose" onClick={onClose}>x</button>
    </dialog>
  )
})

export default CustomizeDialog