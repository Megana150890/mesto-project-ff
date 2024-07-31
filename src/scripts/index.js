import "../pages/index.css";
import { initialCards } from "../components/initialCards.js";
import { createCard, deleteCard, addLike } from "./card.js";
import { openPopup, closePopup } from "../components/modal.js";
import {enableValidation} from "./validation.js"
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, addLike, openPopupImg));
});

const popups = document.querySelectorAll(".popup");
const editPopupButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const closePopupButton = profilePopup.querySelector(".popup__close");
const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const closeNewCArdPopupButton = newCardPopup.querySelector(".popup__close");
const imgPopup = document.querySelector(".popup_type_image");
const openImage = imgPopup.querySelector(".popup__image");
const openImageCaption = imgPopup.querySelector(".popup__caption");
const closeImgPopup = imgPopup.querySelector(".popup__close");

// для редактиварония формы
const profileFormElement = document.forms["edit-profile"];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// функция сохранения данных

editPopupButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
});

profileAddButton.addEventListener("click", function () {
  openPopup(newCardPopup);
});

closePopupButton.addEventListener("click", function () {
  closePopup(profilePopup);
});

closeNewCArdPopupButton.addEventListener("click", function () {
  closePopup(newCardPopup);
});

closeImgPopup.addEventListener("click", function () {
  closePopup(imgPopup);
});

// открытие  картинки  попап
export function openPopupImg(link, name) {
  openImage.src = link;
  openImage.alt = name;
  openImageCaption.textContent = name;
  openPopup(imgPopup);
}

// функция редактирования данных
function editFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener("submit", editFormSubmit);

//для добавления карточки
const addNewCardForm = document.forms["new-place"];
const namePlaceInput = addNewCardForm.elements["place-name"];
const linkPlaceInput = addNewCardForm.elements.link;

// функция добавления карточки
function addNewPlace(element) {
  element.preventDefault();
  const createNewCard = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value,
  };

  const newCardAdd = createCard(createNewCard, deleteCard);

  placesList.prepend(newCardAdd);
  closePopup(newCardPopup);
  element.target.reset();
}

addNewCardForm.addEventListener("submit", addNewPlace);

popups.forEach(function (element) {
  element.classList.add("popup_is-animated");
});

enableValidation(); 
