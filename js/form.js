import {sendData} from './api.js';
import {addEscEvent} from './util.js';
import {resetMainPin} from './map.js';

const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const main = document.querySelector('main');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');

const setMinPrice = function (type){
  switch(type) {
    case 'bungalow':
      priceInput.min = 0;
      priceInput.placeholder = '0';
      break;

    case 'flat':
      priceInput.min = 1000;
      priceInput.placeholder = '1000';
      break;

    case 'house':
      priceInput.min = 5000;
      priceInput.placeholder = '5000';
      break;

    case 'palace':
      priceInput.min = 10000;
      priceInput.placeholder = '10000';
      break;
  }
}

setMinPrice(typeSelect.value);

typeSelect.addEventListener('change', function(){
  setMinPrice(this.value);
});

timeinSelect.addEventListener('change', function (){
  timeoutSelect.value = this.value;
});

timeoutSelect.addEventListener('change', function (){
  timeinSelect.value = this.value;
});

const showSuccessMessage = function(){
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  main.appendChild(successMessage);

  addEscEvent(() => {
    successMessage.remove();
  });

  document.body.addEventListener('click', function () {
    successMessage.remove();
  });
};

const showErrorMessage = function(){
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  main.appendChild(errorMessage);

  addEscEvent(() => {
    errorMessage.remove();
  });

  errorButton.addEventListener('click', function (){
    errorMessage.remove();
  });

  document.body.addEventListener('click', function () {
    errorMessage.remove();
  });
};

const setAdFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        showSuccessMessage();
        adForm.reset();
        mapFiltersForm.reset();
        resetMainPin();
      },
      () => {
        showErrorMessage();
      },
      new FormData(evt.target),
    );
  });
}

setAdFormSubmit();

