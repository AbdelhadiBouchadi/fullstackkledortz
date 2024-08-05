'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import Modal from '../components/Modal';
import ContactUs from '../components/ContactUs';
import { PasskeyModal } from '@/components/PasskeyModal';

const navLinks = [
  {
    text: 'fashion',
    link: '/fashion',
  },
  {
    text: 'beauty',
    link: '/beauty',
  },
  {
    text: 'luxury',
    link: '/luxury',
  },
];

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === 'true';

  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className="relative flex flex-col justify-center items-center ">
      {isAdmin && <PasskeyModal />}

      <div className="fixed z-[70] top-0 left-0 w-screen h-svh md:h-screen pointer-events-none">
        <div className="absolute flex  p-4 md:p-6 lg:p-8 top-0 left-0 right-0">
          <div className="w-full h-0.5 bg-black dark:bg-white relative glitch-line"></div>
        </div>
        <div className="absolute flex  p-4 md:p-6 lg:p-8 bottom-0 left-0 right-0">
          <div className="w-full h-0.5 bg-black dark:bg-white relative glitch-line"></div>
        </div>
        <div className="absolute flex  p-4 md:p-6 lg:p-8 pr-0 md:pr-0 lg:pr-0 top-0 left-0 bottom-0">
          <div className="h-full w-0.5 bg-black dark:bg-white relative glitch-line"></div>
        </div>
        <div className="absolute flex  p-4 md:p-6 lg:p-8 pl-0 md:pl-0 lg:pl-0 top-0 right-0 bottom-0">
          <div className="h-full w-0.5 bg-black dark:bg-white relative glitch-line"></div>
        </div>
      </div>
      <div className="h-[85svh] 2xl:h-[90vh] w-full dark:bg-black bg-white   relative flex items-center justify-between gap-6 px-8 2xl:px-24">
        <div className="flex flex-col items-start justify-around h-full md:gap-20 2xl:gap-52 2xl:py-12 py-8 z-20">
          <motion.div
            variants={fadeIn('right', 0.4)}
            initial="show"
            animate="show"
            exit="hidden"
            className="flex justify-center items-start cursor-pointer"
            onClick={toggleTheme}
            onMouseEnter={toggleTheme}
            onMouseLeave={toggleTheme}
          >
            <h1 className="text-4xl lg:text-6xl xl:text-8xl font-bold uppercase">
              k le dortz
            </h1>
          </motion.div>
          <div className="flex flex-col justify-between items-start gap-12 2xl:gap-32">
            {navLinks.map((nav, index) => (
              <Link href={nav.link}>
                <motion.div
                  variants={fadeIn('right', 0.4 + (2 * index) / 10)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="group flex justify-between items-center gap-4"
                >
                  <h4 className="text-3xl lg:text--4xl  xl:text-6xl uppercase font-semibold group-hover:scale-110 transition-all duration-300 tracking-widest">
                    {nav.text}
                  </h4>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
        <motion.div
          variants={fadeIn('left', 0.4)}
          initial="show"
          animate="show"
          exit="hidden"
          className="absolute right-8 -bottom-0 md:bottom-0 flex justify-center items-center 2xl:bottom-0 z-20"
          onClick={() => openModal()}
        >
          <h6 className="uppercase text-2xl font-semibold cursor-pointer hover:scale-110 transition-all duration-300 tracking-widest">
            contact
          </h6>
        </motion.div>
        <motion.div
          variants={fadeIn('left', 0.4)}
          initial="show"
          animate="show"
          exit="hidden"
          className="absolute right-8 -top-0 md:top-0 flex justify-center items-center 2xl:top-0 z-20"
        >
          <Link
            href="/?admin=true"
            className="uppercase text-2xl font-semibold cursor-pointer hover:scale-110 transition-all duration-300 tracking-widest"
          >
            admin
          </Link>
        </motion.div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ContactUs />
      </Modal>
    </div>
  );
};

export default Home;
