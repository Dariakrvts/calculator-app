import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Backspace } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
import './Calculator.css';
// import * as math from 'mathjs';

const Calculator = () => {
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
    if (operator === '') {
      setFirstNumber(firstNumber + number);
    } else {
      setSecondNumber(secondNumber + number);
    }
  };

  const handleOperatorClick = (operator) => {
    if (result !== '') {
      setFirstNumber(result);
      setSecondNumber('');
      setResult('');
    }
    setOperator(operator);
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
  
  return (
    <div className='calculator'>
      <Grid item xs={12}>
        <button>ffff</button>
        <Typography variant="h4" component="div">
          {firstNumber} {operator} {secondNumber}
        </Typography>
        <Typography variant="h2" component="div">
          {result}
        </Typography>
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Button onClick={() => handleClearClick()}>C</Button>
        </Grid>
        <Grid item xs={3}>
          <Button>
            <HistoryIcon />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('%')}>%</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('/')}>/</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('1')}>1</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('2')}>2</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('3')}>3</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('*')}>*</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleNumberClick('4')}>4</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('5')}>5</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleNumberClick('6')}>6</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('+')}>+</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('7')}>7</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('8')}>8</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleNumberClick('9')}>9</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleOperatorClick('-')}>-</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleOperatorClick('.')}>.</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleNumberClick('0')}>0</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleEqualClick()}>=</Button>
        </Grid>
        <Grid item xs={3}>
          <Button
          // onClick={removeLastCharacter}
          >
            {' '}
            <Backspace />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Calculator;
