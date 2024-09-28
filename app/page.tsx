'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PasskeyModal } from '@/components/PasskeyModal';
import { SearchParamProps } from '@/types';
import { fadeIn } from '@/variants';
import Modal from '@/components/Modal';
import ContactUs from '@/components/ContactUs';
import { cn } from '@/lib/utils';

const navLinksLeft = [
  {
    text: 'luxury',
    link: '/luxury',
  },
  {
    text: 'beauty',
    link: '/beauty',
  },
];

const navLinkRight = {
  text: 'fashion & art',
  link: '/fashion',
};

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === 'true';
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="relative flex flex-col px-4  md:px-8 lg:px-16 py-12 dark:bg-black">
      <div className="relative flex flex-col justify-center items-center ">
        <div className="fixed z-[70] top-0 left-0 w-screen h-svh md:h-screen pointer-events-none">
          <div className="absolute flex  p-4 md:p-6 lg:p-8 top-0 left-0 right-0">
            <div className="w-full h-0.5 bg-black dark:bg-white relative glitch-line"></div>
          </div>
          <div className="absolute flex  p-4 md:p-6 lg:p-8 bottom-0 left-0 right-0">
            <div className="w-full h-0.5 bg-black dark:bg-white relative glitch-line"></div>
          </div>
          <div className="absolute flex  p-4 md:p-6 lg:p-8 pr-0 md:pr-0 lg:pr-0 top-0 left-0 bottom-0 z-50">
            <div className="h-full w-0.5 bg-black dark:bg-white relative glitch-line"></div>
          </div>
          <div className="absolute flex  p-4 md:p-6 lg:p-8 pl-0 md:pl-0 lg:pl-0 top-0 right-0 bottom-0">
            <div className="h-full w-0.5 bg-black dark:bg-white relative glitch-line"></div>
          </div>
        </div>
        <div className="h-[85svh] 2xl:h-[90vh] w-full dark:bg-black bg-white   relative flex flex-col md:flex-row items-center justify-between  px-8 2xl:px-24">
          <motion.div
            variants={fadeIn('left', 0.4)}
            initial="show"
            animate="show"
            exit="hidden"
            className="absolute right-8 -bottom-0 md:bottom-0 flex justify-center items-center 2xl:bottom-0 z-20"
            onClick={() => openModal()}
          >
            <h6 className="uppercase text-4xl 2xl:text-6xl  font-[800] cursor-pointer hover:scale-110 transition-all duration-300 tracking-widest">
              contact
            </h6>
          </motion.div>
          {/* Left section with title and links */}
          <div className="flex flex-col items-start justify-around h-full md:gap-20 2xl:gap-10 2xl:py-12 py-8 z-20 xl:w-[70%] ">
            {/* Title */}
            <h1 className="w-full text-4xl lg:text-7xl 2xl:text-[160px] text-start font-[800] uppercase">
              k le dortz
            </h1>

            {/* Navigation links (left side) */}
            <div className="w-full flex flex-col justify-between items-start gap-12 2xl:gap-64 ">
              {navLinksLeft.map((nav, index) => (
                <Link href={nav.link} key={index}>
                  <motion.div
                    variants={fadeIn('right', 0.4 + (2 * index) / 10)}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className={cn(
                      'group flex justify-between items-center gap-4',
                      index === 1 ? 'ml-36 2xl:ml-64' : ''
                    )}
                  >
                    <h4 className="text-3xl lg:text-4xl xl:text-7xl 2xl:text-[150px] text-end uppercase  group-hover:scale-110 transition-all duration-300 tracking-widest project-title">
                      {nav.text}
                    </h4>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
          {/* Right section with "Fashion & Art" */}
          <div className="flex flex-col items-end justify-center gap-12 z-20 lg:mr-32">
            <Link href={navLinkRight.link}>
              <motion.div
                variants={fadeIn('left', 0.6)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="group flex justify-between items-center gap-4 mb-20 md:mb-0 md:mt-32 "
              >
                <h4 className="text-3xl lg:text-4xl xl:text-7xl 2xl:text-[150px] text-end uppercase  group-hover:scale-110 transition-all duration-300 tracking-widest project-title">
                  {navLinkRight.text}
                </h4>
              </motion.div>
            </Link>
          </div>
        </div>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ContactUs />
        </Modal>
      </div>
    </div>
  );
};

export default Home;
