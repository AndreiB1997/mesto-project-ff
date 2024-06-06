


//создание и вывод шаблона-карточки
function createCard(link, name) {
  const placesList = document.querySelector('.places__list');
  const cardTemplate = document.querySelector('#card-template').content;
  
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__image').alt = name;
  placesItem.querySelector('.card__title').textContent = name;

  const cardDeleteButton = placesItem.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', cardDelete(placesItem))

  placesList.append(placesItem);

}

//наполнение и вывод всех карточек из массива
initialCards.forEach(function(card){
  createCard(card.link, card.name)
})

function cardDelete(card) {
  card.remove()
}






