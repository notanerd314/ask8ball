"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGlobal } from './context/GlobalContext';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from './common/FontAwesome';
import { useMediaQuery } from 'react-responsive';
import { TrashCanIcon } from './common/FontAwesome';

import styles from '../styles/Sidebar.module.css'
import '../styles/globals.css'

export function SidebarEditor({isCompacted}: {isCompacted: boolean}) {
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

  const { allAnswers, setAllAnswers } = useGlobal();

  function updateAnswer(index: number, value: string) {
    const next = [...allAnswers];
    next[index] = value;
    setAllAnswers(next);
  }

  function deleteAnswer(index: number) {
    const next = [...allAnswers];
    next.splice(index, 1);
    setAllAnswers(next);
  }

  function addAnswer() {
    const next = [...allAnswers];
    next.push("");
    setAllAnswers(next);
  }

  function checkKeyThenAction(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Enter") {
      event.preventDefault();
      addAnswer();
    } else if (event.key === "Delete") {
      deleteAnswer(index);
    }
  }

  return (
    <>
      <div className={styles.editorContent}>
        {allAnswers.map((answer: string, index: number) => (
          <div key={index} className={styles.editorItem}>
            <input
              value={answer}
              style={{ flex: 1 }}
              onChange={e => updateAnswer(index, e.target.value)}
              onKeyDown={e => {checkKeyThenAction(e, index)}}
            />
            <button
              className="buttonRed"
              onClick={() => deleteAnswer(index)}
            >
              <TrashCanIcon color='#ffffff' />
              {!isCompacted ? '' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default function CustomizationSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setisOpen] = useState(true);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isCompacted = useMediaQuery({ maxWidth: 1000 });

  if (!mounted) return null;

  function toggleSidebar() {
    setisOpen(prev => {
      const next = !prev;
      if (next && isCompacted) {
        setTimeout(() => {
          sidebarRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 1);
      }
      return next;
    });
  }

  return (
    <>
      <button className={styles.sidebarToggle + ' buttonTransparent'} onClick={toggleSidebar} title='Toggle sidebar'>
        {!isOpen ?
          isCompacted ? <ChevronDownIcon /> : <ChevronLeftIcon />
          :
          isCompacted ? <ChevronUpIcon /> : <ChevronRightIcon />
        }
        &nbsp;
        {isCompacted ? 'Customize' : ''}
      </button>
      <aside ref={sidebarRef} className={styles.sidebar + " " + (!isOpen ? styles.sidebarHidden : "")}>
        <SidebarEditor isCompacted={isCompacted} />
      </aside>
    </>
  )
}