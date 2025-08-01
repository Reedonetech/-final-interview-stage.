'use client';
import { Navbar } from '@/components/Navbar';
import './globals.css';
import { ReactQueryProvider } from './QueryClientProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Navbar/>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}