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
getRandomInt(0, 10);

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

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const getRandomArray = (array) => {
  return array.slice(0, getRandomInt(1, array.length));
};

const ANNOUNCEMENTS_COUNT = 10;

const createAnnouncement = () => {
  const lat = getRandomFloat(35.65000, 35.70000, 5);
  const lon = getRandomFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png',
    },
    offer: {
      title: 'Сдается ',
      address: lat + ', ' + lon,
      price: getRandomInt(1, 1000000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, 100),
      guests: getRandomInt(1, 100),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomArray(FEATURES),
      description: 'Сдаются комфортабельные апартаменты. В шаговой доступности городской парк и торговый центр.',
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: lat,
      y: lon,
    },
  }
};

new Array(ANNOUNCEMENTS_COUNT).fill(null).map(() => createAnnouncement());
