"use client";

import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpen?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
};

/** 
 * Modal dialog component with backdrop
 * @param isOpen - Whether the modal is currently open
 * @param setIsOpen - Function to control modal open state
 * @param children - Modal content
 * @param onOpen - Optional callback when modal opens
 * @param onClose - Optional callback when modal closes
 * @returns JSX element with modal functionality
 */
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
    <dialog ref={modalRef} className="fixed p-6 overflow-auto leading-relaxed text-white -translate-x-1/2 -translate-y-1/2 border rounded-md shadow-xl bg-slate-950/90 backdrop-blur-3xl w-2xl top-1/2 left-1/2 border-gray-700/80">
      {children}
      <button
        className="absolute top-5 right-5 !p-2.5 buttonRed"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faXmark} color='white' size='xl' />
      </button>
    </dialog>
  );
}