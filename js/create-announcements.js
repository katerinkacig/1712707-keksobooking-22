import {createAnnouncements} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const similarAnnouncementTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAnnouncements = createAnnouncements;

const typesHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const similarAnnouncementsFragment = document.createDocumentFragment();

similarAnnouncements.forEach((announcement) => {
  const announcementElement = similarAnnouncementTemplate.cloneNode(true);

  announcementElement.querySelector('.popup__title').textContent = announcement.offer.title;
  announcementElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  announcementElement.querySelector('.popup__text--price').textContent = announcement.offer.price + '  ₽/ночь';
  announcementElement.querySelector('.popup__type').textContent = typesHousing[announcement.offer.type];
  announcementElement.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
  announcementElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;

  const featureItem = announcement.offer.features.reduce((accumulator, feature) => {
    return accumulator + '<li class="popup__feature popup__feature--' + feature+ '"></li>'
  }, '');
  announcementElement.querySelector('.popup__features').innerHTML = featureItem;

  announcementElement.querySelector('.popup__description').textContent = announcement.offer.description;

  const photoContainer = announcementElement.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');
  photoContainer.innerHTML = '';
  announcement.offer.photos.forEach((src) => {
    const photo = photoTemplate.cloneNode(true);
    photo.src = src;
    photoContainer.appendChild(photo);
  });

  announcementElement.querySelector('.popup__avatar').src = announcement.author.avatar;

  similarAnnouncementsFragment.appendChild(announcementElement);
});


mapCanvas.appendChild(similarAnnouncementsFragment.querySelectorAll('.popup')[0]);
