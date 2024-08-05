'use client';

import React from 'react';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import Link from 'next/link';

const ContactUs = () => {
  return (
    <div className="max-w-[80vw] w-full h-full flex flex-col justify-center items-center shadow-xl bg-white dark:bg-black py-4 md:py-8 rounded-xl overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row items-center justify-center px-20 gap-4 md:gap-8 lg:gap-12 py-4 md:py-8 lg:py-12">
        <CardContainer className="w-[180px] cursor-pointer shadow-xl rounded-xl">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="180"
              className="text-xl font-bold text-black dark:text-white uppercase flex justify-center items-center"
            >
              <Link
                href="https://www.instagram.com/kledortz_colorist/tagged/"
                target="_blank"
                className="text-center text-lg"
              >
                instagram
              </Link>
            </CardItem>
          </CardBody>
        </CardContainer>
        <CardContainer className="w-[180px] cursor-pointer shadow-xl rounded-xl">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="180"
              className="text-xl font-bold text-black dark:text-white uppercase flex justify-center items-center"
            >
              <Link
                href="mailto:adelia.booking@gmail.com?subject=Subject%20Here&body=Body%20Text%20Here"
                target="_blank"
                className="text-center text-lg"
              >
                mail
              </Link>
            </CardItem>
          </CardBody>
        </CardContainer>
        <CardContainer className="w-[180px] cursor-pointer shadow-xl rounded-xl">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="180"
              className="text-xl font-bold text-black dark:text-white uppercase flex justify-center items-center"
            >
              <Link
                href="https://wa.me/+33603211791"
                target="_blank"
                className="text-center text-lg"
              >
                phone
              </Link>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

export default ContactUs;
