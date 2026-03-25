import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import App from './App.tsx';

const system = createSystem(defaultConfig, {
  globalCss: {
    '*': {
      borderColor: 'transparent',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'inherit' },
        body: { value: 'inherit' },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
