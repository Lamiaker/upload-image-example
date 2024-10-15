import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.css';


const theme = createTheme({
  /** Put your mantine theme override here */
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <App />
    </MantineProvider>
  </StrictMode>,
)
