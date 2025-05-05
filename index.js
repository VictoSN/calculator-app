const resultLabel = document.getElementById("resultLabel");

const plusButton = document.getElementById("plusButton");
const minusButton = document.getElementById("minusButton");
const divideButton = document.getElementById("divideButton");
const multiplyButton = document.getElementById("multiplyButton");
const equalButton = document.getElementById("equalButton");
const acButton = document.getElementById("acButton");
const deleteButton = document.getElementById("deleteButton");

const pointButton = document.getElementById("pointButton");
const zeroButton = document.getElementById("zeroButton");
const oneButton = document.getElementById("oneButton");
const twoButton = document.getElementById("twoButton");
const threeButton = document.getElementById("threeButton");
const fourButton = document.getElementById("fourButton");
const fiveButton = document.getElementById("fiveButton");
const sixButton = document.getElementById("sixButton");
const sevenButton = document.getElementById("sevenButton");
const eightButton = document.getElementById("eightButton");
const nineButton = document.getElementById("nineButton");

let currentInput = "0";         // current display value
let firstOperand = null;        // stores the first number
let operator = null;            // stores the current operation
let waitingForSecondOperand = false;    // to check for if second operand is inserted or not

function updateDisplay() {
    resultLabel.textContent = currentInput;
}

function clearAll() {
    currentInput = "0";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function inputDigit(digit) {
    if (waitingForSecondOperand) {    
        currentInput = digit;           // set second operation number
        waitingForSecondOperand = false;
    } else {    //check if the current input is 0, if yes replace with the digit
        currentInput = currentInput === "0" ? digit : currentInput + digit;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForSecondOperand) {
        // inputDigit set the second operand boolean to false, so only "." can trigger this
        currentInput = "0.";    // set for second operand, since it should be empty
        waitingForSecondOperand = false;    // set to false to skip this
        updateDisplay();
        return;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";    // if not second operand, just add as usual
        updateDisplay();
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);
    
    if (firstOperand === null) {    // if first operand is empty
        firstOperand = inputValue;  // store the value in the first operand
    } else if (operator) {          // if first operand already has a value, calculate the rest (calculate chaining)
        const result = calculate(firstOperand, inputValue, operator);
        firstOperand = result;
    }
    
    waitingForSecondOperand = true;
    currentInput = nextOperator;    // display the operator
    operator = nextOperator;
    updateDisplay();
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case "+":
            return firstOperand + secondOperand;
        case "-":
            return firstOperand - secondOperand;
        case "*":
            return firstOperand * secondOperand;
        case "/":
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function deleteLastDigit() {
    if (currentInput.length > 1) {  // if length bigger than 1, delete the number
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";         // else, replace with 0
    }
    updateDisplay();
}

zeroButton.addEventListener("click", () => inputDigit("0"));
oneButton.addEventListener("click", () => inputDigit("1"));
twoButton.addEventListener("click", () => inputDigit("2"));
threeButton.addEventListener("click", () => inputDigit("3"));
fourButton.addEventListener("click", () => inputDigit("4"));
fiveButton.addEventListener("click", () => inputDigit("5"));
sixButton.addEventListener("click", () => inputDigit("6"));
sevenButton.addEventListener("click", () => inputDigit("7"));
eightButton.addEventListener("click", () => inputDigit("8"));
nineButton.addEventListener("click", () => inputDigit("9"));

plusButton.addEventListener("click", () => handleOperator("+"));
minusButton.addEventListener("click", () => handleOperator("-"));
multiplyButton.addEventListener("click", () => handleOperator("*"));
divideButton.addEventListener("click", () => handleOperator("/"));
pointButton.addEventListener("click", inputDecimal);

equalButton.addEventListener("click", () => {
    if (firstOperand !== null && operator !== null) {
        const secondOperand = parseFloat(currentInput);
        const result = calculate(firstOperand, secondOperand, operator);
        currentInput = String(result);  // display result to user
        firstOperand = null;            //reset back
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
});

acButton.addEventListener("click", clearAll);

deleteButton.addEventListener("click", deleteLastDigit);

//keyboard support
document.addEventListener("keydown", (event) => {
    const key = event.key;          //stores the event in the key const
    
    if (/[0-9]/.test(key)) {        //if key is within the pattern, return true
        event.preventDefault();     //makes sure buttons does not do default action
        inputDigit(key);
    } 
    else if (key === "+" || key === "-" || key === "*" || key === "/") {
        event.preventDefault();
        handleOperator(key);
    } 
    else if (key === "=" || key === "Enter") {
        event.preventDefault();
        equalButton.click();
    } 
    else if (key === ".") {
        event.preventDefault();
        inputDecimal();
    } 
    else if (key === "Escape") {
        event.preventDefault();
        clearAll();
    } 
    else if (key === "Backspace") {
        event.preventDefault();
        deleteLastDigit();
    }
});