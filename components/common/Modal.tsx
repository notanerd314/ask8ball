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
  title?: string;
  className?: string;
};

/** 
 * Modal dialog component with backdrop
 * @param isOpen - Whether the modal is currently open
 * @param setIsOpen - Function to control modal open state
 * @param children - Modal content
 * @param onOpen - Optional callback when modal opens
 * @param onClose - Optional callback when modal closes
 * @param title - Optional modal title for accessibility
 * @param className - Additional CSS classes
 * @returns JSX element with modal functionality
 */
export default function Modal({ 
  isOpen, 
  setIsOpen, 
  children, 
  onOpen = () => { }, 
  onClose = () => { },
  title,
  className = ""
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      onOpen && onOpen();
      modalRef.current?.showModal();
      // Focus management for accessibility
      modalRef.current?.focus();
    } else {
      onClose && onClose();
      modalRef.current?.close();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      setIsOpen(false);
    }
  };
  return (
    <dialog 
      ref={modalRef} 
      className={`fixed p-6 overflow-auto leading-relaxed text-white -translate-x-1/2 -translate-y-1/2 border rounded-md shadow-xl bg-slate-950/90 backdrop-blur-3xl w-2xl top-1/2 left-1/2 border-gray-700/80 ${className}`}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      role="dialog"
    >
      {title && (
        <h2 id="modal-title" className="sr-only">
          {title}
        </h2>
      )}
      {children}
      <button
        className="absolute top-5 right-5 !p-2.5 buttonRed"
        aria-label="Close modal"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        <FontAwesomeIcon icon={faXmark} color='white' size='xl' />
      </button>
    </dialog>
  );
}