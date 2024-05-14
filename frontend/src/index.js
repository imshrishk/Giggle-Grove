import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Ensure this file exists
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root container and initialize the root
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance of the app
reportWebVitals(console.log);