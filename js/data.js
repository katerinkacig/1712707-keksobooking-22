import {getRandomInt, getRandomFloat} from './util.js';

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
      title: 'Сдается',
      address: lat + ', ' + lon,
      price: getRandomInt(1, 1000000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, 4),
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

const createAnnouncements = () => new Array(ANNOUNCEMENTS_COUNT).fill(null).map(() => createAnnouncement());

export {createAnnouncements};
