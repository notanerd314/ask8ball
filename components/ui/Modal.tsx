"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from './Button';
import { CloseIcon } from '../icons/FontAwesome';
import { cn } from '../../lib/utils/cn';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpen?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
};

export default function Modal({ 
  isOpen, 
  setIsOpen, 
  children, 
  onOpen = () => {}, 
  onClose = () => {},
  className,
  showCloseButton = true
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      onOpen();
      modalRef.current?.showModal();
    } else {
      onClose();
      modalRef.current?.close();
    }
  }, [isOpen, onOpen, onClose]);

  return (
    <dialog 
      ref={modalRef} 
      className={cn(
        "p-6 overflow-auto leading-relaxed shadow-xl bg-slate-950/80 backdrop-blur-xl rounded-md w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white border border-gray-700/80",
        className
      )}
    >
      {children}
      {showCloseButton && (
        <Button
          variant="red"
          size="icon"
          rounded="default"
          className="absolute top-5 right-5"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        >
          <CloseIcon size={20} />
        </Button>
      )}
    </dialog>
  );
}