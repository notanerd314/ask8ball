"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '../utils/FontAwesome';
import { useMediaQuery } from 'react-responsive';

import SidebarEditor from './SidebarEditor';
import SidebarNavigation from './SidebarNav';
import styles from '../../styles/Sidebar.module.css'

export default function CustomizationSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);
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
          <SidebarNavigation currentPage={page} pages={['Customize', 'About']} setPage={setPage} />
          {page === 0 && <SidebarEditor isCompacted={isCompacted} />}
        </div>
      </aside>
    </>
  )
}