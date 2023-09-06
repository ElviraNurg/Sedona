import { successMessage, errorMessage } from './data.js';

//import { typeValidity, adFormTitleValidity,timeInValidity} from './validation.js';
const adForm = document.querySelector('.ad-form');
const text = {
  success:'Ваше объявление успешно размещено!',
  error: 'Не удалось отправить форму. Попробуйте ещё раз'};

const setFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        successMessage(text.success);
        evt.target.reset();

      }else {
        errorMessage(text.error);
      }
    })
  });
}
export {setFormSubmit};
