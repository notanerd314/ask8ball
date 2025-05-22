"use client";

import { useRef } from 'react';
import styles from '../styles/BottomButtons.module.css'
import '../styles/globals.css'
import CustomizeDialog from './dialog/CustomizeDialog';
import ShareDialog from './dialog/ShareDialog';
import { useGlobal } from './GlobalContext';
import { BrushIcon, ShareIcon } from './FontAwesome';

function BottomButtons() {
  const customizeDialogRef = useRef<HTMLDialogElement>(null);
  const shareDialogRef = useRef<HTMLDialogElement>(null);
  const { isShaking } = useGlobal();

  return (
    <div className={styles.bottomButtons}>
      <button onClick={() => customizeDialogRef.current?.showModal()} disabled={isShaking} className='buttonBlue'>
        <BrushIcon />
        customize
      </button>
      <button onClick={() => shareDialogRef.current?.showModal()} disabled={isShaking} className='buttonGreen'>
        <ShareIcon />
        share
      </button>
      <CustomizeDialog ref={customizeDialogRef} />
      <ShareDialog ref={shareDialogRef} />
    </div>
  )
}

export default BottomButtons