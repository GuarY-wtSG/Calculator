document.getElementById('newInput').readonly = true;
let screen = document.getElementById('newInput');
let buttons = document.querySelectorAll('button');
let screenValue = "";

document.getElementById('answer').readonly = true;
let abvScreen = document.getElementById('answer');
let abvScreenValue = 0;

let operator = '+';
 //conditon variables
let deci = false;
let newEquation = false;
let changeOp = false;
 //bracket variables
let tempAbv = 0;
let tempOp = '';

for (item of buttons) {
    item.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;
        switch (buttonText) {
            case '1':
                buttonText = "1";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;
                break;
            case '2':
                buttonText = "2";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;
                break;
            case '3':
                buttonText = "3";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;;
                break;
            case '4':
                buttonText = "4";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;
                break;
            case '5':
                buttonText = "5";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;
                break;
            case '6':
                buttonText = "6";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;
                break;
            case '7':
                buttonText = "7";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;
                break;
            case '8':
                buttonText = "8";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;
                break;
            case '9':
                buttonText = "9";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;
                break;
            case '0':
                buttonText = "0";
                screenValue += buttonText;
                screen.value = screenValue;
                changeOp = false;
                break;
            case '.':
                if (!deci) {
                    buttonText = ".";
                    screenValue += buttonText;
                    screen.value = screenValue;
                    deci = true;
                    changeOp = false;
                }
                break;
            case '\u00F7':
                if(changeOp){
                    changeOperator('\u00F7');
                }else{
                    doMath('\u00F7');
                }
                changeOp = true;
                break;
            case 'x':
                if(changeOp){
                    changeOperator('x');
                }else{
                    doMath('x');
                }
                changeOp = true;
                break;
            case '-':
                if(changeOp){
                changeOperator('-');
                }else{
                doMath('-');
                }
                changeOp = true;
                break;
            case '+':
                if(changeOp){
                    changeOperator('+');
                }else{
                    doMath('+');
                }
                changeOp = true;
                break;
            case '%':
                if(changeOp){
                    changeOperator('%');
                }else{
                    doMath('%');
                }
                changeOp = true;
                break;
            case '=':
                doMath("=");
                break;
            case '(':
                tempAbv=abvScreenValue;
                tempOp=operator;
                abvScreenValue = 0;
                doneMath('(');
                break;
            case ')':
                doMath(')');
                if (tempOp == '+') {
                    abvScreenValue = tempAbv + abvScreenValue;
                } else if (tempOp == '-') {
                    abvScreenValue = tempAbv - abvScreenValue;
                } else if (tempOp == 'x') {
                    abvScreenValue = tempAbv * abvScreenValue;
                } else if (tempOp == '\u00F7') {
                    abvScreenValue = tempAbv / abvScreenValue;
                } 
                abvScreen.value += ')';
                tempAbv = 0;
                tempOp = '';
                break;
            case 'Clr':
                screenValue = '';
                screen.value = '';
                abvScreenValue = 0;
                abvScreen.value = '';
                operator='+';
                break;
            default:
                break;
        }
    });
}

function doMath(newOp) {
    if (newEquation) {abvScreen.value = ''; newEquation = false;}

    if (operator == '+') {
        abvScreenValue += Number(screenValue);
        doneMath(newOp);
    } else if (operator == '-') {
        abvScreenValue -= Number(screenValue);
        doneMath(newOp);
    } else if (operator == 'x') {
        console.log(abvScreenValue);
        abvScreenValue *= Number(screenValue);
        doneMath(newOp);
    } else if (operator == '\u00F7') {
        abvScreenValue /= Number(screenValue);
        doneMath(newOp);
    } else if (operator == '%') {
        abvScreenValue /= 100;
        doneMath(newOp);
    }/* else if(newOp == ')'){
        abvScreen.value += ')' + 'x' + ' ';
        operator = 'x';
    } */

    if (operator == '=') {
        abvScreen.value += abvScreenValue;
        abvScreenValue = 0;
        operator = '+';
        newEquation = true;
    }
    deci = false;
}

function doneMath(op){
    abvScreen.value += screenValue + " " + op + " ";
    screenValue = '';
    screen.value = '';
    if(op == ('(')){
        operator = '+';
    }else if(op == (')')){
        operator = 'x';
    }
    else{
        operator = op;
    }
}

//function for corrections when placing the wrong operator
function changeOperator(switchTo){
    let correction = abvScreen.value;
    abvScreen.value = correction.substr(0,abvScreen.value.length - 2) + switchTo + ' ';
    operator = switchTo;
}

document.addEventListener('keydown', (e) => {

    if (e.shiftKey == 57){
        e.key = "(";
    }
    else if(e.key == 106){
        e.key = "*";
    }
    else if(e.key == 109){
        e.key = "-";
    }
    else if(e.key == 107){
        e.key = "+";
    }
    else if(e.key == 111){
        e.key = "/";
    }
    else if(e.key == 221){
        e.key = "(";
    }
    else if(e.shiftKey == 53){
        e.key = "%";
    }
    else if((e.key == 187) || (e.key == 13)){ // how do i get enter to work as well
        e.key = "=";
    }
    else if(e.key == '.'){
        if (!deci) {
            screenValue += e.key;
            screen.value = screenValue;
            deci = true;
        }
    }
    else if(e.key <= 9 ){
        screenValue += e.key;
        screen.value = screenValue;
    }
    else if(e.key == 67){
        e.key = 'c';
    }

    if (e.key == "*"){
        doMath('x');
    }
    else if(e.key == "-"){
        doMath('-');
    }
    else if(e.key == "+"){
        doMath('+');
    }
    else if(e.key == "/"){
        doMath('\u00F7');
    }
    else if(e.key == "%"){
        doMath('%');
    }
    else if(e.key == "="){
        doMath('=');
    }
    else if(e.key == "("){
        tempAbv=abvScreenValue;
        tempOp=operator;
        abvScreenValue = 0;
        abvScreen.value = '';
        operator = '+';
    }
    else if(e.key == ")"){
        doMath('+');
        if (tempOp == '+') {
            abvScreenValue = tempAbv + abvScreenValue;
            abvScreen.value = abvScreenValue;
        } else if (tempOp == '-') {
            abvScreenValue = tempAbv - abvScreenValue;
            abvScreen.value = abvScreenValue;
        } else if (tempOp == 'x') {
            abvScreenValue = tempAbv * abvScreenValue;
            abvScreen.value = abvScreenValue;
        } else if (tempOp == '\u00F7') {
            abvScreenValue = tempAbv / abvScreenValue;
            abvScreen.value = abvScreenValue;
        } 
        tempAbv = 0;
        tempOp = '';
    }
    else if(e.key == 'c'){
        screenValue = '';
        screen.value = '';
        abvScreenValue = 0;
        abvScreen.value = '';
        operator='+';
    }
})