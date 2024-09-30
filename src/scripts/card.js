export {createCard, deleteCardLocal, likeCardLocak};

import {cardTemplate} from '../index.js';

//функция создания, наполнения данными template-карточки с кнопкой удаления и лайка
function createCard(card, showCard, deleteCard, likeCard, profileConfig) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  const likeButtonCounter = cardElement.querySelector('.like-button__counter');
  likeButtonCounter.textContent = card.likes.length;
  cardImage.addEventListener('click', () => showCard(card));
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = card.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  profileConfig._id !== card.owner._id?cardDeleteButton.remove():cardDeleteButton.addEventListener('click', (evt) => deleteCard(evt, card));
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', (evt) => likeCard(evt, card, likeButtonCounter, cardLikeButton));
  card.likes.some((obj) => obj._id === profileConfig._id)?cardLikeButton.classList.add('card__like-button_is-active'):cardLikeButton.classList.remove('card__like-button_is-active'); /* делаем лайк активным на странице если он стоит на сервере */
  return cardElement;
};

//функция удаления карточки local
function deleteCardLocal(evt) {
  evt.target.closest('.places__item').remove();
}

//функция лайка карточки Local
function likeCardLocak(evt, likeButtonCounter, data) {
  evt.target.classList.toggle('card__like-button_is-active');
  likeButtonCounter.textContent = data.likes.length;
}