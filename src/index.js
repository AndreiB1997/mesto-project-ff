export {cardTemplate, placesList, popupClose, showCard}
import '../src/pages/index.css';
import {insertingСards, createCard, deleteCard, likeCard} from '../src/scripts/cards.js';
import {openPopup, closePopup} from '../src/scripts/modal.js'

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup'); /* все модальные окна */
const profileEditButton = document.querySelector('.profile__edit-button'); /* кнопка открытия окна редактирования профиля */
const popupTypeEdit = document.querySelector('.popup_type_edit'); /* окно редактирования профиля */
const popupClose = document.querySelectorAll('.popup__close'); /* все кнопки закрытия модальных окон */
const profileAddButton = document.querySelector('.profile__add-button'); /* кнопка добавления новой карточки */
const popupTypeNewCard = document.querySelector('.popup_type_new-card'); /* окно добавления новой карточки */
const popupTypeImage = document.querySelector('.popup_type_image'); /* попап большого изображения */
const popupImage = popupTypeImage.querySelector('.popup__image'); /* картинка в попапе большого изображения */
const popupCaption = popupTypeImage.querySelector('.popup__caption'); /* параграф под картинкой в попапе большого изображения */
const editProfileForm = document.forms['edit-profile']; /* форма в редактировании профиля */
const profileTitle = document.querySelector('.profile__title'); /* заголовок профиля на странице */
const profileDescription = document.querySelector('.profile__description'); /* описание профиля на странице */
const newCardForm = document.forms['new-place'];

//вывод всех карточек из массива
insertingСards();

//слушать кнопку открытия окна редактирования профиля
profileEditButton.addEventListener('click', copyingDataForPopup);

//функция колбэк копирования заголовка и описания сайта в инпуты попапа
function copyingDataForPopup() {
  editProfileForm.elements['name'].value = profileTitle.textContent;
  editProfileForm.elements['description'].value = profileDescription.textContent;
  openPopup(popupTypeEdit);
}

//слушать кнопку открытия окна добавления карточки
profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard));

//слушаем отправку формы окна редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit); 

//слушаем отправку формы окна добавления новой карточки
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

//добавляем класс всем попапап для анимации
popups.forEach((popup) => popup.classList.add('popup_is-animated'));

//функция демонстрации большой картинки карточки
function showCard(link, alt, title) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupCaption.textContent = title;
  openPopup(popupTypeImage);
}

//функция колбэк для «отправки» формы в окне добавления карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const link = newCardForm.elements['link'].value;
  const name = newCardForm.elements['place-name'].value;
  const newCard = createCard(link, name, showCard, deleteCard, likeCard);
  placesList.prepend(newCard);
  newCardForm.reset();
  closePopup(popupTypeNewCard);
}

//функция колбэк для «отправки» формы в окне редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileForm.elements['name'].value;
  profileDescription.textContent = editProfileForm.elements['description'].value;
  closePopup(popupTypeEdit);
}

