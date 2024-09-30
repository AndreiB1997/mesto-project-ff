export {cardTemplate, requestConfig, profileConfig};

import '../src/pages/index.css';
import {createCard, deleteCardLocal, likeCardLocak} from '../src/scripts/card.js';
import {openPopup, closePopup} from '../src/scripts/modal.js';
import {clearValidation, enableValidation} from "../src/scripts/validation.js";
import {reqGetDataProfile, reqGetCards, reqUpDataProfile, reqAddCard, reqDeleteCard, reqLikeCard, reqDelLikeCard, reqUpAvatarProfile} from '../src/scripts/api.js';

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
const newCardForm = document.forms['new-place'];
const editProfileForm = document.forms['edit-profile']; /* форма в редактировании профиля */
const profileTitle = document.querySelector('.profile__title'); /* заголовок профиля на странице */
const profileDescription = document.querySelector('.profile__description'); /* описание профиля на странице */
const profileImage = document.querySelector('.profile__image'); /* изображение профиля */
const popupTypeUpAvatarProfile = document.querySelector('.popup_type_up-avatar-profile') /* попап редактировании аватара профиля */
const upAvatarProfileForm = document.forms['up-avatar-profile']; /* форма в редактировании аватара профиля */

//config валидации для функции enableValidation
const validationConfig = { 
  formElement: '.popup__form',
  inputElement: '.popup__input',
  popupButton: '.popup__button',
  inactiveButton: 'popup__button_disabled',
  inputError: 'form__input_type_error',
  errorClass: 'form__input_error-message_active'
};

//config для запросов
const requestConfig = { 
  url: 'https://nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: 'ab515fff-940f-4e9b-9840-51fb28576ff1',
    'Content-Type': 'application/json'
  }
};

//пустой Config для сохранения в нём в будущем
//данных пользователя из запроса на сервер
const profileConfig = {};

//ждём положительного выполнения двух запросов и выполняем изменения данных
//профиля me и вставку карточек в разметку с сервера
Promise.all([reqGetDataProfile(requestConfig),reqGetCards(requestConfig)])
.then(([dataProfile, dataCards]) => {
  changingDataProfile(dataProfile);
  insertingCards(dataCards);
})
.catch((err) => console.log(err))

//функция изменения и сохранение данных профиля
function changingDataProfile(data) {
  saveData(profileConfig, data);
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.setAttribute('style', `background-image: url(${data.avatar})`);
};

//функция сохранение данных профиля в объект {name}Config
function saveData(nameConfig, data) {
  nameConfig.name = data.name;
  nameConfig.about = data.about;
  nameConfig.avatar = data.avatar;
  nameConfig._id = data._id;
  nameConfig.cohort = data.cohort;
};

//функция вставки карточек с сервера в разметку
function insertingCards(cards) {
  const filledCards = cards.map((card) => createCard(card, showCard, deleteCardServer, likeCardServer, profileConfig));
  filledCards.forEach((card) => placesList.append(card));
};

//включаем валидацию всех форм
enableValidation(validationConfig);

//слушатель аватара профиля
profileImage.addEventListener('click', () => {
  clearValidation(upAvatarProfileForm, validationConfig);
  openPopup(popupTypeUpAvatarProfile);
});

//слушатель кнопки открытия окна редактирования профиля
profileEditButton.addEventListener('click', () => {
  openEditPopup();
  clearValidation(editProfileForm, validationConfig);
});

//слушатель кнопки открытия окна добавления карточки
profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard);
  clearValidation(newCardForm, validationConfig);
});

//слушатель формы окна редактировании аватара профиля
upAvatarProfileForm.addEventListener('submit', (evt) => handleUpAvatarProfileForm(evt));

//слушатель формы окна редактирования профиля
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

//слушатель формы окна добавления новой карточки
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

popupClose.forEach((buttonClose) => buttonClose.addEventListener('click', () => closePopup(document.querySelector('.popup_is-opened'))));

//функция колбэк копирования заголовка и описания профиля в инпуты и открытие попапа редактирования профиля
function openEditPopup() {
  editProfileForm.elements['name'].value = profileTitle.textContent;
  editProfileForm.elements['description'].value = profileDescription.textContent;
  openPopup(popupTypeEdit);
};

//функция колбэк для «отправки» формы в окне редактирования аватара профиля
function handleUpAvatarProfileForm(evt) {
  evt.preventDefault();
  const button = upAvatarProfileForm.elements['button'];
  button.textContent = 'Сохранение...';
  const avatar = upAvatarProfileForm.elements['link'].value;
  reqUpAvatarProfile(avatar, requestConfig)
  .then((data) => {
    profileImage.setAttribute('style', `background-image: url(${data.avatar})`);
    closePopup(popupTypeUpAvatarProfile);
    upAvatarProfileForm.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => button.textContent = 'Сохранить')
};

//функция колбэк для «отправки» формы в окне редактирования профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = editProfileForm.elements['name'].value;
  const about = editProfileForm.elements['description'].value;
  const button = editProfileForm.elements['button'];
  button.textContent = 'Сохранение...';
  reqUpDataProfile(name, about, requestConfig)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closePopup(popupTypeEdit);
  })
  .catch((err) => console.log(err))
  .finally(() => button.textContent = 'Сохранить')
};

//функция колбэк для «отправки» формы в окне добавления карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const link = newCardForm.elements['link'].value;
  const name = newCardForm.elements['place-name'].value;
  const button = newCardForm.elements['button'];
  button.textContent = 'Сохранение...';
  reqAddCard(name, link, requestConfig)
  .then((data) => {
    const newCard = createCard(data, showCard, deleteCardServer, likeCardServer, profileConfig);
    placesList.prepend(newCard);
    newCardForm.reset();
    closePopup(popupTypeNewCard);
  })
  .catch((err) => console.log(err))
  .finally(() => button.textContent = 'Сохранить')
};

//функция наполнения данными и открытия попапа с большой картинкой карточки 
function showCard(element) {
  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupCaption.textContent = element.name;
  openPopup(popupTypeImage);
};

//фунция колбэк кнопки удаления карточки по нажатию
function deleteCardServer(evt, card) {
  reqDeleteCard(card._id, requestConfig)
  .then(() => deleteCardLocal(evt))
  .catch((err) => console.log(err))
};

//функция колбэк кнопки лайка карточки по нажатию 
function likeCardServer(evt, card, likeButtonCounter, cardLikeButton) {
  const isLiked = cardLikeButton.classList.contains("card__like-button_is-active");
  const CheckingLikes = isLiked?reqDelLikeCard(card._id, requestConfig):reqLikeCard(card._id, requestConfig);
  CheckingLikes
  .then((data) => likeCardLocak(evt, likeButtonCounter, data))
  .catch((err) => console.log(err))
};

//добавляем класс всем попапап для анимации
popups.forEach((popup) => popup.classList.add('popup_is-animated'));