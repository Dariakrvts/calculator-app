import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CustomThemeProvider } from './context/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </React.StrictMode>
);
