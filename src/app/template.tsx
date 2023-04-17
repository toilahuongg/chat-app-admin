'use client';

import { ThemeProvider } from '@material-tailwind/react';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
