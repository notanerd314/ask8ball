import styles from '../../styles/BottomButtons.module.css'
import '../../styles/globals.css'
import ShareDialog from '../dialog/ShareDialog';
import { useGlobal } from '../context/GlobalContext';
import { ShareIcon } from '../icons/FontAwesome';
import { useState } from 'react';

function BottomButtons() {
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