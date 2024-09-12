'use client';

import SmoothScroll from './SmoothScroll';
import React from 'react';
import { AnimatePresence } from 'framer-motion';

// Components

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </SmoothScroll>
  );
};

export default Layout;
