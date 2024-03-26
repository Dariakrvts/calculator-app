import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { Button } from '../baseComponents/Button';
import { Backspace } from '@mui/icons-material';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (e) => {
    setInput(input + e.target.value);
  };

  const calculateResult = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const removeLastCharacter = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="previous-operand">Result: {result}</div>
        <div className="current-operand">
          <TextField type="text" value={input} readOnly />
        </div>
      </div>
      <div className="buttons">
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Button onClick={clearInput}>
              C
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleInput} value={'/'}>
              ÷
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleInput} value={'*'}>
              *
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'-'}>
              -
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'9'}>
              9
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleInput} value={'8'}>
              8
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'7'}>
              7
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'+'}>
              +
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'6'}>
              6
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'5'}>
              5
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'4'}>
              4
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'3'}>
              3
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'2'}>
              2
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'1'}>
              1
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'.'}>
              .
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleInput} value={'0'}>
              0
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={removeLastCharacter}>
              <Backspace />
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={calculateResult}>
              =
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Calculator;
