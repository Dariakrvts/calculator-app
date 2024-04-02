import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // backgroundColor: '#D2D3DA',
          fontSize: '1.6rem',
          color: 'black',
          display: 'flex',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: '#4E505F',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#4E505F',
          color: 'white',
          display: 'flex',
          minWidth: '90px',
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: '#D2D3DA',
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default theme;
