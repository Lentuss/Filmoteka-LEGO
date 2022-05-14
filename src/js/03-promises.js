import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInput = document.querySelector("input[name='delay']");
const delayStep = document.querySelector("input[name='step']");
const promiseCount = document.querySelector("input[name='amount']");
const submitBtn = document.querySelector('button[type="submit"]');


function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;
  const newPromise = new Promise ((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
 
      } else {
        // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }    
    }, delay)
  })
  newPromise
  .then(value => {
    Notify.success(value);
  })
  .catch(error => {
    Notify.failure(error);
  });
}



const createDelay = (e) => {
  e.preventDefault() 
  
  let delay = Number(delayInput.value);
  let step = Number(delayStep.value);
  let amount = Number(promiseCount.value);

  if (delay >= 0 && step >= 0) {      
    for (let i = 1; i <= amount; i += 1){
      if (i == 1) {
        delay = Number(delayInput.value);    
      }
      else {
        delay += step;
      }
      
      console.log(delay);
      createPromise(i, delay)
    }
  } else {
    Notify.failure('please, enter correct value')
  }
}

submitBtn.addEventListener("click", createDelay);