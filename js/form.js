import {sendData} from './api.js';
import {addEscEvent} from './util.js';
import {resetMainPin} from './map.js';

const main = document.querySelector('main');
const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const titleInput = adForm.querySelector('#title');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');
const roomsSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const resetBtn = adForm.querySelector('.ad-form__reset');

const checkRequired = function (field){
  const fieldset = field.parentElement;
  field.addEventListener('invalid', function (){
    if (field.validity.valueMissing) {
      fieldset.classList.add('ad-form__element--error');
    }
  });
}

checkRequired(titleInput);
checkRequired(priceInput);

titleInput.addEventListener('input', () => {
  const fieldset = titleInput.parentElement;

  if (titleInput.validity.tooShort || titleInput.validity.tooLong) {
    fieldset.classList.add('ad-form__element--error');
  } else {
    titleInput.setCustomValidity('');
    fieldset.classList.remove('ad-form__element--error');
  }

  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const value = priceInput.value;
  const fieldset = priceInput.parentElement;
  const maxPriceValue = priceInput.getAttribute('max');
  const minPriceValue = priceInput.getAttribute('min');
  if (value > maxPriceValue || value < minPriceValue) {
    fieldset.classList.add('ad-form__element--error');
  } else {
    priceInput.setCustomValidity('');
    fieldset.classList.remove('ad-form__element--error');
  }

  priceInput.reportValidity();
});

const setMinPrice = function (type) {
  switch (type) {
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

typeSelect.addEventListener('change', function () {
  setMinPrice(this.value);
});

timeinSelect.addEventListener('change', function () {
  timeoutSelect.value = this.value;
});

timeoutSelect.addEventListener('change', function () {
  timeinSelect.value = this.value;
});


const capacityOptions = capacitySelect.querySelectorAll('option');
const setNumSeats = function (numRooms) {
  capacityOptions.forEach((option) => {
    if (+option.value <= +numRooms) {
      if (+numRooms === 100) {
        option.disabled = +option.value !== 0;
        option.selected = +option.value === 0;
      } else {
        option.disabled = +option.value === 0;
        option.selected = option.value === numRooms;
      }
    } else {
      option.disabled = true;
      option.selected = false;
    }
  });
}

setNumSeats(roomsSelect.value);

roomsSelect.addEventListener('change', function () {
  setNumSeats(this.value);
});

resetBtn.addEventListener('click', function (evt){
  evt.preventDefault();
  adForm.reset();
  mapFiltersForm.reset();
  resetMainPin();
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

