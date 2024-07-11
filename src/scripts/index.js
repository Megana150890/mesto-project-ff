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
  placesList.append(createCard(item, deleteCard, openPopupImg));
});


const editPopupButton = document.querySelector ('.profile__edit-button')
const profilePopup = document.querySelector ('.popup_type_edit')
const closePopupButton = profilePopup.querySelector ('.popup__close');
const profileAddButton = document.querySelector ('.profile__add-button')
const newCardPopup = document.querySelector ('.popup_type_new-card')
const closeNewCArdPopupButton = newCardPopup.querySelector ('.popup__close');
const imgPopup = document.querySelector ('.popup_type_image')
const openImage = imgPopup.querySelector('.popup__image');
const openImageCaption = imgPopup.querySelector('.popup__caption')

//окртыие popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keyup', popupCloseEsc)
  document.addEventListener('mouseup', popupCloseOverlay)
}

editPopupButton.addEventListener('click', function () {
  openPopup(profilePopup);
}); 
 

profileAddButton.addEventListener('click', function() {
  openPopup(newCardPopup)
});

// открытие картинки


function openPopupImg(item) {
  openImage.src = item.link;
  openImage.alt = item.name;
  openImageCaption.textContent = item.name;
  openPopup(imgPopup);
}

// //закрытие popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', popupCloseEsc)
  document.removeEventListener('mouseup', popupCloseOverlay)
}

closePopupButton.addEventListener('click', function() {
  closePopup(profilePopup)

});

closeNewCArdPopupButton.addEventListener('click', function() {
  closePopup(newCardPopup)

});

// закртиые кнопкой Esc
function popupCloseEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
closePopup(openedPopup)
  }
}

// закрытие на оверлей
function popupCloseOverlay (evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
}
}






// Редактирование имени и информации о себе
// Находим форму в DOM
const formElement = document.querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = formElement.elements.name;
const jobInput = formElement.querySelector('.popup__input_type_description')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 