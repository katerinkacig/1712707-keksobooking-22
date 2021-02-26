const similarAnnouncementTemplate = document.querySelector('#card').content.querySelector('.popup');

const typesHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const createCustomPopup = (announcement) => {
  const announcementElement = similarAnnouncementTemplate.cloneNode(true);

  announcementElement.querySelector('.popup__title').textContent = announcement.offer.title;
  announcementElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  announcementElement.querySelector('.popup__text--price').textContent = announcement.offer.price + '  ₽/ночь';
  announcementElement.querySelector('.popup__type').textContent = typesHousing[announcement.offer.type];
  announcementElement.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
  announcementElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;

  const featureContainer = announcementElement.querySelector('.popup__features');
  const featureTemplate = featureContainer.querySelector('.popup__feature');
  featureContainer.innerHTML = '';
  announcement.offer.features.forEach((feature) => {
    const featureItem = featureTemplate.cloneNode(true);
    featureItem.classList.add('popup__feature--' + feature);
    featureContainer.appendChild(featureItem);
  });

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
  return announcementElement;
};

export {createCustomPopup};
