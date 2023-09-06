const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const onEscKeydown = (evt, type) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeElem(type);
  }
}
const onClick = (evt) => {
  evt.preventDefault();
  removeElem();
}

const removeElem = (type) => {
  document.querySelector(type).remove();
  document.removeEventListener('keydown', onEscKeydown);
};

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content;
const successFragment = document.createDocumentFragment();
const successMessage = (text) => {
  const successElement = successTemplate.cloneNode(true);
  successElement.querySelector('.success__message').textContent = text;

  successFragment.appendChild(successElement);
  main.appendChild(successFragment);
  const successElem = document.querySelector('.success');
  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      removeElem('.success');
    }
  });

  successElem.addEventListener('click', () => {
    removeElem('.success');
  });
}

const errorTemplate = document.querySelector('#error').content;
const errorFragment = document.createDocumentFragment();
const errorMessage = (text, button) => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__message').textContent = text;
  errorElement.querySelector('.error__button').textContent = button;

  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    removeElem('.error');
  })


  errorFragment.appendChild(errorElement, errorButton);
  main.appendChild(errorFragment);
  const errElem = document.querySelector('.error');
  errElem.addEventListener('click', () => {
    removeElem('.error');
  });
  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      removeElem('.error');
    }
  });

}
export { successMessage, errorMessage, onClick, removeElem };

















