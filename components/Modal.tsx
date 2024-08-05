import React from 'react';
import { fadeIn } from '../variants';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const overlayClasses = isOpen
    ? 'fixed inset-0 w-screen h-screen bg-white/60 backdrop-blur-sm flex justify-center items-center z-[999] transition-opacity duration-800 ease-in-out'
    : 'fixed inset-0 w-screen h-screen bg-white/60 backdrop-blur-sm flex justify-center items-center z-[999] opacity-0 pointer-events-none';

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'wrapper') {
      onClose();
    }
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.4)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={overlayClasses}
      id="wrapper"
      onClick={handleClose}
    >
      <motion.div
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="max-w-[980px] 2xl:max-w-[1366px] mx-4 md:mx-0 w-full cursor-default flex flex-col gap-2 items-center justify-center relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
