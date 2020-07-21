class Calculator {

  //Constructor with default values
  constructor(){
    this.displayValue  = '';
    this.memoryValue   = [];
    this.parenthesis   = 0;
  }

  //Displaying digits [0-9] based on first or second operand
  inputDigit(value) {
    this.displayValue = (this.displayValue === '0') ? value : this.displayValue + value;
  }

  //Using javascript Eval function to evaluate the expression
  calculate() {
    var exp      = this.displayValue,
        size     = this.displayValue.length,
        lastChar = this.displayValue.charAt(size);

    if(isNaN(lastChar) && lastChar != ')' && lastChar != '!')   {
      this.displayValue ='syntax err';
    } else if(this.parenthesis !=0 ){
      this.displayValue ='parenthesis err';
    } else {
      this.displayValue = eval(exp);
    }
  }

  //Reset Calculator - Remove all characters in display
  reset() {
    this.displayValue = '0';
    this.parenthesis = 0;
  }

  //Remove the last character in the display
  backspace() {
    var size = this.displayValue.length;
    this.displayValue = this.displayValue.substring(0,size-1);
  }

  //For complex operations, replace its corresponsing Math func name in display
  handleComplex(op) {
    this.parenthesis++;
    var temp;
    switch(op) {
      case '!'   : temp = 'fact('; break;
      case '^'   : temp = 'Math.pow(b,p'; break; 
      // b - base, p - power //User must backspace b,p and enter base and power values
      // Not efficient - needs improvement
      case 'sin' : temp = 'Math.sin('; break;
      case 'cos' : temp = 'Math.cos('; break;
      case 'tan' : temp = 'Math.tan('; break;
    }
    this.displayValue = (this.displayValue === '0') ? temp : this.displayValue + temp;
  }

  //Handle counter values
  handleBracket(bracket){
    this.displayValue  = (this.displayValue == '0') ? bracket : this.displayValue + bracket;
    switch(bracket) {
      case '(' :  this.parenthesis++; break;
      case ')' :  this.parenthesis--; break;
    }
  }

  //Memory Operations
  handleMemory(operation) {
    var arrLen = this.memoryValue.length;
    if (operation === 'MC') {
      //Memory Clear
      this.memoryValue = [];
    } else if (operation === 'M+') {
      //Add to Memory
      this.memoryValue.push(parseFloat(this.displayValue));
    } else if (operation === 'M-') {
      //Remove from Memory
      this.memoryValue.pop(parseFloat(this.displayValue));
    } else if (operation === 'MR') {
      //Read Memory
      this.displayValue = this.memoryValue[arrLen-1] || 'Memory Empty';
    }

  }
  
  //Update Display with global displayValue after every operation
  updateDisplay() {
    const display = document.querySelector('.display-screen');
    display.value = this.displayValue;
  }

}

// Finding Factorial
function fact(num) {
  factvar = 1;
  for (i = 1; i <= num; i++) {
    factvar = factvar * i;
  }
  return factvar;
}


//Initiate the Calculator Display with Default values
let calc = new Calculator();
calc.updateDisplay();

//Event Listeners to Calculator's Button Clicks 
const btns = document.querySelector('.buttons');

//Event Delegation
btns.addEventListener('click', (event) => {
  const { target } = event;  // Targetting the clicked button
        classes    = target.classList;  

  //When the click is not on button, exit the function.
  if (!target.matches('button')) {
    return;
  }

  //When Reset[AC] button is clicked 
  if (classes.contains('reset')) {
    calc.reset();
    calc.updateDisplay();
    return;
  }

  //When BackspacE[<<] button is clicked 
  if (classes.contains('back')) {
    calc.backspace();
    calc.updateDisplay();
    return;
  }

  //When Equal[=] button is clicked 
  if (classes.contains('equal-sign')) {
    calc.calculate();
    calc.updateDisplay();
    return;
  }

  //When  button is clicked 
  if (classes.contains('complex')) {
    calc.handleComplex(target.value);
    calc.updateDisplay();
    return;
  }

  if (classes.contains('expression')) {
    calc.handleBracket(target.value);
    calc.updateDisplay();
    return;
  }


  //When Memory[MC, M+, M-, MR] button is clicked 
  if (classes.contains('memory')) {
    calc.handleMemory(target.value);
    calc.updateDisplay();
    return;
  }


  //When clicked on digits
  calc.inputDigit(target.value);
  calc.updateDisplay();
});
