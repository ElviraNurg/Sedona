/* global L:readonly */
import { removeElem } from './data.js'
const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');//Главная форма
const mapFilters = mapFilter.querySelectorAll('.map__filter');//Массив с подпунктами mapFilter
const mapFeatures = mapFilter.querySelector('.map__features');
const formAdress = document.querySelector('#address')

//adForm.classList.add('ad-form--disabled');
adFormHeader.setAttribute('disabled', '');
adFormElement.forEach((value) => value.setAttribute('disabled', ''));

mapFilter.classList.add('map__filters--disabled');
mapFilters.forEach((value) => value.setAttribute('disabled', ''));
mapFeatures.setAttribute('disabled', '');

//Создание карты
const map = L.map('map-canvas')
  //Подписываемся на событие загрузки карты
  .on('load', () => {
    formAdress.value = 'LatLng(35.68948,139.69170)';
    adForm.classList.remove('ad-form--disabled');
    mapFilter.classList.remove('map__filters--disabled');
    adFormHeader.removeAttribute('disabled');
    mapFeatures.removeAttribute('disabled');
    adFormElement.forEach((value) => value.removeAttribute('disabled'));
    mapFilters.forEach((value) => value.removeAttribute('disabled'));
  })
  .setView({
    lat: 35.68948,
    lng: 139.69170,
  }, 13);
//Создание слоя карты
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },//копирайт
).addTo(map);

//Создаем главную иконку
const mainPinIcon = L.icon({
  iconUrl: './leaflet-20230410T092154Z-001/leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],//конец хвоста иконки
});
//Задаем главной иконке координаты
const mainMarker = L.marker(
  {
    lat: 35.68948,
    lng: 139.69170,
  },
  {
    draggable: true,//для передвижения балуна
    icon: mainPinIcon,
  },
);
//добавляем в карту главную метку
mainMarker.addTo(map);
//Подптсываемся на события
mainMarker.on('moveend', (evt) => {
  const mainMarkerAdress = evt.target.getLatLng();
  formAdress.value = 'LatLng(' + parseFloat(mainMarkerAdress.lat).toFixed(5) + ', ' + parseFloat(mainMarkerAdress.lat).toFixed(5) + ')';
})
//функция по созданию маркера
const createMarker = (datas) => {
  const template = document.querySelector('#card').content.querySelector('.popup');
  const offerElement = template.cloneNode(true);
  Object.values(datas).forEach(() => {

    offerElement.querySelector('.popup__avatar').src = datas.author.avatar;
    offerElement.querySelector('.popup__title').textContent = datas.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = `Координаты: ${datas.location.lat}, ${datas.location.lng}`;
    offerElement.querySelector('.popup__text--price').textContent = datas.offer.price + ' ₽/ночь';
    offerElement.querySelector('.popup__type').textContent = datas.offer.type;
    offerElement.querySelector('.popup__text--capacity').textContent = datas.offer.rooms + ' комнаты для ' + datas.offer.guests + ' гостей.';
    offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + datas.offer.checkin + ', выезд до ' + datas.offer.checkout + '.';
    offerElement.querySelector('.popup__features').textContent = datas.offer.features;
    offerElement.querySelector('.popup__description').textContent = datas.offer.description;
    offerElement.querySelector('.popup__photo').src = datas.offer.photos;
  })

  return offerElement;

};
//получаем данные из сервера и создаем по этим данным метки
const SIMILAR_WIZARD_COUNT = 10;
const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data)
    })
}

const renderMarker = (data,count) => {

  Object.values(data).slice()
    .sort(sortMarkers)
    .slice(0, SIMILAR_WIZARD_COUNT)
    .forEach((point) => {

      //console.log(point);
      const { lat, lng } = point.location;
      const icon = L.icon({
        iconUrl: './leaflet-20230410T092154Z-001/leaflet/img/pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      })
      const Marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );

      Marker.addTo(map).bindPopup(createMarker(point), { keepInView: true });
    })
}

const housingType = document.querySelector('[name = "housing-type"]');
const housingPrice = document.querySelector('[name = "housing-price"]');
const housingRooms = document.querySelector('[name = "housing-rooms"]');
const housingGuests = document.querySelector('[name = "housing-guests"]');
const featuresCheckbox = document.querySelectorAll('.map__checkbox')
//задаем правила ранжирования меток
const getMarkerRank = (data) => {
  let rank = 0;
  if (data.offer.type === housingType.value) {
    rank += 1;
  }
  if (((data.offer.price >= 10000) && (data.offer.price <= 50000) && (housingPrice.value === 'middle'))) {
    rank += 1;
  }
  if (((data.offer.price < 10000) && (housingPrice.value === 'low'))) {
    rank += 1;
  }
  if (((data.offer.price > 50000) && (housingPrice.value === 'high'))) {
    rank += 1;
  }
  if (data.offer.rooms >= housingRooms.value) {
    rank += 1;
  }
  if (data.offer.guests >= housingGuests.value) {
    rank += 1;
  }
  for (let i = 0; i < featuresCheckbox.length; i++) {
    if (featuresCheckbox[i].checked && data.offer.features != undefined) {
      for (let j = 0; j < data.offer.features.length; j++) {
        if (featuresCheckbox[i].value == data.offer.features[j]) {
          rank += 0.3;
        }
      }
    }
  }
  return data.rank = rank;
}
//Удаление маркеров перед прорисовкой
const deleteMarkers = () => {
  const markers = document.querySelectorAll('.leaflet-marker-icon');
  for (let i = markers.length - 1; i >= 1; i--) {
    markers[i].remove();
  }
}
//Сортируем метки по рангу
const sortMarkers = (markerA, markerB) => {
  const rankA = getMarkerRank(markerA);
  const rankB = getMarkerRank(markerB);
  return rankB - rankA;
}


let typeClickCount = 0;
let priceClickCount = 0;
const setMarkerTypeClick = (cb) => {
  housingType.addEventListener('click', () => {
    const popup = document.querySelector('.leaflet-popup-content-wrapper')
    if (popup) {
      removeElem('.leaflet-popup-content-wrapper');
    }
    deleteMarkers();
    typeClickCount=typeClickCount+0.5;
    cb();
    return typeClickCount;
  })
}
const setMarkerPriceClick = (cb) => {
  housingPrice.addEventListener('click', () => {
    const popup = document.querySelector('.leaflet-popup-content-wrapper')
    if (popup) {
      removeElem('.leaflet-popup-content-wrapper');
    }
    deleteMarkers();
    priceClickCount=priceClickCount+0.5;
    cb();
    return priceClickCount;
  })
}
const setMarkerRoomsClick = (cb) => {
  housingRooms.addEventListener('click', () => {
    const popup = document.querySelector('.leaflet-popup-content-wrapper')
    if (popup) {
      removeElem('.leaflet-popup-content-wrapper');
    }
    deleteMarkers();
    cb();
  })
}
const setMarkerGuestsClick = (cb) => {
  housingGuests.addEventListener('click', () => {
    const popup = document.querySelector('.leaflet-popup-content-wrapper')
    if (popup) {
      removeElem('.leaflet-popup-content-wrapper');
    }
    deleteMarkers();
    cb();
  })
}
const setMarkerFeaturesClick = (cb) => {
  featuresCheckbox.forEach(item => item.addEventListener('click', () => {
    const popup = document.querySelector('.leaflet-popup-content-wrapper')
    if (popup) {
      removeElem('.leaflet-popup-content-wrapper');
    }
    deleteMarkers();
    cb();
  }))
}
let count = typeClickCount + priceClickCount;
export { mainMarker, getData, renderMarker, setMarkerTypeClick, setMarkerPriceClick, setMarkerRoomsClick, setMarkerGuestsClick, setMarkerFeaturesClick, count }
