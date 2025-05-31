"use client";

import { useRef } from 'react';
import { useGlobal } from '../common/GlobalContext';
import '../../styles/globals.css'

function Customization() {
  const { setAllAnswers } = useGlobal();
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

  function onCloseSave() {
    const listAnswers = textareaRef.current?.value.split('\n')
      .map(line => line.trim())
      .filter(line => line);
    setAllAnswers(listAnswers);
  }

  return (
    <div>
      <h1>Options</h1>
      <p>All possible responses:</p>
      
      <textarea
        ref={textareaRef}
        id="options-textarea"
        placeholder="Click enter for next response..."
        defaultValue={plainTextResponses}
      ></textarea>
    </div>
  )
}

export default Customization