import { Notify } from "notiflix";

const refs = {
  submitBtn: document.querySelector('.form'),
  delay: document.querySelector('.form input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.submitBtn.addEventListener('click', handledFormSubmit);

function handledFormSubmit(event) {
  event.preventDefault();

  let firstDelay = Number(refs.delay.value);
  let stepDelay = Number(refs.step.value);
  let amountPromises = Number(refs.amount.value);

  for (let i = 1; i <= amountPromises; i += 1) {
    
    createPromise(i, firstDelay)
      .then((position, delay) => Notify.success(`Fulfilled promise ${i} in ${refs.delay}ms`))
      .catch((position, delay) => Notify.failure(`Rejected promise ${i} in ${refs.delay}ms`));
    
    firstDelay += stepDelay;
    
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve('Fulfilled');
      } else {
        reject('Rejected');
      }
    }, delay);
  });
  return promise;
};


