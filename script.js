const timer    =    document.querySelector('.timer');
const score    =    document.getElementById('score');
const trueBtn  =    document.querySelector('.true');
const falseBtn =    document.querySelector('.false');
const start    =    document.querySelector('.start');
const startList=    document.querySelector('.startList');
const stop     =    document.querySelector('.stop > p');
const notify   =    document.querySelector('.notify');

// math var
let example    =    document.querySelector('.number');
let answer     =    document.querySelector('.answer');

let intervalTime = null;
let keysActive = 0;


window.addEventListener('DOMContentLoaded', () => {
    notify.classList.add('notifyJs');

    setTimeout(() => {
        notify.classList.remove('notifyJs');
    }, 10000)
})

// Функция старта.
start.addEventListener('click', () => {
    startGame();
});

window.addEventListener('keypress', (e) => {
    if(!keysActive){
        if(e.code == "Enter"){
            startGame();
        }
    }
})

function startGame() {
    intervalTime = setInterval(timerStart, 1000);
    dispEx();
    
    startList.classList.add('invisible');
    timer.textContent = 15;
    timer.style.backgroundColor = '#FFC618';
    timer.style.color = 'black';

    keysActive = 1;

    stop.classList.add("translateXstop");
}

stop.addEventListener('click', () => {
    endGame();
})

// Слушатели функции кнопок ответа =>


// Верный ответ
trueBtn.addEventListener('click', trueFunc);
    window.addEventListener('keypress', (e) => {
        if(keysActive) {
            if(e.code == 'KeyA') trueFunc();
        }
    })

        function trueFunc(){
            let realAns = eval(example.textContent);
            let ansRand = answer.textContent;

            if(realAns == +ansRand){
                dispEx();
                score.textContent = +score.textContent + 1; 
                timer.textContent = 15;
            }else{
                endGame();
            }
        }

// Ложный ответ
falseBtn.addEventListener('click', falseFunc);
    window.addEventListener('keypress', (e) => {
        if(keysActive) {
            if(e.code == 'KeyD') falseFunc();
        }
    })

        function falseFunc(){
            let realAns = eval(example.textContent);
            let ansRand = answer.textContent;

            if(realAns != +ansRand){
                dispEx();
                score.textContent = +score.textContent + 1; 
                timer.textContent = 15;
            }else{
                endGame();
            }
        }




// 



// Расстановка действий и результата на странице.
function dispEx(){
    let res = mathEx();

    if(res.op == "+"){
        example.textContent = res.x + " + " + res.y;
        answer.textContent = res.result;
    }else if(res.op == "-"){
        example.textContent = res.max + " - " + res.min;
        answer.textContent = res.result;
    }else if(res.op == "*"){
        example.textContent = res.x + " * " + res.y;
        answer.textContent = res.result;
    }else{
        example.textContent = res.x + " / " + res.y;
        answer.textContent = res.result;
    }
}

// Фунция, которая рандомазеров вытаскивает вероятность 
// выполнения и получает числа, создавая пример

function mathEx(){

    // переменные чисел, результат, оператор, проверка погрешности
    let x, y, op, result, boolData, boolOp, errorInt;

    op = mathOp();
    boolData = Math.round(Math.random());

// PLUS
    if(op == "+"){
        x = randomizer(5, 100);
        y = randomizer(5, 100);

        if(boolData){
            result = x + y;
            return {x, y, result, op};
        }else{
            boolOp = Math.round(Math.random());
            errorInt = randomizer(1, 10);

            if(boolOp){
                result = x + y;
                result += errorInt;

                return {x, y, result, op};
            }else{
                result = x + y;
                result -= errorInt;

                return {x, y, result, op};
            }
        }
    }


// MINUS
    else if(op == "-"){
        x = randomizer(5, 100);
        y = randomizer(5, 100);

        let max = x, min;
        if(max > y){
            min = y;
        }else{
            max = y;
            min = x;
        }

        if(boolData){
            result = max - min;
            return {max, min, result, op};
        }else{
            boolOp = Math.round(Math.random());
            errorInt = randomizer(1, 10);

            if(boolOp){
                result = max - min;
                result += errorInt;

                return {max, min, result, op};
            }else{
                result = max - min;
                result -= errorInt;

                return {max, min, result, op};
            }
        }
    }

// MULTIPLY
    else if(op == "*"){
        x = randomizer(1, 15);
        y = randomizer(1, 15);

        if(boolData){
            result = x * y;
            return {x, y, result, op};
        }else{
            boolOp = Math.round(Math.random());
            errorInt = randomizer(1, 3);

            if(boolOp){
                result = x * y;
                result += errorInt;

                return {x, y, result, op};
            }else{
                result = x * y;
                result -= errorInt;

                return {x, y, result, op};
            }
        }
    }


//  DIVIDE
    else if(op == "/"){
       let n = 1;

       for(let i = 0; i < n; i++){
            x = randomizer(5, 500);
            y = randomizer(5, 500);
        
            if((x % y) != 0){
                n += 1;
            }
       }

       if(boolData){
        result = x / y;
        return {x, y, result, op};
       }else{
            boolOp = Math.round(Math.random());
            errorInt = randomizer(1, 3);

            if(boolOp){
                result = x / y;
                result += errorInt;

                return {x, y, result, op};
            }else{
                result = x / y;
                result -= errorInt;

                return {x, y, result, op};
            }
        }

    }
}


// функция рандомайзера оператора примера
function mathOp(){
    let operationRand = randomizer(1,4),
        operation;

    switch (operationRand){
        case 1:
            operation = "+"; 
            break;
        case 2:
            operation = "-";
            break;
        case 3:
            operation = "*";
            break;    
        case 4:
            operation = "/";
            break;
    }

    return operation;
}


function timerStart() {
    timer.textContent = timer.textContent - 1;

    if(timer.textContent == 5){
        timer.style.backgroundColor = 'red';
        timer.style.color = 'white';
    }

    if(timer.textContent == 0){
        endGame();
    }
}


//Рандомайзер
function randomizer(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}


// конечная, и обновляющая функция.
function endGame(){
    startList.classList.remove('invisible');
    clearInterval(intervalTime);
    timer.textContent = '';

    timer.textContent = "Your score is " + score.textContent;
    score.textContent = 0;
    keysActive = 0;

    stop.classList.remove("translateXstop");
}
