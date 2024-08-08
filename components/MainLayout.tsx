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
      <SmoothScroll>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </SmoothScroll>
    </ThemeProvider>
  );
};

export default Layout;
