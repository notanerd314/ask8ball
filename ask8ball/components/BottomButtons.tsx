"use client";

import { useRef } from 'react';
import styles from '../styles/BottomButtons.module.css'
import CustomizeDialog from './CustomizeDialog';

function BottomButtons() {
  const customizeDialogRef = useRef<HTMLDialogElement>(null);

  function showCustomizeDialog() {
    console.log(customizeDialogRef)
    customizeDialogRef.current?.showModal();
    console.log("clicked")
  }

  return (
    <div className={styles.bottomButtons}>
      <button onClick={showCustomizeDialog}>customize</button>
      <button>share</button>
      <CustomizeDialog ref={customizeDialogRef} />
    </div>
  )
}

export default BottomButtons