import "../pages/index.css";
import {initialCards} from './cards.js'
// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(dataCard, deleteCard, addLike, openPopupImg) {
  const cardElement = cardTmp.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title')
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', deleteCard);


  cardElement.addEventListener('click', () => {
    openPopupImg(dataCard.link, dataCard.name);
  });

  // функция добавления лайка
const likeButton = cardElement.querySelector('.card__like-button');
likeButton.addEventListener('click', addLike)


  
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
}



// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, addLike,  openPopupImg));
});


const editPopupButton = document.querySelector ('.profile__edit-button');
const profilePopup = document.querySelector ('.popup_type_edit');
const closePopupButton = profilePopup.querySelector ('.popup__close');
const profileAddButton = document.querySelector ('.profile__add-button');
const newCardPopup = document.querySelector ('.popup_type_new-card');
const closeNewCArdPopupButton = newCardPopup.querySelector ('.popup__close');
const imgPopup = document.querySelector ('.popup_type_image');
const openImage = imgPopup.querySelector('.popup__image');
const openImageCaption = imgPopup.querySelector('.popup__caption');
const closeImgPopup = imgPopup.querySelector ('.popup__close');

// для редактиварония формы
const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');






//окртыие popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', popupCloseEsc)
  document.addEventListener('mouseup', popupCloseOverlay)
}

editPopupButton.addEventListener('click', function () {
  openPopup(profilePopup);
}); 
 

profileAddButton.addEventListener('click', function() {
  openPopup(newCardPopup)
});




// //закрытие popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', popupCloseEsc)
  document.removeEventListener('mouseup', popupCloseOverlay)
}

closePopupButton.addEventListener('click', function() {
  closePopup(profilePopup)

});

closeNewCArdPopupButton.addEventListener('click', function() {
  closePopup(newCardPopup)

});

closeImgPopup.addEventListener('click', function() {
  closePopup(imgPopup)
});

// закрттие кнопкой Esc
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


// функция сохранения данных

editPopupButton.addEventListener ('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
     openPopup(profilePopup)
});

// функция редактирования данных
function handleFormSubmit(evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closePopup(profilePopup)
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleFormSubmit); 


//для добавления карточки
const addNewCardForm = document.forms['new-place'];
const namePlaceInput = addNewCardForm.elements['place-name'];
const linkPlaceInput = addNewCardForm.elements.link;
// const placeName = document.querySelector('.popup__input_type_card-name');
// const linkPlace = document.querySelector('.popup__input_type_url');



// функция добавления карточки
function addNewPlace(element) {
  element.preventDefault();
  const createNewCard = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value
  };

const newCardAdd = createCard(createNewCard, deleteCard );

placesList.prepend(newCardAdd);
closePopup(newCardPopup);
element.target.reset();

}

addNewCardForm.addEventListener('submit', addNewPlace);



function addLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active')
  
}

// открытие картинки
function openPopupImg (link, name) {
  openImage.src = link;
  openImage.alt = name; 
  openImageCaption.textContent = name;
  openPopup(imgPopup);
}