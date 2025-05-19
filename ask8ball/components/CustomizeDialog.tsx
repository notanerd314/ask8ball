"use client";

import { useRef, forwardRef, useImperativeHandle, ChangeEvent } from 'react';
import { useGlobal } from './GlobalContext';
import '../styles/globals.css'

const CustomizeDialog = forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement>>((props, ref) => {
  const { allAnswers, setAllAnswers } = useGlobal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  function changeAllAnswers(element: ChangeEvent<HTMLTextAreaElement>) {
    const listAnswers = element.target.value.split('\n')
                        .map(line => line.trim())
                        .filter(line => line);
    setAllAnswers(listAnswers);
  }

  return (
    <dialog ref={dialogRef} onClose={() => dialogRef.current?.close()} {...props}>
      <h1>Options</h1>
      <p>Name of the custom magic 8 ball:</p>
      <input id="title-textarea" placeholder="Magic 8 Ball"></input>
      <p>All possible responses:</p>
      <textarea value={allAnswers.join("\n")} id="options-textarea" placeholder="Click enter for next response" onChange={changeAllAnswers}></textarea>
      <button className="dialogClose" onClick={() => dialogRef.current?.close()}>x</button>
    </dialog>
  )
})

export default CustomizeDialog