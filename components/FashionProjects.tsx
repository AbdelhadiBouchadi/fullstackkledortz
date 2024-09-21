'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Parallax } from './Parallax';
import { fadeIn } from '../variants';
import { motion } from 'framer-motion';
import Modal from './Modal';
import { cn } from '@/lib/utils';

interface ProjectData {
  _id: string; // MongoDB document ID
  title: string;
  priority: boolean;
  position: 'start' | 'center' | 'end';
  videoSource: string;
  speed: number;
  aspectRatio: '16/9' | '9/16';
  imageSize: 'petite' | 'moyenne' | 'grande';
  imageUrl: string;
  category: 'fashion' | 'beauty' | 'luxury';
}

interface FashionProjectsProps {
  projects: ProjectData[];
}

const getPositionClass = (position: 'start' | 'center' | 'end') => {
  switch (position) {
    case 'start':
      return 'self-start';
    case 'center':
      return 'self-center';
    case 'end':
      return 'self-end';
    default:
      return '';
  }
};

const getImageDimensions = (
  imageSize: 'petite' | 'moyenne' | 'grande',
  aspectRatio: '16/9' | '9/16'
) => {
  switch (imageSize) {
    case 'petite':
      return aspectRatio === '16/9'
        ? { width: 400, height: 225 }
        : { width: 225, height: 400 };
    case 'grande':
      return aspectRatio === '16/9'
        ? { width: 1000, height: 562 }
        : { width: 562, height: 1000 };
    case 'moyenne':
    default:
      return aspectRatio === '16/9'
        ? { width: 700, height: 394 }
        : { width: 394, height: 700 };
  }
};

const FashionProjects = ({ projects }: FashionProjectsProps) => {
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
      {projects.map((project, index) => {
        const { width, height } = getImageDimensions(
          project.imageSize,
          project.aspectRatio
        );

        return (
          <Parallax
            speed={project.speed}
            key={index}
            className={`${getPositionClass(
              project.position
            )} scale-75 2xl:scale-100 z-[60] cursor-pointer`}
          >
            <motion.div
              variants={fadeIn(`${index % 2 === 0 ? 'right' : 'left'}`, 0.4)}
              initial="hidden"
              whileInView="show"
              exit="hidden"
              className={cn(
                'relative h-full w-full group',
                project.imageSize === 'petite' && 'scale-75',
                project.imageSize === 'grande' && 'scale-125'
              )}
              onClick={() => openModal(project)}
            >
              <Image
                src={project.imageUrl}
                alt="project_image"
                width={width}
                height={height}
                priority={project.priority}
                sizes="50vw"
                className={cn(
                  'group-hover:scale-[98%] transition-all duration-300 '
                )}
              />
              <div className="w-full h-full  mt-4  text-black text-xl font-bold project-title transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 text-start">
                {project.title}
              </div>
            </motion.div>
          </Parallax>
        );
      })}
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

export default FashionProjects;
