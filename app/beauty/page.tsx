'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from '../../components/Modal';
import ContactUs from '../../components/ContactUs';
import BeautyProjects from '@/components/BeautyProjects';
import { getBeautyProjects } from '@/lib/actions/project.actions';
import Loading from './loading';

const Beauty = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    let timer: number;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        setIsScrolling(false);
      }, 200); // Adjust the delay as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative flex flex-col px-4  md:px-8 lg:px-16 py-12 dark:bg-black">
      <div className="fixed z-[70] top-0 left-0 w-screen h-screen pointer-events-none">
        <div className="absolute flex bg-white dark:bg-black  p-4 md:p-6 lg:p-8 top-0 left-0 right-0">
          <div
            className={`w-full h-0.5 bg-black dark:bg-white relative ${
              isScrolling ? 'glitch-line' : ''
            }`}
          ></div>
        </div>
        <div className="absolute flex bg-white dark:bg-black  p-4 md:p-6 lg:p-8 bottom-0 left-0 right-0">
          <div
            className={`w-full h-0.5 bg-black dark:bg-white relative  ${
              isScrolling ? 'glitch-line' : ''
            }`}
          ></div>
        </div>
        <div className="absolute flex bg-white dark:bg-black  p-4 md:p-6 lg:p-8 pr-0 md:pr-0 lg:pr-0 top-0 left-0 bottom-0">
          <div
            className={`h-full w-0.5 bg-black dark:bg-white relative ${
              isScrolling ? 'glitch-line' : ''
            }`}
          ></div>
        </div>
        <div className="absolute flex bg-white dark:bg-black p-4 md:p-6 lg:p-8 pl-0 md:pl-0 lg:pl-0 top-0 right-0 bottom-0">
          <div
            className={`h-full w-0.5 bg-black dark:bg-white relative ${
              isScrolling ? 'glitch-line' : ''
            }`}
          ></div>
        </div>
      </div>
      <div className="p-8 xl:p-16 2xl:p-32 flex flex-col w-full items-center justify-center gap-8">
        <Suspense fallback={<Loading />}>
          <ProjectsWithData />
        </Suspense>
      </div>
      <div className="w-full h-full flex justify-between items-center py-2 md:py-8 px-2 md:px-4">
        <Link href="/" className="py-8">
          <h4 className="uppercase text-xl md:text-2xl xl:text-[80px] 2xl:text-[128px] font-[800] hover:scale-110 transition-all duration-300 tracking-widest">
            k le dortz
          </h4>
        </Link>
        <h4
          className="uppercase text-xl md:text-2xl xl:text-4xl font-[800] cursor-pointer hover:scale-125 transition-all duration-300 tracking-widest"
          onClick={() => openModal()}
        >
          contact
        </h4>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ContactUs />
      </Modal>
    </div>
  );
};

export default Beauty;

// ProjectsWithData component
const ProjectsWithData = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getBeautyProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <Loading />;

  return <BeautyProjects projects={projects} />;
};
