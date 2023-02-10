let displayNumber = '0';
let num1 = null;
let num2 = null;
let op1 = null;
let op2 = null;
let result = null;
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
});

function getDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayNumber;
    if(displayNumber.length > 9) {
        display.innerText = displayNumber.substring(0, 9);
    }
}

function operate(x, y, op) {
    if(op === '+') {
        return x + y;
    } else if(op === '-') {
        return x - y;
    } else if(op === '*') {
        return x * y;
    } else if(op === '/') {
        return x/y;
    }
}

function clear() {
    displayNumber = '0';
    num1 = null;
    num2 = null;
    op1 = null;
    op2 = null;
    result = null;
}

function equalF() {
    if(op1 === null) {
        displayNumber = displayNumber;
    } else if(op2 != null) {
        num2 = displayNumber;
        result = operate(Number(num1), Number(num2), op2);
        if(result === 'error') {
            displayNumber = 'error';
        } else {
            displayNumber = routine(result, 15).toString();
            num1 = displayNumber;
            num2 = null;
            op1 = null;
            op2 = null;
            result = null;
        }
    } else {
        num2 = displayNumber;
        result = operate(Number(num1), Number(num2), op1);
        if(result === 'error') {
            displayNumber = 'error';
        } else {
            displayNumber = routine(result, 15).toString();
            num1 = displayNumber;
            num2 = null;
            op1 = null;
            op2 = null;
            result = null;
        }
    }
}

function decimalF(sign) {
    if(displayNumber === num1 || displayNumber === num2) {
        displayNumber = '0';
        displayNumber += sign;
    } else if(!displayNumber.includes(sign)) displayNumber += sign;
}

function numberF(number) {
    if(op1 === null) {
        if(displayNumber === '0' || displayNumber === 0) {
            displayNumber = number;
        } else if(displayNumber === num1) {
            displayNumber = number;
        } else {
            displayNumber += number;
        }
    } else {
        if(displayNumber === num1) {
            displayNumber = number;
        } else {
            displayNumber += number;
        }
    }
}

function operatorF(operator) {
    if(op1 != null && op2 === null) {
        op2 = operator;
        num2 = displayNumber;
        result = operate(Number(num1), Number(num2), op1);
        displayNumber = routine(result, 15).toString();
        num1 = displayNumber;
        result = null;
    } else if(op1 != null && op2 != null) {
        num2 = displayNumber;
        result = operate(Number(num1), Number(num2), op2);
        op2 = operator;
        displayNumber = routine(result, 15).toString();
        num1 = displayNumber;
        result = null;
    } else { 
        op1 = operator;
        num1 = displayNumber;
    }
}

function select() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('number')) {
                numberF(buttons[i].value);
                getDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                operatorF(buttons[i].value);
            } else if(buttons[i].classList.contains('equal')) {
                equalF();
                getDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                decimalF(buttons[i].value);
                getDisplay();
            }else if(buttons[i].classList.contains('clear'))
                clear();
                getDisplay();
        }
    )}
}

function routine(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

getDisplay();
select();
