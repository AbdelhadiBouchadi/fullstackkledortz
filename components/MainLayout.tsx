'use client';

import { ThemeProvider } from './theme-provider';
import SmoothScroll from './SmoothScroll';
import React from 'react';
import { AnimatePresence } from 'framer-motion';

// Components

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div
        className={`relative flex flex-col px-4  md:px-8 lg:px-16 py-12 dark:bg-black  `}
      >
        <SmoothScroll>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </SmoothScroll>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
