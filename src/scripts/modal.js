export {openPopup, closePopup};

//фунция колбэк ОТКРЫТИЯ любого попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('mouseup', closePopupByOverlay);
}

//функция колбэк ЗАКРЫТИЯ любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('mouseup', closePopupByOverlay);
}

//функция колбэк для закрытия попапа через клавишу escape
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

//функция колбэк для закрытия попапа через оверлей
function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}