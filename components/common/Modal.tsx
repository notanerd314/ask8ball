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
    <dialog ref={modalRef} className="fixed p-6 overflow-auto leading-relaxed text-white -translate-x-1/2 -translate-y-1/2 border rounded-md shadow-xl bg-slate-950/80 backdrop-blur-md w-2xl top-1/2 left-1/2 border-gray-700/80">
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
