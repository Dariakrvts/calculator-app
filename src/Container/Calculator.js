import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { Box, Button, IconButton } from '@mui/material';
import { Switch } from '@mui/material';
import { useThemeContext } from '../context/themeContext';
import { Backspace } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
import './Calculator.css';
import '../App';
// import { lightThemeColors, darkThemeColors } from '../utils/themeColors';
// import * as math from 'mathjs';

//функціональний компонент вякому йде решта коду калькулятора
const Calculator = () => {
  const { mode, toggleTheme } = useThemeContext(); //отримання значеь з земконтекст
  const [firstNumber, setFirstNumber] = useState(''); //стан для першого числа
  const [secondNumber, setSecondNumber] = useState(''); //стан для другого числа
  const [operator, setOperator] = useState(''); //стан для операторів
  const [result, setResult] = useState(''); //стан для результату
  const [switchChecked, setSwitchChecked] = useState(localStorage.getItem('themeMode') === 'dark'); //стан для перимикання теми
  const [history, setHistory] = useState([]); //стан для історії

  //рефакторінг зробити  функцію бля операторів щоб було меньше коду (НЕ терміново)
  //useEffect - хук. для отримання та встановлення історії
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    setHistory(storedHistory);
  }, []);

  //функція яка урізала код. далі викликаємо лише muthOperator та оголошуємо змінну resultNum
  const muthOperator = () => {
    const firstNum = parseFloat(firstNumber); //функція дозволяє змінити рядок в число результат зберігається в firstNum
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
        return 'ERR';
    }
    return resultNum;
  };

  // https://stackoverflow.com/questions/76915339/stringing-multiple-numbers-on-a-calcuator
  // const handleNumberClick = (number) => {
  //   if (result !== '') { // якщо є результат то встановлює його як перше число і складає його значення та результат
  //     setFirstNumber(result);
  //     setSecondNumber('');
  //     setResult('');
  //   }
  //     if (number === '.' && (operator === '' || secondNumber === '')) {
  //       if ((operator === '' && !firstNumber.includes('.')) || (operator !== '' && !secondNumber.includes('.'))) {//перевірка чи не встановлена вже крапка в перше або друге число або як оператор
  //         if (operator === '') {
  //           setFirstNumber(firstNumber + number);//якщо крапка порожня то додаємо її до першого числа
  //         } else {
  //           setSecondNumber(secondNumber + number);//додаємо до другого числа
  //         }
  //       }
  //     } else {
  //       if (operator === '') {
  //         setFirstNumber(firstNumber + number);
  //       } else {
  //         setSecondNumber(secondNumber + number);
  //       }
  //     }
  // };

  //функція яка приймає в себе аргумент (число)
  const handleNumberClick = (number) => {
    // if (result !== '') {
    //   setFirstNumber(result);
    //   setSecondNumber('');
    //   setResult('');
    // }

    if (operator === '') {
      //перевірка чи є пустим оператор
      setFirstNumber(firstNumber + number); //якщо так то додає число до першого
    } else {
      setSecondNumber(secondNumber + number); //якщо ні то додає число після оператору
    }
  };

  const handleOperatorClick = (newOperator) => {
    if (result !== '') {
      //якщо вже є результат то зберігає його при цьому обнуляя друге число
      setFirstNumber(result);
      setSecondNumber('');
      setResult('');
    }

    //має працювати при умові якщо вже щось напсано
    if (result === '' && secondNumber !== '' && firstNumber !== '' && operator !== '') {
    // const firstNum = parseFloat(firstNumber); //функція дозволяє змінити рядок в число результат зберігається в firstNum

      let resultNum = muthOperator(); // оголошення змінної з функцією яку було створено вище для запобігання збільшення коду
      setFirstNumber(resultNum.toString());
      setSecondNumber('');
      setResult('');
    }

    if (newOperator === '%') {
      // дописати що якщо є лише перше число то тоді використовується 1 відцоток
      if (!secondNumber) {
        setResult((parseFloat(firstNumber) * 0.01).toString());
        setFirstNumber('');
        setSecondNumber('');
        setOperator('');
      } else {
        // Якщо було введено обидва числа, то результатом буде відсоток першого числа за другим числом. 20% від 100
        setResult((parseFloat(firstNumber) * (parseFloat(secondNumber) / 100)).toString());
        setFirstNumber('');
        setSecondNumber('');
        setOperator('');
      }
    } else {
      setOperator(newOperator);
    }
  };

  const handleEqualClick = () => {
    if (secondNumber === '') {
      setResult(firstNumber);
      return;
    }

    let resultNum = muthOperator();
    setResult(resultNum.toString()); //претворення результату в рядок

    const operation = `${firstNumber} ${operator} ${secondNumber}`;
    const newHistory = [{ operation, result: resultNum }, ...history]; //новий запис в історії який складається з прикладу та результату
    const trimmedHistory = newHistory.slice(0, 20); //обмеження кількості записів в історії
    setHistory(trimmedHistory); //обновление состояние истории
    localStorage.setItem('calculatorHistory', JSON.stringify(trimmedHistory));
  };

  //очищення всієї робочої області
  const handleClearClick = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperator('');
    setResult('');
  };

  //вмдалення останнього символа
  const removeLastCharacter = () => {
    if (operator === '') {
      setFirstNumber(firstNumber.slice(0, -1));
    } else if (secondNumber !== '') {
      setSecondNumber(secondNumber.slice(0, -1));
    } else {
      setOperator(operator.slice(0, -1));
    }
  };

  useEffect(() => {
    const themeMode = localStorage.getItem('themeMode'); //отримання поточної теми з локального сховища
    if (themeMode) {//якщо тему знайдено то йдемо в тіло іфа
      setSwitchChecked(themeMode === 'dark'); // встаноьвлення відповідного значення перемикача
    }
  }, []);

  const handleThemeChange = () => {
    toggleTheme(); //зміна теми
    const newMode = mode === 'light' ? 'dark' : 'light'; //визначення нового режиму теми
    localStorage.setItem('themeMode', newMode); //збереження
    setSwitchChecked((prev) => !prev); //зміна перемикача
  };

  return (
    <Box //використання стилів саме тут через більші можливості пов'язані з бібліотекою
      className="calculator"
      sx={{
        bgcolor: 'background.default',
        height: '100vh',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '60px' }}>
        <Switch
          color="secondary"
          checked={switchChecked}
          onChange={handleThemeChange} // функція, яка викликається при зміні стану перемикача
          inputProps={{ 'aria-label': 'controlled' }} // використовується для передачі додаткових властивостей. aria-label керується ззовні
        />
      </Box>
      <Box className="button">
        <Grid container>
          <Grid item xs={12} minHeight="100px" textAlign="right">
            <Typography color="graytext" variant="h5">
              {firstNumber} {operator} {secondNumber}
            </Typography>
            <Typography color="secondary" variant="h3">
              {result}
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Button onClick={() => handleClearClick()} variant="contained" color="grey">
                C
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="grey">
                <HistoryIcon />
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleOperatorClick('%')} variant="contained" color="grey">
                %
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleOperatorClick('/')} variant="contained" color="violet">
                /
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('1')} variant="contained" color="white">
                1
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('2')} variant="contained" color="white">
                2
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('3')} variant="contained" color="white">
                3
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleOperatorClick('*')} variant="contained" color="violet">
                *
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('4')} variant="contained" color="white">
                4
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('5')} variant="contained" color="white">
                5
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('6')} variant="contained" color="white">
                6
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleOperatorClick('+')} variant="contained" color="violet">
                +
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('7')} variant="contained" color="white">
                7
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('8')} variant="contained" color="white">
                8
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('9')} variant="contained" color="white">
                9
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleOperatorClick('-')} variant="contained" color="violet">
                -
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleOperatorClick('.')} variant="contained" color="white">
                .
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleNumberClick('0')} variant="contained" color="white">
                0
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={removeLastCharacter} variant="contained" color="white">
                <Backspace />
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => handleEqualClick()} variant="contained" color="violet">
                =
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Calculator;
