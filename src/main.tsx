import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import App from './App.tsx'
import './index.css'
import { debugInfo, setupErrorHandling } from './debug'

// Setup error handling for production debugging
setupErrorHandling();

// Add debugging for production deployment
console.log('App initializing...', {
  environment: import.meta.env.MODE,
  timestamp: new Date().toISOString()
});

// Log debug info in production
if (import.meta.env.PROD) {
  debugInfo();
}

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
