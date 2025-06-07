"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '../utils/FontAwesome';
import { useMediaQuery } from 'react-responsive';

import SidebarEditor from './SidebarEditor';
import styles from '../../styles/Sidebar.module.css'

export default function CustomizationSidebar() {
  const { allAnswers } = useGlobal();
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
        <div className={styles.sidebarContent}>
          <SidebarEditor isCompacted={isCompacted} />
          <p style={{ textAlign: 'center', fontSize: '0.8em' }}>{allAnswers.length} response{allAnswers.length === 1 ? '' : 's'} - Version 1 (Alpha)</p>
        </div>
      </aside>
    </>
  )
}