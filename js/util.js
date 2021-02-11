const getRandomInt = function (min, max) {
  if (min > max) {
    throw new RangeError('Неправильный диапозон ('+ min + ', ' + max + ') . Максимальное значение диапазона должно быть больше минимального')
  }
  if (min === max) {
    throw new RangeError('Неправильный диапозон ('+ min + ', ' + max + ') . Минимальное и максимальное значения не должны быть равны')
  }
  if (min < 0 || max < 0) {
    throw new RangeError('Неправильный диапозон ('+ min + ', ' + max + ') . Диапазон может быть только положительный, включая ноль')
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = function (min, max, decimalPlaces) {
  if (min > max) {
    throw new RangeError('Неправильный диапозон ('+ min + ', ' + max + ') . Максимальное значение диапазона должно быть больше минимального')
  }
  if (min === max) {
    throw new RangeError('Неправильный диапозон ('+ min + ', ' + max + ') . Минимальное и максимальное значения не должны быть равны')
  }
  if (min < 0 || max < 0) {
    throw new RangeError('Неправильный диапозон ('+ min + ', ' + max + ') . Диапазон может быть только положительный, включая ноль')
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
}

export {getRandomInt, getRandomFloat};
