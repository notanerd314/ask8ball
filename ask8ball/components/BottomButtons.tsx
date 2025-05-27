"use client";

import { useRef, useState } from 'react';
import styles from '../styles/BottomButtons.module.css'
import '../styles/globals.css'
import CustomizeDialog from './dialog/CustomizeDialog';
import ShareDialog from './dialog/ShareDialog';
import { useGlobal } from './common/GlobalContext';
import { BrushIcon, ShareIcon } from './common/FontAwesome';

function BottomButtons() {
  const customizeDialogRef = useRef<HTMLDialogElement>(null);
  const [openedShareDialog, setOpenedShareDialog] = useState(false);
  const { isShaking } = useGlobal();

  return (
    <div className={styles.bottomButtons}>
      <button onClick={() => customizeDialogRef.current?.showModal()} disabled={isShaking} className='buttonBlue'>
        <BrushIcon />
        customize
      </button>
      <button onClick={() => setOpenedShareDialog(!openedShareDialog)} disabled={isShaking} className='buttonGreen'>
        <ShareIcon />
        share
      </button>
      <CustomizeDialog ref={customizeDialogRef} />
      <ShareDialog isOpen={openedShareDialog} onClose={() => setOpenedShareDialog(false)} />
    </div>
  )
}

export default BottomButtons