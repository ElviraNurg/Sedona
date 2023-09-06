//Валидация
//Валидация длины заголовка
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const adForm = document.querySelector('.ad-form');
const adFormTitle = adForm.querySelector('#title');

adFormTitle.addEventListener('input', () => {
  const valueLength = adFormTitle.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    adFormTitle.setCustomValidity('Еще' + (MIN_TITLE_LENGTH - valueLength) + 'симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adFormTitle.setCustomValidity('Удалите' + (valueLength - MAX_TITLE_LENGTH) + 'симв.');
  } else {
    adFormTitle.setCustomValidity('');
  }
  adFormTitle.reportValidity();
});

//Валидация типа жилья и цены
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');

adFormType.addEventListener('change', () => {
  adFormType.addEventListener('input', () => {
    const valueType = adFormType.value;
    if (valueType === 'bungalow') {
      adFormPrice.placeholder = 0;
      adFormPrice.addEventListener('input', () => {
        if ((adFormPrice.value < 0)) {
          adFormPrice.setCustomValidity('Минммальная цена за бунгало 0 руб., максимальная - 1000000 руб.')
        } else {
          adFormPrice.setCustomValidity('');
        }
      })
      adFormPrice.reportValidity();
    } else if (valueType === 'flat') {
      adFormPrice.placeholder = 1000;
      adFormPrice.addEventListener('input', () => {
        if (adFormPrice.value < 1000) {
          adFormPrice.setCustomValidity('Минммальная цена за квартиру 1000 руб.')
        } else {
          adFormPrice.setCustomValidity('');
        }
      })
      adFormPrice.reportValidity();
    } else if (valueType === 'house') {
      adFormPrice.placeholder = 5000;
      adFormPrice.addEventListener('input', () => {
        if (adFormPrice.value < 5000) {
          adFormPrice.setCustomValidity('Минммальная цена за дом 5000 руб.')
        } else {
          adFormPrice.setCustomValidity('');
        }
      })
      adFormPrice.reportValidity();
    } else if (valueType === 'palace') {
      adFormPrice.placeholder = 10000;
      adFormPrice.addEventListener('input', () => {
        if (adFormPrice.value < 10000) {
          adFormPrice.setCustomValidity('Минммальная цена за дворец 10000 руб.')
        } else {
          adFormPrice.setCustomValidity('');
        }
      })
      adFormPrice.reportValidity();
    } else if (valueType === 'hotel') {
      adFormPrice.placeholder = 3000;
      adFormPrice.addEventListener('input', () => {
        if (adFormPrice.value < 3000) {
          adFormPrice.setCustomValidity('Минммальная цена за номер в отеле 3000 руб.')
        } else {
          adFormPrice.setCustomValidity('');
        }
      })
      adFormPrice.reportValidity();
    } else {
      adFormType.setCustomValidity('');
    }
    adFormPrice.reportValidity();
    adFormType.reportValidity();
  })
})

// Валидация времени заезда/выезда
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');

adFormTimeIn.addEventListener('change', () => {
  if (adFormTimeIn.value != adFormTimeOut.value) {
    adFormTimeOut.value = adFormTimeIn.value;
  } else {
    adFormTimeIn.setCustomValidity('');
  }
  adFormTimeIn.reportValidity();
})

adFormTimeOut.addEventListener('change', () => {
  if (adFormTimeIn.value != adFormTimeOut.value) {
    adFormTimeIn.value = adFormTimeOut.value;
  } else {
    adFormTimeOut.setCustomValidity('');
  }
  adFormTimeOut.reportValidity();
})

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
roomNumber.addEventListener('input', () => {
  const valueRoomNum = roomNumber.value;
  if (valueRoomNum === '1') {
    capacity.addEventListener('input', () => {
      if (capacity.value != '1') {
        capacity.setCustomValidity('Максимальное количество гостей - 1');
      } else {
        capacity.setCustomValidity('');
        roomNumber.setCustomValidity('');
      }
    })
    capacity.reportValidity();
    roomNumber.reportValidity();
  } else if (valueRoomNum === '2') {
    capacity.addEventListener('input', () => {
      if ((capacity.value > '2') || (capacity.value === '0')) {
        capacity.setCustomValidity('Максимальное количество гостей - 2');
      } else {
        capacity.setCustomValidity('');
        roomNumber.setCustomValidity('');
      }
    })
    capacity.reportValidity();
    roomNumber.reportValidity();
  } else if (valueRoomNum === '3') {
    capacity.addEventListener('input', () => {
      if ((capacity.value > '3') || (capacity.value === '0')) {
        capacity.setCustomValidity('Максимальное количество гостей - 3');
      } else {
        capacity.setCustomValidity('');
        roomNumber.setCustomValidity('');
      }
    })
    capacity.reportValidity();
    roomNumber.reportValidity();
  } else {
    capacity.addEventListener('input', () => {
      if ((capacity.value != '0')) {
        capacity.setCustomValidity('Не для гостей')
      } else {
        capacity.setCustomValidity('');
        roomNumber.setCustomValidity('');
      }
    })
    capacity.reportValidity();
    roomNumber.reportValidity();
  }
  roomNumber.reportValidity();
  capacity.reportValidity();
})

