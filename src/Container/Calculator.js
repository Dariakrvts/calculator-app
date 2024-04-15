import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Switch } from '@mui/material';
import { Backspace } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import HistoryIcon from '@mui/icons-material/History';
import './Calculator.css';
// import * as math from 'mathjs';

const Calculator = () => {
  const theme = useTheme();
  const [firstNumber, setFirstNumber] = React.useState('');
  const [secondNumber, setSecondNumber] = React.useState('');
  const [operator, setOperator] = React.useState('');
  const [result, setResult] = React.useState('');

  // const getDesignTokens = (mode: PaletteMode) => ({
  //   palette: {
  //     mode,
  //     ...(mode === 'light'
  //       ? {
  //           // palette values for light mode
  //           primary: amber,
  //           divider: amber[200],
  //           text: {
  //             primary: grey[900],
  //             secondary: grey[800],
  //           },
  //         }
  //       : {
  //           // palette values for dark mode
  //           primary: deepOrange,
  //           divider: deepOrange[700],
  //           background: {
  //             default: deepOrange[900],
  //             paper: deepOrange[900],
  //           },
  //           text: {
  //             primary: '#fff',
  //             secondary: grey[500],
  //           },
  //         }),
  //   },
  // });
  
  const colorMode = theme.palette.mode;

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

  return (
    <div className="calculator">
      <Grid item xs={12}>
        <Switch />
        <Typography variant="h4" component="div">
          {firstNumber} {operator} {secondNumber}
        </Typography>
        <Typography variant="h2" component="div">
          {result}
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Button onClick={() => handleClearClick()} variant="contained">
            C
          </Button>
        </Grid>
        {/* <Grid item xs={3}>
          <Button variant="contained" color="ochrehorisontal">
            <HistoryIcon />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('%')} variant="contained" color="ochrehorisontal">
            %
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('/')} variant="contained" color={colorMode.light}>
            /
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('1')} variant="contained" color="ochre">
            1
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('2')} variant="contained" color="ochre">
            2
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('3')} variant="contained" color="ochre">
            3
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('*')} variant="contained" color="ochrevertical">
            *
          </Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleNumberClick('4')} variant="contained" color="ochre">
            4
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('5')} variant="contained" color="ochre">
            5
          </Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleNumberClick('6')} variant="contained" color="ochre">
            6
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('+')} variant="contained" color="ochrevertical">
            +
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('7')} variant="contained" color="ochre">
            7
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('8')} variant="contained" color="ochre">
            8
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('9')} variant="contained" color="ochre">
            9
          </Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleOperatorClick('-')} variant="contained" color="ochrevertical">
            -
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('.')} variant="contained" color="ochre">
            .
          </Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleNumberClick('0')} variant="contained" color="ochre">
            0
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={removeLastCharacter} variant="contained" color="ochre">
            <Backspace />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleEqualClick()} variant="contained" color="ochrevertical">
            =
          </Button>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Calculator;
