import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/MainLayout';

export const metadata: Metadata = {
  title: 'K LE DORTZ',
  description:
    'K LE DORTZ , a french colorist bringing colors and artistic visions for a handful years.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Layout> {children} </Layout>
      </body>
    </html>
  );
}
