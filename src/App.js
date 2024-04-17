import './App.css';
import Container from './Container/Calculator';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/index';
import * as React from 'react';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );
}
