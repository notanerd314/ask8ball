"use client";

import React, { useRef, useState, useEffect } from 'react';
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

  const isCompacted = useMediaQuery({ maxWidth: 1279 });

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
      <button className='buttonNormal xl:!rounded-tr-none xl:!rounded-br-none' onClick={toggleSidebar} title='Toggle sidebar'>
        {!isOpen ?
          isCompacted ? <ChevronDownIcon /> : <ChevronLeftIcon />
          :
          isCompacted ? <ChevronUpIcon /> : <ChevronRightIcon />
        }

        {isCompacted ? 'Customize' : ''}
      </button>
      <aside ref={sidebarRef} className="w-1/4 h-[98vh] mr-3 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 rounded-md shadow-xl text max-xl:w-[98%] max-xl:m-[2%] max-xl:h-[500px] max-xl-height:h-[100vh] dark:bg-slate-900" hidden={!isOpen}>
        <div className={styles.sidebarContent}>
          <SidebarNavigation currentPage={page} pages={['Entries', 'Results']} setPage={setPage} />
          {page === 0 && <SidebarEditor isCompacted={isCompacted} />}
        </div>
      </aside>
    </>
  )
}