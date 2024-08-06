import { deleteCardOnServer, putLikeCard, deleteLikeCard} from "./api";




// @todo: Темплейт карточки
const cardTmp = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(dataCard, userId, deleteCard, addLike, openPopupImg) {
  const cardElement = cardTmp.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;


  cardImage.addEventListener("click", () => {
    openPopupImg(dataCard.link, dataCard.name);
  });


  const deleteButton = cardElement.querySelector(".card__delete-button"); //кнопка удаления
  const userCardId = dataCard.owner['_id'];
  const cardId = dataCard._id;

  if(userId === userCardId) {
    deleteButton.addEventListener('click', () => {
      deleteCardOnServer(cardId)
          .then(() => {
            deleteCard(deleteButton);
          })
          .catch((err) => {
            console.log(err);
          });
    });
  }
  else {
    deleteButton.hidden = true;
  };




  deleteButton.addEventListener("click", deleteCard);

  const likeButton = cardElement.querySelector(".card__like-button"); //кнопка лайка карточки
  const iconLikeCount = cardElement.querySelector('.current-value-likes');  // span кол-ва лайков карточки
  const likes = dataCard.likes; //  массив лайкнувших карточку
  const likesCount = likes.length; // переменная счетчик и помещаю в нее длинну массива лайкнувших карточку
  iconLikeCount.textContent = likesCount // всятавляется значение в спан

  if (likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }


  likeButton.addEventListener('click', () => {

    if(likeButton.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(cardId)
      .then((res) => {
        likeButton.classList.toggle('card__like-button_is-active')
        const updatedLikes = res.likes;
        const likesCount = updatedLikes.length;
        iconLikeCount.textContent = likesCount;
        dataCard.likes = updatedLikes;
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else {
      putLikeCard(cardId, likesCount)
        .then((res) => {
          addLike(likeButton, res, iconLikeCount);
          dataCard.likes = res.likes;
        })
        .catch((err) => {
        console.log(err);
        })
    }
  });
  return cardElement; // возращаем карточку
}


  




  // функция добавления лайка
  
export function addLike(likeButton, res, iconLikeCount) {
  likeButton.classList.toggle('card__like-button_is-active')
  const likes = res.likes;
  const likesCount = likes.length;
  iconLikeCount.textContent = likesCount;
}


//  Функция удаления карточки

export function deleteCard(evt) { // @todo: Функция удаления карточки
  const listItem = evt.target.closest(".card"); //передаю ближайший родительский элемент и удаляю
  listItem.remove();
};
