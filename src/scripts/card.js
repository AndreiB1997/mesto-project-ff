export {createCard ,deleteCard, likeCard};

import {cardTemplate} from '../index.js';

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

//фунция удаление карточки
function deleteCard(card) {
  card.remove();
}

//функция колбэк лайка карточки
function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_is-active');
}