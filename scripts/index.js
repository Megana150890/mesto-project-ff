// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;



// @todo: DOM узлы
const  placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCard ) {
   const cardElement = cardTmp.querySelector('.card').cloneNode(true);
//    const cardImage = cardElement.querySelector('.card__image');
//    const cardTitle = cardElement.querySelector('.card__title');
   const deleteButton = cardElement.querySelector('.card__delete-button');
   cardElement.querySelector('.card__image').src = card.link;
   cardElement.querySelector('.card__image').alt = card.name;
   cardElement.querySelector('.card__title').textContent = card.name;
   deleteButton.addEventListener('click', deleteCard);
   return cardElement;
}



// @todo: Функция удаления карточки

function deleteCard(evt) {
    const listItem = evt.target.closest('.card')
    listItem.remove();
}



// @todo: Вывести карточки на страницу


initialCards.forEach((item) => {
    placesList.append(createCard(item, deleteCard));
});