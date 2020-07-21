//Global Object - To store state of the calculator application
const calculator = {
  displayValue          : '0',
  memoryValue           : 0,
  operator              : null,
  firstOperand          : null,
  twoOperandsAvailable  : false
};

//Displaying digits [0-9] based on first or second operand
function inputDigit(digit) {
  //destructuring assignment
  const { displayValue, twoOperandsAvailable } = calculator;

  if (twoOperandsAvailable) {
    calculator.displayValue = digit;
    calculator.twoOperandsAvailable = false;
  } else {
    calculator.displayValue = (displayValue === '0') ? digit : displayValue + digit;
  }
}

//Displaying decimal based on first or second operand
function inputDecimal(point) {
  if (calculator.twoOperandsAvailable) {
    calculator.displayValue = "0."
    calculator.twoOperandsAvailable = false;
    return;
  }

  if (!calculator.displayValue.includes(point)) {
    calculator.displayValue += point;
  }
}

//Handling Arithmetic Operations
function handleOperator(nextOperator) {
  //destructuring assignment
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.twoOperandsAvailable) {
    calculator.operator = nextOperator;
    return;
  }
  
  //Only One Operand 
  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    // Two Operands Available 
    const result = evaluate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.twoOperandsAvailable = true;
  calculator.operator = nextOperator;
}

//Evaluating the result of operation
function evaluate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }


  return secondOperand;
}

//Reset Calculator
function reset() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.twoOperandsAvailable = false;
  calculator.operator = null;
}

//Memory Operations
function handleMemory(operation) {
  if (operation === 'MC') {
    //Memory Clear
    calculator.memoryValue = 0;
  } else if (operation === 'M+') {
    //Add to Memory
    calculator.memoryValue = calculator.memoryValue + parseFloat(calculator.displayValue);
  } else if (operation === 'M-') {
    //Remove from Memory
    calculator.memoryValue = calculator.memoryValue - parseFloat(calculator.displayValue);
  } else if (operation === 'MR') {
    //Read Memory
    calculator.displayValue = calculator.memoryValue;
  }

  calculator.twoOperandsAvailable = true;
}

function handleTrignometry(operation) {
  let updatedValue,
      PI = Math.PI,
      inputValue = calculator.displayValue;

  switch(operation) {
    case 'sin' : updatedValue = Math.sin(inputValue * PI / 180); break;
    case 'cos' : updatedValue = Math.cos(inputValue * PI / 180); break;
    case 'tan' : updatedValue = Math.tan(inputValue * PI / 180); break;
  }

  //Display maximum of 8 decimal digits
  calculator.displayValue = updatedValue.toFixed(8);
  calculator.twoOperandsAvailable = true; // To avoid display holding the result during the next button click
}

//Update Display with global displayValue after every operation
function updateDisplay() {
  const display = document.querySelector('.display-screen');
  display.value = calculator.displayValue;
}

//Initiate the Calculator Display with Default value as 0
updateDisplay();

//Event Listeners to Calculator's Button Clicks 
const btns = document.querySelector('.buttons');

//Event Delegation
btns.addEventListener('click', (event) => {
  const { target } = event; // Targetting the clicked button

  //When the click is not on button, exit the function.
  if (!target.matches('button')) {
    return;
  }

  //When operator[+, - , *, /] button is clicked 
  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  //When decimal[.] button is clicked 
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  //When Reset[AC] button is clicked 
  if (target.classList.contains('reset')) {
    reset();
    updateDisplay();
    return;
  }

  //When Memory[MC, M+, M-, MR] button is clicked 
  if (target.classList.contains('memory')) {
    handleMemory(target.value);
    updateDisplay();
    return;
  }

  //When Trignometry Operation[sin, cos, tan] button is clicked 
  if (target.classList.contains('trig')) {
    handleTrignometry(target.value);
    updateDisplay();
    return;
  }


  //When clicked on digits
  inputDigit(target.value);
  updateDisplay();
});