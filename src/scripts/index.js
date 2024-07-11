import "../pages/index.css";
import {initialCards} from './cards.js'
// @todo: Темплейт карточки
const cardTmp = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard, openPopupImg) {
  const cardElement = cardTmp.querySelector('.card').cloneNode(true);
  //    const cardImage = cardElement.querySelector('.card__image');
  //    const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  deleteButton.addEventListener('click', deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const listItem = evt.target.closest(".card");
  listItem.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard));
});


const editPopupButton = document.querySelector ('.profile__edit-button')
const profilePopup = document.querySelector ('.popup_type_edit')
const closePopupButton = profilePopup.querySelector ('.popup__close');
const profileAddButton = document.querySelector ('.profile__add-button')
const newCardPopup = document.querySelector ('.popup_type_new-card')
const closeNewCArdPopupButton = newCardPopup.querySelector ('.popup__close');
const imgPopup = document.querySelector ('.popup_type_image')
const openImage = document.querySelector('.popup__image');
const openImageName = document.querySelector('.popup__caption')

//окртыие popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
}

editPopupButton.addEventListener('click', function () {
  openPopup(profilePopup);
}); 
 

profileAddButton.addEventListener('click', function() {
  openPopup(newCardPopup)
});


  function openPopupImg({link, name}) {

  openImage.src = link;
  openImageName.textContent = name;
  openImageName.alt = name;
  openPopup(imgPopup)
};

// //закрытие popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

closePopupButton.addEventListener('click', function() {
  closePopup(profilePopup)

});

closeNewCArdPopupButton.addEventListener('click', function() {
  closePopup(newCardPopup)

});






