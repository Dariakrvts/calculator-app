import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Backspace } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isEqualPressed, setIsEqualPressed] = useState(false);

  const handleButtonClick = (value) => {
    setInput(input + value);
  };
  const removeLastCharacter = () => {
    setInput(input.slice(0, -1));
  };
  const calculateResult = () => {
    try {
      const operators = ['+', '-', '*', '/'];
      let currentNumber = '';
      let total = 0;
      let operator = '+';

      for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (operators.includes(char)) {
          total = calculateTotal(total, parseFloat(currentNumber), operator);
          currentNumber = '';
          operator = char;
        } else {
          currentNumber += char;
        }
      }

      total = calculateTotal(total, parseFloat(currentNumber), operator);
      setResult(total);
    } catch (error) {
      setResult('Error');
    }
  };
  const calculatePercentage = () => {
    if (!isNaN(result)) {
      setResult(result / 100);
    }
  };
  const calculateTotal = (total, number, operator) => {
    switch (operator) {
      case '+':
        return total + number;
      case '-':
        return total - number;
      case '*':
        return total * number;
      case '/':
        return total / number;
        case '%':
          return total % number;
      default:
        return total;
    }
  };

  const handleEqualsClick = () => {
    calculateResult();
  };

  const handleClearClick = () => {
    setInput('');
    setResult('');
    setIsEqualPressed(false);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="previous-operand">Result: {result}</div>
        <div className="current-operand">
          <TextField type="text" value={input} readOnly />
        </div>
      </div>
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
          <Button onClick={() => calculatePercentage()}>%</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('/')}>/</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('1')}>1</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('2')}>2</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('3')}>3</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('*')}>*</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleButtonClick('4')}>4</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('5')}>5</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleButtonClick('6')}>6</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('+')}>+</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('7')}>7</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('8')}>8</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleButtonClick('9')}>9</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleButtonClick('-')}>-</Button>
        </Grid>
        <Grid item xs={3}>
          <Button>.</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => handleButtonClick('0')}>0</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => handleEqualsClick()}>=</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={removeLastCharacter}>
            {' '}
            <Backspace />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Calculator;
