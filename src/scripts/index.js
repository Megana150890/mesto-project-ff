import "../pages/index.css";
import { initialCards } from "../components/initialCards.js";
import { createCard, deleteCard, addLike } from "./card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { enableValidation } from "./validation.js";
import { editProfileInfo, getDataProfile, getInitialCards, postCard} from "./api.js";
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу

// initialCards.forEach((item) => {
//   placesList.append(createCard(item, deleteCard, addLike, openPopupImg));
// });

const popups = document.querySelectorAll(".popup");
const editPopupButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const closePopupButton = profilePopup.querySelector(".popup__close");
const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const closeNewCArdPopupButton = newCardPopup.querySelector(".popup__close");
const imgPopup = document.querySelector(".popup_type_image"); // попап карточки
const openImage = document.querySelector(".popup__image");
const openImageCaption = document.querySelector(".popup__caption");
const closeImgPopup = imgPopup.querySelector(".popup__close");

// для редактиварония формы
const profileFormElement = document.forms["edit-profile"];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;
const profileName = document.querySelector(".profile__title"); // DOM узел место имени
const profileJob = document.querySelector(".profile__description"); // DOM узел место работы

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
 function openPopupImg(link, name) {
  openPopup(imgPopup);
  openImage.src = link;
  openImage.alt = name;
  openImageCaption.textContent = name;
}


// функция редактирования данных

function editFormSubmit(evt) {
    evt.preventDefault();

  const popupElement = document.querySelector(".popup_is-opened");

  renderLoading(true, popupElement);

  editProfileInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then(() => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closePopup(profilePopup);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    })
  }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener("submit", editFormSubmit);



//для добавления карточки
const addNewCardForm = document.forms["new-place"];
const namePlaceInput = addNewCardForm.querySelector('.popup__input_type_card-name'); // поля формы добавления карточки - название
const linkPlaceInput = addNewCardForm.querySelector('.popup__input_type_url');

// функция добавления карточки

// function addNewPlace(element) {
//   element.preventDefault();

//   const createNewCard = {
//     name: namePlaceInput.value,
//     link: linkPlaceInput.value,
//   };

//   const newCardAdd = createCard(createNewCard, deleteCard);

//   placesList.prepend(newCardAdd);
//   closePopup(newCardPopup);
//   element.target.reset();
// }

addNewCardForm.addEventListener("submit", addNewPlace);

popups.forEach(function (element) {
  element.classList.add("popup_is-animated");
});

// функция добавления карточки

function addNewPlace(evt) { // функция обработчик отправки формы добавления карточки
  evt.preventDefault();

  const initialCard = { // Создаю объект с данными для передачи в функцию - postCard
    name: namePlaceInput.value,
    link: linkPlaceInput.value
  }

  postCard(initialCard) // отправляю данные новой карточки на сервер
  .then((res) => {
    placesList.prepend(createCard(res, res.owner, openPopupImg, deleteCard, addLike)); // создаю новую карточку 
    closePopup(newCardPopup);
    evt.target.reset(); // Сбрасываю значения полей
  })
  .catch((error) => {
        console.error("Произошла ошибка:", error);
      })
  // .finally(() => {
  //   renderLoading(false, evt.submitter);
  // })
}



enableValidation();
getDataProfile();


function renderLoading(isLoading, popupElement) {
  const activeButton = popupElement.querySelector(".popup__button");
  if (isLoading) {
    activeButton.textContent = "Сохранение...";
  } else {
    activeButton.textContent = "Сохранить";
  }
}


Promise.all([getDataProfile(), getInitialCards()]).then(
  ([info, initialCards]) => {
    initialCards.forEach((dataCard) => { 
      placesList.append(createCard(dataCard, info._id, openPopupImg, deleteCard, addLike, ));
    });
    profileName.textContent = info.name; 
    profileJob.textContent = info.about;
  })
  .catch((err) => {           
    console.log(err);
    })
  