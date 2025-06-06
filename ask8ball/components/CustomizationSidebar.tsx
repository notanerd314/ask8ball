"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGlobal } from './context/GlobalContext';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon } from './common/FontAwesome';
import { useMediaQuery } from 'react-responsive';
import { TrashCanIcon } from './common/FontAwesome';

import styles from '../styles/Sidebar.module.css'
import '../styles/globals.css'

import { toast } from 'react-toastify';

export function SidebarEditor({ isCompacted }: { isCompacted: boolean }) {
  const { allAnswers, setAllAnswers } = useGlobal();
  const inputRef = useRef<HTMLInputElement[]>([]);

  function updateAnswer(index: number, value: string) {
    const next = [...allAnswers];
    next[index] = value;
    setAllAnswers(next);
  }

  function deleteAnswer(index: number) {
    const next = [...allAnswers];
    next.splice(index, 1);
    setAllAnswers(next);
    setTimeout(() => {
      inputRef.current.splice(index, 1);
    }, 1)
  }

  function addAnswer() {
    const next = [...allAnswers];
    next.push("");
    setAllAnswers(next);
    setTimeout(() => {
      inputRef.current[inputRef.current.length - 1].focus();
    }, 1)
  }

  function deleteAllAnswers() {
    setAllAnswers([]);
    toast.success("All responses deleted");
    setTimeout(() => {
      inputRef.current = [];
    }, 1)
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
    <div className={styles.editor}>
      <div className={styles.editorHeader}>
        <button className='buttonGreen' onClick={addAnswer}>
          <PlusIcon size={16} /> Add a response
        </button>

        <button className='buttonRed' onClick={deleteAllAnswers}>
          <TrashCanIcon size={16} /> Delete all responses
        </button>
      </div>

      <div className={styles.editorContent}>
        {allAnswers.map((answer: string, index: number) => (
          <div key={index} className={styles.editorItem}>
            <input
              value={answer}
              style={{ flex: 1 }}
              ref={(el) => {
                if (el) {
                  inputRef.current[index] = el;
                  console.log(inputRef.current[index])
                }
              }}
              onChange={e => updateAnswer(index, e.target.value)}
              onKeyDown={e => { checkKeyThenAction(e, index) }}
              placeholder={"Add something quirky..."}
            />
            <button
              className="buttonRed"
              onClick={() => deleteAnswer(index)}
            >
              <TrashCanIcon size={20} color='#ffffff' />
              {!isCompacted ? '' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.7em' }}>{allAnswers.length} response{allAnswers.length === 1 ? '' : 's'} - Version 1 (Alpha)</p>
    </div>
  )
}

export default function CustomizationSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setisOpen] = useState(true);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isCompacted = useMediaQuery({ maxWidth: 1400 });

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