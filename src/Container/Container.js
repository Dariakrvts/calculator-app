import React from 'react';
import './calculator.css';
import SvgIcon from '@mui/material/SvgIcon';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Container = () => {
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

    return (
      <Stack>
        <HomeIcon /> 
        <Button variant="contained">Contained</Button>     
      </Stack>
    );
  }

export default Container;
