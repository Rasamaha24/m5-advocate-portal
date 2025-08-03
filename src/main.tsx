import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import App from './App.tsx'
import './index.css'

// Add debugging for production deployment
console.log('App initializing...', {
  environment: import.meta.env.MODE,
  timestamp: new Date().toISOString()
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found!');
  throw new Error('Failed to find root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light">
      <App />
    </ThemeProvider>
  </StrictMode>
);
