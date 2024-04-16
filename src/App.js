import './App.css';
import Container from './Container/Calculator';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/index';
import * as React from 'react';
import { Paper } from '@mui/material';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} sx={{ height: '100vh' }} square>
        <Container />
      </Paper>
    </ThemeProvider>
  );
}
