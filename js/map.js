import {adForm, mapFiltersForm, toggleActiveMode} from './toggle-active-mode.js';
import {createAnnouncements} from './data.js';
import {createCustomPopup} from './create-custom-popup.js';


const LAT = 35.68170;
const LNG = 139.75388;

const pins = createAnnouncements();

const fieldAddress = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const map = L.map('map-canvas')
  .on('load', () => {
    toggleActiveMode(adForm, '.ad-form--disabled', true);
    toggleActiveMode(mapFiltersForm, '.map__filters--disabled', true);

    fieldAddress.value = LAT + ', ' + LNG;
    fieldAddress.setAttribute('readonly', 'readonly')
  })
  .setView({
    lat: LAT,
    lng: LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPin = L.marker(
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

pins.forEach((announcement) => {
  const pin = L.marker(
    {
      lat: announcement.location.x,
      lng: announcement.location.y,
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
