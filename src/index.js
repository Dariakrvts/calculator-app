import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CustomThemeProvider } from './theme/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);
