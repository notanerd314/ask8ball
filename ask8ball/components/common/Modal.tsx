import React from 'react';
import styles from '../../styles/Modal.module.css'

type ModalProps = {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onOpen, onClose, children }: ModalProps) {
  if (!onOpen) {
    onOpen = () => {};
  }

  if (!onClose) {
    onClose = () => {};
  }

  React.useEffect(() => {
    if (isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {children}
        <button
          className={styles.modalClose}
          onClick={(e) => {
            console.log('Modal onClose:', onClose);
            e.stopPropagation();
            onClose();
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}