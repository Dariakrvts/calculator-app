import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Backspace } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState(null);
  const [currentOperand, setCurrentOperand] = useState(null);
  const [prevOperand, setPrevOperand] = useState(null);

  function onButtonClick(e) {
    const buttonText = e.target;
  
    if (buttonText === "C") {
      setInput("0");
      setOperator(null);
      setCurrentOperand(null);
      setPrevOperand(null);
    } else if (buttonText === "del") {
      setInput(input.slice(0, -1));
    } else if (buttonText === "+/-") {
      setInput((parseFloat(input) * -1).toString());
    } else if (buttonText === ".") {
      if (input.includes(".")) {
        return;
      } else {
        setInput(input + ".");
      }
    } else if (buttonText === "=" || operator) {
      const parsedInput = parseFloat(input);
      if (currentOperand === null) {
        setCurrentOperand(parsedInput);
      } else if (operator) {
        if (operator === "*") {
          setPrevOperand(prevOperand * parsedInput);
        } else if (operator === "/") {
          setPrevOperand(prevOperand / parsedInput);
        } else if (operator === "+") {
          setPrevOperand(prevOperand + parsedInput);
        } else if (operator === "-") {
          setPrevOperand(prevOperand - parsedInput);
        }
      }
      setOperator(buttonText);
      setInput(prevOperand.toString());
      setCurrentOperand(null);
    } else {
      // Number button
      setInput(input === "0" ? buttonText : input + buttonText);
  }
  }

  // const handleButtonClick = (value) => {
  //   setInput(input + value);
  // };

  // const removeLastCharacter = () => {
  //   setInput(input.slice(0, -1));
  // };

  // const calculateResult = () => {
  //   try {
  //     const operators = ['+', '-', '*', '/', '.', '%'];
  //     let currentNumber = '';
  //     let total = 0;
  //     let operator = '+';

  //     const operands = [];
  //     for (let i = 0; i < input.length; i++) {
  //       const char = input[i];

  //       if (operators.includes(char)) {
  //         operands.push(parseFloat(currentNumber));
  //         operands.push(char);
  //         currentNumber = '';
  //       } else {
  //         currentNumber += char;
  //       }
  //     }
  //     operands.push(parseFloat(currentNumber));

  //     for (let i = 0; i < input.length; i++) {
  //       const token = operands[i];
  //       if (operators.includes(token)) {
  //         operator = token;
  //       } else {
  //         total = calculateTotal(total, token, operator);
  //       }
  //     }
  //     setResult(total);
  //   } catch (error) {
  //     setResult('Error');
  //   }
  // };
  // const calculatePercentage = () => {
  //   if (!isNaN(result)) {
  //     setResult(result / 100);
  //   }
  // };
  // const calculateTotal = (total, number, operator) => {
  //   switch (operator) {
  //     case '+':
  //       return total + number;
  //     case '-':
  //       return total - number;
  //     case '*':
  //       return total * number;
  //     case '/':
  //       return total / number;
  //     case '%':
  //       return total % number;
  //     default:
  //       return total;
  //   }
  // };

  // const handleEqualsClick = () => {
  //   calculateResult();
  // };

  // const handleClearClick = () => {
  //   setInput('');
  //   setResult('');
  //   // setIsEqualPressed(false);
  // };

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
          <Button onClick={(e) => onButtonClick(e)}>C</Button>
        </Grid>
        <Grid item xs={3}>
          <Button>
            <HistoryIcon />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={(e) => onButtonClick(e)}>%</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('/')}>/</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('1')}>1</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('2')}>2</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('3')}>3</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('*')}>*</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => onButtonClick('4')}>4</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('5')}>5</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => onButtonClick('6')}>6</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('+')}>+</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('7')}>7</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('8')}>8</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('9')}>9</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => onButtonClick('-')}>-</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick('.')}>.</Button>
        </Grid>
        <Grid item xs={3}>
          {' '}
          <Button onClick={() => onButtonClick('0')}>0</Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => onButtonClick()}>=</Button>
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
