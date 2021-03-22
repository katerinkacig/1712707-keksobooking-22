const toggleActiveMode = (form, classDisabled, isActive) => {
  if(isActive){
    form.classList.remove(classDisabled);
  } else{
    form.classList.add(classDisabled);
  }

  form.querySelectorAll('fieldset').forEach((element) => {
    if(isActive){
      element.disabled = false
    } else {
      element.disabled = true
    }
  });

  form.querySelectorAll('select').forEach((element) => {
    if(isActive){
      element.disabled = false
    } else {
      element.disabled = true
    }
  });
}

const  adForm = document.querySelector('.ad-form');
toggleActiveMode(adForm, 'ad-form--disabled');

const  mapFiltersForm = document.querySelector('.map__filters');
toggleActiveMode(mapFiltersForm, 'map__filters--disabled');

export {adForm, mapFiltersForm, toggleActiveMode};
