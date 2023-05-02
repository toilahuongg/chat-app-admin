import { ThemeProvider } from '@material-tailwind/react';
import { AccountProvider } from '@src/features/Account/providers';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import '@src/styles/globals.scss';
import { usePathname } from 'next/navigation';
import Sidebar from '@src/features/Sidebar';
import { useMemo } from 'react';
import { SWRConfig } from 'swr';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const pathname = usePathname();

  const children = useMemo(() => {
    if (pathname?.startsWith('/admin'))
      return (
        <div className="sectionWrapper">
          <div className="sidebar shadow-lg shadow-gray-300">
            <Sidebar />
          </div>
          <div className="main">
            <Component {...pageProps} />
          </div>
        </div>
      );
    return <Component {...pageProps} />;
  }, [pathname, Component, pageProps]);
  return (
    <>
      <ThemeProvider>
        <SWRConfig value={{ provider: () => new Map() }}>
          <AccountProvider>{children}</AccountProvider>
        </SWRConfig>
        <Toaster />
      </ThemeProvider>
    </>
  );
};
export default App;
