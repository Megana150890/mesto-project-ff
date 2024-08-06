const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "894f3e2d-4973-45e4-8e7b-8c8a3d21859b",
    "Content-Type": "application/json",
  },
  likesPath: 'likes'
};

//  fetch('https://nomoreparties.co/v1/wff-cohort-19/cards', {
//     headers: {
//       authorization: '894f3e2d-4973-45e4-8e7b-8c8a3d21859b'
//     }
//   })
//     .then(res => res.json())
//     .then((result) => {
//       console.log(result);
//     });

export const checkRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис

};

//Загрузка информации о пользователе с сервера

export const getDataProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(checkRequest);
};


//Загрузка карточек с сервера 
export const  getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(checkRequest)
  .then((res) => {
    return res
  }) 
};


//Редактирование профиля 

export function editProfileInfo({name, about}) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    }),
  })
    .then(checkRequest)
}

// Функция  на добавление карточки на сервер
export function postCard(initialCard) { 
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: initialCard.name,
      link: initialCard.link
    })
  })
  .then(checkRequest);
}

export function deleteCardOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkRequest);
}


export function putLikeCard(cardId, likesLength) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      likes: {likesLength},
      }),
  })
  .then(checkRequest);
}

export function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkRequest);
}