"use client";

import { useRef, useState } from 'react';
import styles from '../styles/BottomButtons.module.css'
import '../styles/globals.css'
import ShareDialog from './dialog/ShareDialog';
import { useGlobal } from './context/GlobalContext';
import { BrushIcon, ShareIcon } from './common/FontAwesome';

function BottomButtons() {
  const [openedCustomizeDialog, setOpenedCustomizeDialog] = useState(false);
  const [openedShareDialog, setOpenedShareDialog] = useState(false);
  const { isShaking } = useGlobal();

  return (
    <div className={styles.bottomButtons}>
      <button onClick={() => setOpenedShareDialog(!openedShareDialog)} disabled={isShaking} className='buttonGreen'>
        <ShareIcon />
        share
      </button>
      <ShareDialog isOpen={openedShareDialog} onClose={() => setOpenedShareDialog(false)} />
    </div>
  )
}

export default BottomButtons