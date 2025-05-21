"use client";

import { useRef } from 'react';
import styles from '../styles/BottomButtons.module.css'
import '../styles/globals.css'
import CustomizeDialog from './CustomizeDialog';
import { useGlobal } from './GlobalContext';
import { BrushIcon } from './FontAwesome';

function BottomButtons() {
  const customizeDialogRef = useRef<HTMLDialogElement>(null);
  const { isShaking } = useGlobal();

  function showCustomizeDialog() {
    console.log(customizeDialogRef)
    customizeDialogRef.current?.showModal();
    console.log("clicked")
  }

  return (
    <div className={styles.bottomButtons}>
      <button onClick={showCustomizeDialog} disabled={isShaking} className='buttonBlue'>
        <BrushIcon />
        customize
      </button>
      <CustomizeDialog ref={customizeDialogRef} />
    </div>
  )
}

export default BottomButtons