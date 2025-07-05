"use client";

import { useEffect, useRef } from 'react';
import { CloseIcon } from '../utils/FontAwesome';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpen?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, setIsOpen, children, onOpen = () => { }, onClose = () => { } }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    console.log('Modal isOpen:', isOpen);
    if (isOpen) {
      onOpen && onOpen();
      modalRef.current?.showModal();
    } else {
      onClose && onClose();
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog 
      ref={modalRef} 
      className="p-6 overflow-auto leading-relaxed shadow-xl rounded-md w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white border border-gray-700/80 blur-backdrop"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      {children}
      <button
        className="absolute top-5 right-5 !p-2.5 buttonRed"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
      >
        <CloseIcon size={20} />
      </button>
    </dialog>
  );
}