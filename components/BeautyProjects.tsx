'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Parallax } from './Parallax';
import { fadeIn } from '../variants';
import { motion } from 'framer-motion';
import Modal from './Modal';

interface ProjectData {
  _id: string; // MongoDB document ID
  title: string;
  priority: boolean;
  position: 'start' | 'center' | 'end';
  videoSource: string;
  speed: number;
  aspectRatio: '16/9' | '9/16';
  imageUrl: string;
  category: 'fashion' | 'beauty' | 'luxury';
}

interface FashionProjectsProps {
  projects: ProjectData[];
}

const BeautyProjects = ({ projects }: FashionProjectsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ProjectData | null>(null);

  function openModal(project: ProjectData) {
    setSelectedImage(project);
    setIsOpen(true);
  }

  function closeModal() {
    setSelectedImage(null);
    setIsOpen(false);
  }

  return (
    <>
      {projects.map((project, index) => (
        <Parallax
          speed={project.speed}
          key={index}
          className={`self-${project.position} scale-75 2xl:scale-100 z-[60] cursor-pointer`}
        >
          <motion.div
            variants={fadeIn(`${index % 2 === 0 ? 'right' : 'left'}`, 0.4)}
            initial="hidden"
            whileInView="show"
            exit="hidden"
            className="relative h-full w-full group"
            onClick={() => openModal(project)}
          >
            <Image
              src={project.imageUrl}
              alt="project_image"
              width={project.aspectRatio === '16/9' ? 700 : 400}
              height={project.aspectRatio === '9/16' ? 700 : 400}
              priority={project.priority}
              sizes="50vw"
            />
            <div className="absolute top-0 left-0 w-full h-full hidden group-hover:flex group-hover:justify-center group-hover:items-center bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out" />
            <div className="absolute top-0 left-0 w-full h-full justify-center items-center flex text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ">
              {project.title}
            </div>
          </motion.div>
        </Parallax>
      ))}
      {selectedImage && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="h-0 w-full pb-[100%] sm:pb-[80%] md:pb-[60%] ">
            <div className="absolute top-0 left-0 w-full h-full flex flex-col">
              <div className="w-full h-full bg-black relative">
                <iframe
                  src={selectedImage.videoSource}
                  width="1920"
                  height="1080"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BeautyProjects;
