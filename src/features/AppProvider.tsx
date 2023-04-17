'use client';

import { ThemeProvider } from '@material-tailwind/react';
export type AppProvider = {
  children: React.ReactNode;
};
const AppProvider: React.FC<AppProvider> = ({ children }) => {
  return <ThemeProvider>{children} </ThemeProvider>;
};

export default AppProvider;
