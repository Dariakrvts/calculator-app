import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightThemeColors, darkThemeColors } from './themeColors';

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const CustomThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return 'light'; // або встановіть тему за замовчуванням залежно від уподобань системи користувача або іншої логіки
  };

  const [mode, setMode] = useState(getInitialTheme());

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', newMode);
    setMode(newMode);
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightThemeColors : darkThemeColors),
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
