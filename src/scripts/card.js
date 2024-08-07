import { deleteCardOnServer, putLikeCard, deleteLikeCard} from "./api";




// @todo: Темплейт карточки
const cardTmp = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(dataCard, userId, openPopupImg, deleteCard, addLike) {
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
    deleteButton.addEventListener('click',(cardElement) => {
          deleteCard(cardElement, cardId) 
  })
  } else {
    deleteButton.remove();
  }


  // deleteButton.addEventListener("click", deleteCard);


  const likeButton = cardElement.querySelector(".card__like-button"); //кнопка лайка карточки
  const iconLikeCount = cardElement.querySelector('.current-value-likes');  // span кол-ва лайков карточки
  const likes = dataCard.likes; //  массив лайкнувших карточку
  const likesCount = likes.length; // переменная счетчик и помещаю в нее длинну массива лайкнувших карточку
  iconLikeCount.textContent = likesCount // всятавляется значение в спан

  if (likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } 

  likeButton.addEventListener('click', () => {

    const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLikeCard : putLikeCard;
  likeMethod(cardId) 
    .then((res) => { 
      addLike(likeButton, res, iconLikeCount); 
      dataCard.likes = res.likes; 
    }) 
    .catch((err) => { 
    console.log(err); 
    })
  })
  

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

  export function deleteCard(card, cardId) {
    deleteCardOnServer(cardId)
      .then(() => {
        card.target.closest('.places__item').remove()
      })
      .catch((err) => {
        console.log('Ошибка, запрос не выполнен', err)
      })
  }
