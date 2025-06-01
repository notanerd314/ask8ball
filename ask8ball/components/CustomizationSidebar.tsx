"use client";

import { useRef, useState } from 'react';
import { useGlobal } from './common/GlobalContext';
import { ChevronLeftIcon, ChevronRightIcon } from './common/FontAwesome';

import styles from '../styles/Sidebar.module.css'
import '../styles/globals.css'

export default function CustomizationSidebar() {
  const { setAllAnswers } = useGlobal();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOpen, setisOpen] = useState(true);

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

  function saveResponses() {
    const listAnswers = textareaRef.current?.value.split('\n')
      .map(line => line.trim())
      .filter(line => line);
    setAllAnswers(listAnswers);
  }

  function toggleSidebar() {
    setisOpen(!isOpen);
  }

  return (
    <>
      <button className='buttonTransparent' onClick={toggleSidebar} title='Toggle sidebar'>
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
      <aside ref={sidebarRef} className={styles.sidebar + " " + (isOpen ? styles.sidebarHidden : "")}>
        <textarea
          ref={textareaRef}
          onChange={saveResponses}
          placeholder="Click enter for next response..."
          defaultValue={plainTextResponses}
        ></textarea>
      </aside>
    </>
  )
}