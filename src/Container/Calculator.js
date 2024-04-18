import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Box, Button, IconButton } from '@mui/material';
import { Switch } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '../context/themeContext';
import { Backspace } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
import './Calculator.css';
import '../App';
// import * as math from 'mathjs';

const Calculator = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [firstNumber, setFirstNumber] = React.useState('');
  const [secondNumber, setSecondNumber] = React.useState('');
  const [operator, setOperator] = React.useState('');
  const [result, setResult] = React.useState('');

  const handleNumberClick = (number) => {
    if (result !== '') {
      setFirstNumber(result);
      setSecondNumber('');
      setResult('');
    }
    if (number === '.' && (operator === '' || secondNumber === '')) {
      if ((operator === '' && !firstNumber.includes('.')) || (operator !== '' && !secondNumber.includes('.'))) {
        if (operator === '') {
          setFirstNumber(firstNumber + number);
        } else {
          setSecondNumber(secondNumber + number);
        }
      }
    } else {
      if (operator === '') {
        setFirstNumber(firstNumber + number);
      } else {
        setSecondNumber(secondNumber + number);
      }
    }
  };

  const handleOperatorClick = (operator) => {
    if (result !== '') {
      setFirstNumber(result);
      setSecondNumber('');
      setResult('');
    }
    if (operator === '%') {
      setResult((parseFloat(firstNumber) * 0.01).toString());
      setFirstNumber('');
      setSecondNumber('');
      setOperator('');
    } else {
      setOperator(operator);
    }
  };

  const handleEqualClick = () => {
    if (secondNumber === '') {
      setResult(firstNumber);
      return;
    }

    const firstNum = parseFloat(firstNumber);
    const secondNum = parseFloat(secondNumber);
    let resultNum;

    switch (operator) {
      case '+':
        resultNum = firstNum + secondNum;
        break;
      case '-':
        resultNum = firstNum - secondNum;
        break;
      case '*':
        resultNum = firstNum * secondNum;
        break;
      case '/':
        resultNum = firstNum / secondNum;
        break;
      case '%':
        resultNum = firstNum * (secondNum / 100);
        break;
      default:
        break;
    }

    setResult(resultNum.toString());
  };

  const handleClearClick = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperator('');
    setResult('');
  };

  const removeLastCharacter = () => {
    if (operator === '') {
      setFirstNumber(firstNumber.slice(0, -1));
    } else if (secondNumber !== '') {
      setSecondNumber(secondNumber.slice(0, -1));
    } else {
      setOperator(operator.slice(0, -1));
    }
  };

  const handleThemeChange = () => {
    toggleTheme();
    const newMode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', newMode);
    console.log(newMode, ' MODE');
  };

  return (
    <Box 
      className="calculator"
      sx={{
        bgcolor: 'background.default', 
        height: '100vh'
      }}
    >
      <Switch
        // checked={mode}
        onChange={handleThemeChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" component="div">
            {firstNumber} {operator} {secondNumber}
          </Typography>
          <Typography variant="h2" component="div">
            {result}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <Button onClick={() => handleClearClick()} variant="contained">
            C
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained">
            <HistoryIcon />
          </Button>
        </Grid>
        <Grid item >
          <Button onClick={() => handleOperatorClick('%')} variant="contained">
            %
          </Button>
        </Grid>
        <Grid item >
          <Button onClick={() => handleOperatorClick('/')} variant="contained">
            /
          </Button>
        </Grid>
        <Grid item >
          <Button onClick={() => handleNumberClick('1')} variant="contained">
            1
          </Button>
        </Grid>
        <Grid item >
          <Button onClick={() => handleNumberClick('2')} variant="contained">
            2
          </Button>
        </Grid>
        <Grid item >
          <Button onClick={() => handleNumberClick('3')} variant="contained">
            3
          </Button>
        </Grid>
        <Grid item >
          <Button onClick={() => handleOperatorClick('*')} variant="contained">
            *
          </Button>
        </Grid>
        <Grid item >
          {' '}
          <Button onClick={() => handleNumberClick('4')} variant="contained">
            4
          </Button>
        </Grid>
        <Grid item >
          <Button onClick={() => handleNumberClick('5')} variant="contained">
            5
          </Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleNumberClick('6')} variant="contained">
            6
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('+')} variant="contained">
            +
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('7')} variant="contained">
            7
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('8')} variant="contained">
            8
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('9')} variant="contained">
            9
          </Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleOperatorClick('-')} variant="contained">
            -
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('.')} variant="contained">
            .
          </Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleNumberClick('0')} variant="contained">
            0
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={removeLastCharacter} variant="contained">
            <Backspace />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleEqualClick()} variant="contained">
            =
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;
