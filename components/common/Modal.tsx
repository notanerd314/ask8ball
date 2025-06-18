import React from 'react';
import styles from '../../styles/Modal.module.css'
import { CloseIcon } from '../utils/FontAwesome';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden bg-black/50 backdrop-blur-sm">
      <div className="absolute p-6 overflow-auto leading-relaxed shadow-xl bg-slate-100 dark:bg-slate-700 rounded-md w-2xl">
        {children}
        <button
          className="absolute top-5 right-5 !p-2.5 buttonRed"
          onClick={(e) => {
            console.log('Modal onClose:', onClose);
            e.stopPropagation();
            onClose();
            isOpen = false;
          }}
        >
          <CloseIcon size={20} />
        </button>
      </div>
    </div>
  );
}
