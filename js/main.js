let getRandomInt = function (min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0) {
    min = 0;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getRandomFloat = function (min, max, decimalPlaces) {
  if (min > max) {
    [min, max] = [max, min];
  }

  if (min < 0) {
    min = 0;
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
}
