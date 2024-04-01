import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E2F38',
          fontSize: '1.6rem',
          color: 'white',
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
                backgroundColor: '#fff',
              },
            },
          },
        }, 
  },
});

export default theme;
