import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#444',
          fontSize: '1.6rem',
          color: 'white',
          display: 'flex',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: '#666',
          },
        },
      },
    },
        MuiTextField: {
          styleOverrides: {
            root: {
              backgroundColor: '#fff',
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
