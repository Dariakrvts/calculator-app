import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightThemeColors, darkThemeColors } from '../utils/themeColors';

const ThemeContext = createContext ()

export const useThemeContext = () => { //створення хука для контекста
  const context = useContext(ThemeContext);// отримання значення контексту
  if (context === undefined) { // перевірка чи визначений контекст
    throw new Error('useThemeContext must be used within a ThemeProvider'); //показ помили якщо контект не визначений
  }
  return context; //повернння значення контексту
};

export const CustomThemeProvider = ({ children }) => { //обгортка для контексту
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('themeMode'); // отримання збереженої теми з локал сторедж
    if (savedTheme === 'light' || savedTheme === 'dark') { // перевірка яка тема збережена
      return savedTheme;
    }
    return 'light';
  };

  const [mode, setMode] = useState(getInitialTheme()); //стан для збереження теми

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'; //визначення нової теми
    localStorage.setItem('themeMode', newMode); //збереження нової теми
    setMode(newMode);// оновлення стану
  };
  
  const theme = createTheme({ //створення теми з використанням бібліотеки муі
    palette: {
      mode,
      ...(mode === 'light' ? lightThemeColors : darkThemeColors),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderColor: '#FFFFFF',
            fontSize: '2.4rem',
            width: '100%',
            height: '100%',
            borderRadius: '24px',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 7,
            '& .MuiSwitch-track': {
              borderRadius: 16,
              backgroundColor:'#FFFFFF',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
              },
              '&::before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                  '#4B5EFC'
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
                left: 10,
              },
              '&::after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                  '#4B5EFC'
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                right: 10,
              },
            },
            '& .MuiSwitch-thumb': {
              // boxShadow: 'none',
              color:'#D2D3DA',
              width: 16,
              height: 16,
              margin: 2,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}> {/*дає доступ до зем та можливості зміни теми */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider> {/*оточує всі дочірні компоненти. отрімую зем як властивість. завдяки цьому всі компоненти які підтримуються мають доступ до теми */}
    </ThemeContext.Provider>
  );
};
