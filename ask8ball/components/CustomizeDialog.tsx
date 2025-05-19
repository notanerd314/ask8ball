"use client";

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { GlobalContext } from './GlobalContext';
import '../styles/globals.css'

const CustomizeDialog = forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement>>((props, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  return (
    <dialog ref={dialogRef} onClose={() => dialogRef.current?.close()} {...props}>
      <h1>Options</h1>
      <p>Name of the custom magic 8 ball:</p>
      <input id="title-textarea" placeholder="Magic 8 Ball"></input>
      <p>All possible responses:</p>
      <textarea id="options-textarea" placeholder="Click enter for next response"></textarea>
      <button className="dialogClose" onClick={() => dialogRef.current?.close()}>x</button>
    </dialog>
  )
})

export default CustomizeDialog