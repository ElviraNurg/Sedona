import { similarHotels } from './data.js';
const offerList = document.querySelector('.map__canvas');
const template= document.querySelector('#card').content.querySelector('.popup');

const similarOffers = similarHotels();
const similarOfferFragment = document.createDocumentFragment();

similarOffers.forEach((similarHotels) => {
  const offerElement = template.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = similarHotels.title;
  offerElement.querySelector('.popup__text--address').textContent = similarHotels.adress.X + ' ' + similarHotels.adress.Y;
  offerElement.querySelector('.popup__text--price').textContent = similarHotels.price;
  offerElement.querySelector('.popup__text--price').textContent = similarHotels.price;
  offerElement.querySelector('.popup__type').textContent = similarHotels.type;
  offerElement.querySelector('.popup__text--capacity').textContent = similarHotels.rooms + ' комнаты для ' + similarHotels.guests + ' гостей.';
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarHotels.checkin + ', выезд до ' + similarHotels.checkout + '.';
  offerElement.querySelector('.popup__features').textContent = similarHotels.features;
  offerElement.querySelector('.popup__description').textContent = similarHotels.description;
  offerElement.querySelector('.popup__photo').src = similarHotels.PHOTOS[0];
  offerElement.querySelector('.popup__avatar').src = similarHotels.avatar;
  similarOfferFragment.appendChild(offerElement);
});

offerList.appendChild(similarOfferFragment);
export {offerList};
