const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "894f3e2d-4973-45e4-8e7b-8c8a3d21859b",
    "Content-Type": "application/json",
  },
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

// export const editDataProfile = (updateName, updateAbout) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: updateName,
//       about: updateAbout
//     }),
//   }).then(checkRequest);
// }


export const editDataProfile = (info) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
  })
  .then((res) => {
    return checkRequest(res)
  })
}