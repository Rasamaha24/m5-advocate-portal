import React from 'react';

// Debug utility for production deployment issues
export const debugInfo = () => {
  const info = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    origin: window.location.origin,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    referrer: document.referrer,
    mode: import.meta.env.MODE,
    env: import.meta.env,
    reactVersion: React.version,
    domReady: document.readyState,
    scripts: Array.from(document.scripts).map(s => s.src).filter(Boolean),
    stylesheets: Array.from(document.styleSheets).map(s => s.href).filter(Boolean),
    errors: []
  };
  
  console.log('🐛 Debug Info:', info);
  return info;
};

// Global error handler
export const setupErrorHandling = () => {
  window.addEventListener('error', (event) => {
    console.error('🚨 Global Error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled Promise Rejection:', event.reason);
  });
};

// React import for version check
declare global {
  interface Window {
    debugInfo: typeof debugInfo;
  }
}

// Make debug function globally available
if (typeof window !== 'undefined') {
  window.debugInfo = debugInfo;
}