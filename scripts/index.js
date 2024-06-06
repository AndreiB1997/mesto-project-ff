const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

//создание и вывод шаблона-карточки с кнопкой удаления
function createCard(link, name, deleteCard) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__image').alt = name;
  placesItem.querySelector('.card__title').textContent = name;

  const cardDeleteButton = placesItem.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCard(placesItem));

  placesList.append(placesItem);
  return placesItem;
}

//удаление карточки
function deleteCard(card) {
  card.remove()
}

//наполнение данными и вывод всех карточек из массива
initialCards.forEach(function(card){
  createCard(card.link, card.name, deleteCard)
})








