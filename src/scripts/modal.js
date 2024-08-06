export {openPopup, closePopup};
import {popupClose} from '../index.js';

//фунция колбэк ОТКРЫТИЯ любого попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
  popup.addEventListener('mouseup', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
  popupClose.forEach((buttonClose) => buttonClose.addEventListener('click', () => closePopup(popup)))
}

//функция колбэк ЗАКРЫТИЯ любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
  popup.removeEventListener('mouseup', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
  popupClose.forEach((buttonClose) => buttonClose.removeEventListener('click', () => closePopup(popup)))
}

