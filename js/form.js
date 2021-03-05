const titleInput = document.querySelector('#title');
const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');
const roomsSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const checkRequired = function (field){
  const fieldset = field.parentElement;
  field.addEventListener('invalid', function (){
    if (field.validity.valueMissing) {
      field.setCustomValidity('Обязательное поле для заполнения');
      fieldset.classList.add('ad-form__element--error');
    }
  });
}

checkRequired(titleInput);
checkRequired(priceInput);

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  const fieldset = titleInput.parentElement;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из ' + MIN_TITLE_LENGTH + ' симв. Введите ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
    fieldset.classList.add('ad-form__element--error');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Заголовок не должен превышать ' + MAX_TITLE_LENGTH + ' симв. Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
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
  if (value > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity('Вы превысили максимально допустимую цену. Максимальная цена ' + MAX_PRICE_VALUE +' руб.');
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
    switch (numRooms) {
      case '1':
        option.disabled = option.value !== '1' ? true : false;
        option.selected = option.value === '1' ? true : false;
        break;

      case '2':
        option.disabled = (option.value !== '1' && option.value !== '2') ? true : false;
        option.selected = option.value === '1' ? true : false;
        break;

      case '3':
        option.disabled = (option.value !== '1' && option.value !== '2' && option.value !== '3') ? true : false;
        option.selected = option.value === '1' ? true : false;
        break;

      case '100':
        option.disabled = (option.value !== '0') ? true : false;
        option.selected = option.value === '0' ? true : false;
        break;

      default:
        option.disabled = false
    }
  });
}

setNumSeats(roomsSelect.value);

roomsSelect.addEventListener('change', function () {
  setNumSeats(this.value);
});


