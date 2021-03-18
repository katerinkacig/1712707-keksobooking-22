import {adForm, mapFiltersForm, toggleActiveMode} from './toggle-active-mode.js';
import {createCustomPopup} from './create-custom-popup.js';
import {getData} from './api.js';
import {showAlert} from './show-alert.js';


const LAT = 35.68170;
const LNG = 139.75388;

const fieldAddress = document.querySelector('#address');

const mainPinIcon = window.L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const pinIcon = window.L.icon({
  iconUrl: '../img/pin.svg',
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
  }, 11);

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

const resetMainPin = function (){
  mainPin.setLatLng([LAT, LNG]);

  fieldAddress.value = LAT + ', ' + LNG;
  fieldAddress.setAttribute('readonly', 'readonly');
}

mainPin.on('moveend', (evt) => {
  fieldAddress.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
});

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');

const markerGroup = window.L.layerGroup().addTo(map);

const createPins = getData(
  (announcements) => {
    markerGroup.clearLayers();
    console.log(housingRooms.value);
    console.log('----');
    pins.slice(0, 5).forEach((announcement) => {
      console.log(announcement.offer.rooms);
    });
    announcements
      .filter((pin) => {
        return (pin.offer.type === housingType.value ||
          housingType.value === 'any') &&
          (housingRooms.value === 'any' ||
            pin.offer.rooms === +housingRooms.value)
      })
      .slice(0, 5)
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
          .addTo(map)
          .bindPopup(
            createCustomPopup(announcement),
          );
      });
  },
  (err) => {
    showAlert(err + ' Не удалось получить данные с сервера.');
  },
);

createPins();

housingType.addEventListener('change', function (){
  createPins()
});

housingPrice.addEventListener('change', function (){
  createPins()
});

housingRooms.addEventListener('change', function (){
  createPins()
});

export {resetMainPin};
