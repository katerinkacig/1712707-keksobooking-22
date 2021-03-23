import {adForm, mapFiltersForm, toggleActiveMode} from './toggle-active-mode.js';
import {createCustomPopup} from './create-custom-popup.js';
import {getData} from './api.js';
import {showAlert} from './show-alert.js';
import {filterAnnouncements} from './filter.js'
import {debounce} from './util.js'


const LAT = 35.68170;
const LNG = 139.75388;
const RERENDER_DELAY = 500;

const fieldAddress = document.querySelector('#address');

const mainPinIcon = window.L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const pinIcon = window.L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const map = window.L.map('map-canvas')
  .on('load', () => {
    toggleActiveMode(adForm, 'ad-form--disabled', true);
    toggleActiveMode(mapFiltersForm, 'map__filters--disabled', true);

    fieldAddress.value = LAT + ', ' + LNG;
    fieldAddress.setAttribute('readonly', 'readonly');
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, 10);

window.L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPin = window.L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPin.addTo(map);

const resetMainPin = () => {
  mainPin.setLatLng([LAT, LNG]);

  fieldAddress.value = LAT + ', ' + LNG;
  fieldAddress.setAttribute('readonly', 'readonly');
}

mainPin.on('moveend', (evt) => {
  fieldAddress.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
});

const filters = document.querySelectorAll('.map__filters-container .map__filter, .map__filters-container .map__checkbox');

const markerGroup = window.L.layerGroup().addTo(map);

let announcements = [];

const initPins = (announcementsFromServer = announcements) => {
  announcements = announcementsFromServer;
  markerGroup.clearLayers();

  announcements
    .filter(filterAnnouncements)
    .slice(0, 10)
    .forEach((announcement) => {
      const pin = window.L.marker(
        {
          lat: announcement.location.lat,
          lng: announcement.location.lng,
        },
        {
          icon: pinIcon,
        },
      );

      pin
        .addTo(markerGroup)
        .bindPopup(
          createCustomPopup(announcement),
        );
    });
}

const createPins = getData(
  initPins,
  (err) => {
    showAlert(err + ' Не удалось получить данные с сервера.');
  },
);

createPins();

filters.forEach((filter) => {
  filter.addEventListener('change', debounce(() => {
    initPins(announcements);
    map.closePopup();
  }, RERENDER_DELAY));
});

export {resetMainPin, initPins};
