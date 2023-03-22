import { Notify } from "notiflix";

const refs = {
  submitBtn: document.querySelector('.form'),
  delay: document.querySelector('.form input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.submitBtn.addEventListener('submit', handledFormSubmit);

function handledFormSubmit(event) {
  event.preventDefault();
  
  let firstDelay = Number(refs.delay.value);
  let stepDelay = Number(refs.step.value);
  let amountPromises = Number(refs.amount.value);
  
  for (let i = 1; i <= amountPromises; i += 1) {
    
    createPromise(i, firstDelay)
      .then(value => Notify.success(value))
      .catch(error => Notify.failure(error));
    
    firstDelay += stepDelay;
    
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
};


