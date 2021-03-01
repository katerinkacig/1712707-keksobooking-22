const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinSelect = document.querySelector('#timein');
const timeoutSelect = document.querySelector('#timeout');

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
