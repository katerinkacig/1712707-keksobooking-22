import {adForm, mapFiltersForm, toggleActiveMode} from './toggle-active-mode.js';
import {createAnnouncements} from './data.js';
import {createCustomPopup} from './create-custom-popup.js';


const LAT = 35.68170;
const LNG = 139.75388;

const pins = createAnnouncements();

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
    fieldAddress.setAttribute('readonly', 'readonly')
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, 12);

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

mainPin.on('moveend', (evt) => {
  fieldAddress.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
});

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');

const markerGroup = window.L.layerGroup().addTo(map);

const renderSimilarPins = (pins) =>{
  markerGroup.clearLayers();
  console.log(housingRooms.value);
  console.log('----');
  pins.slice(0, 5).forEach((announcement) => {
    console.log(announcement.offer.rooms);
  });
  pins
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
          lat: announcement.location.x,
          lng: announcement.location.y,
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

renderSimilarPins(pins);

housingType.addEventListener('change', function (){
  renderSimilarPins(pins)
});

housingPrice.addEventListener('change', function (){
  renderSimilarPins(pins)
});

housingRooms.addEventListener('change', function (){
  renderSimilarPins(pins)
});

