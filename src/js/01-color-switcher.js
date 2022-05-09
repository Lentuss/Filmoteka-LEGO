const body = document.querySelector("body");
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = 0;

stopBtn.setAttribute("disabled", true)

const colorChange = () => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
}

const onStartBtnClick = () => {
    colorChange();//щоб колір змінився одразу після натискання на кнопку
    
    timerId = setInterval(
        colorChange,1000
    )
    
    startBtn.setAttribute("disabled", true);
    stopBtn.removeAttribute("disabled");
}

const onStopBtnClick = () => {      
    clearInterval(timerId);

    startBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled", true)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener("click", onStopBtnClick);
   