import './App.css';
import Container from './Container/Calculator';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/index';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );
};

export default App;
