// @todo: Темплейт карточки
const cardTmp = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(dataCard, deleteCard, addLike, openPopupImg) {
  const cardElement = cardTmp.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", deleteCard);

  cardImage.addEventListener("click", () => {
    openPopupImg(dataCard.link, dataCard.name);
  });

  // функция добавления лайка
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", addLike);

  return cardElement;
}

// @todo: Функция удаления карточки

export function deleteCard(evt) {
  const listItem = evt.target.closest(".card");
  listItem.remove();
}

export function addLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}