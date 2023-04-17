import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, matchRoutes, RouterProvider } from 'react-router-dom';

import { routes } from './App';

const theme = extendBaseTheme({
  components: {
    ...chakraTheme.components,
  },
});

hydrate();

async function hydrate() {
  // Determine if any of the initial routes are lazy
  const lazyMatches = matchRoutes(routes, window.location)?.filter((m) => m.route.lazy);

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy!();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      }),
    );
  }

  const router = createBrowserRouter(routes);

  ReactDOM.hydrateRoot(
    document.getElementById('app')!,
    <React.StrictMode>
      <ChakraBaseProvider theme={theme}>
        <RouterProvider router={router} fallbackElement={null} />
      </ChakraBaseProvider>
    </React.StrictMode>,
  );
}
