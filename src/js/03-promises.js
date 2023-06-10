import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayField = document.querySelector('input[name="delay"]');
const stepField = document.querySelector('input[name="step"]');
const amountField = document.querySelector('input[name="amount"]');


form.addEventListener('submit', onCreatePromiseBtnClick);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromiseBtnClick(event) {
  event.preventDefault();

  let firstDelay = Number(delayField.value);
  let delayStep = Number(stepField.value);
  let amount = Number(amountField.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  
    firstDelay += delayStep;
  }

  form.reset();
}

  // Other version for our onCreatePromiseBtnClick function (between preventDefault and for loop)

  // const formData = new FormData(event.currentTarget);
  // const dataParams = {};

  // for (const [key, value] of formData.entries()) {
  //   dataParams[key] = Number(value);
  // }

  // let { delay, step, amount } = dataParams;
