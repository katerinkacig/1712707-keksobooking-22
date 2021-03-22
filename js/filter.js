const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelectorAll('.map__checkbox');


const filterAnnouncements = (announcement) => {
  const selectedFeatures = [];
  housingFeatures.forEach((feature) => {
    if(feature.checked){
      selectedFeatures.push(feature.value);
    }
  });

  let minPrice;
  let maxPrice;
  switch (housingPrice.value) {
    case 'middle':
      minPrice = 10000;
      maxPrice = 50000;
      break;

    case 'low':
      minPrice = 0;
      maxPrice = 10000;
      break;

    case 'high':
      minPrice = 50000;
      maxPrice = Infinity;
      break;
  }

  return (housingType.value === 'any' || announcement.offer.type === housingType.value) &&
    (housingPrice.value === 'any' || (announcement.offer.price > minPrice && announcement.offer.price <= maxPrice)) &&
    (housingRooms.value === 'any' || announcement.offer.rooms === +housingRooms.value) &&
    (housingGuests.value === 'any' ||  announcement.offer.guests === +housingGuests.value) &&
    selectedFeatures.every(feature =>  announcement.offer.features.includes(feature))
};

export {filterAnnouncements};
