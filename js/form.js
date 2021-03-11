const titleInput = document.querySelector('#title');
const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');
const roomsSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

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


