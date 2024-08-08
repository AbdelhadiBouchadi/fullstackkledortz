import './globals.css';
import AdminHeader from '@/components/AdminHeader';
import { cn } from '@/lib/utils';
import { Plus_Jakarta_Sans } from 'next/font/google';
import React from 'react';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        'min-h-screen bg-dark-300 font-sans antialiased text-dark-700',
        jakarta.variable
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}
