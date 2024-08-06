export {initialCards, createCard, likeCard, deleteCard, insertingСards};
import {cardTemplate, placesList, showCard} from '../index.js';

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",},
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
]

//функция создания, наполнения данными template-карточки с кнопкой удаления и лайка
function createCard(link, name, showCard, deleteCard, likeCard) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', () => showCard(link, name, name));
  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = name;
  const cardDeleteButton = card.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCard(card));
  const cardLikeButton = card.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));
  return card;
}

//функция вставки карточек в разметку
function insertingСards() {
  const filledCards = initialCards.map((card) => createCard(card.link, card.name, showCard, deleteCard, likeCard))
  filledCards.forEach((card) => placesList.append(card))
}

//фунция удаление карточки
function deleteCard(card) {
  card.remove();
}

//функция колбэк лайка карточки
function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_is-active');
}



