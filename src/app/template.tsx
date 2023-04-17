'use client';

import { ThemeProvider } from '@material-tailwind/react';
import { Toaster } from 'react-hot-toast';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
