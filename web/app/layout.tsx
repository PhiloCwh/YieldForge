import './globals.css';
import { type ReactNode } from 'react';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast'
import Header from "@/components/ui/header";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YieldForge'
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <Header></Header>
          <div>
            <div className='pt-[100px] pl-[24px] pr-[24px]'>
              {props.children}
            </div>
          </div>
        </Providers>
        <Toaster position="top-center" toastOptions={{
          className: '',
        }}></Toaster>
      </body>
    </html>
  );
}
