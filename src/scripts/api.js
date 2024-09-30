export {reqGetDataProfile, reqGetCards, reqUpDataProfile, reqAddCard, reqDeleteCard, reqLikeCard, reqDelLikeCard, reqUpAvatarProfile};

//функция проверки результата
function checRes(res, err) {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(err);
  }
};

//Функция запроса данных me профиля GET
function reqGetDataProfile(requestConfig) {
  return fetch(`${requestConfig.url}/users/me`, {
    headers: requestConfig.headers
  }).then((res) => checRes(res, `Ошибка: ${res.status} во время запроса информации о профиле.`));
};

//функция-запрос изменения данных me профиля пользователя PATCH
function reqUpDataProfile(name, about, requestConfig) {
  return fetch(`${requestConfig.url}/users/me`, {
    method: 'PATCH',
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then((res) => checRes(res, `Ошибка: ${res.status} во время запроса изменения профиля.`));
};

//функция запроса карточек с сервера GET
function reqGetCards(requestConfig) {
  return fetch(`${requestConfig.url}/cards`, {
    headers: requestConfig.headers
  }).then((res) => checRes(res, `Ошибка: ${res.status} во время запроса карточек.`));
};

//функция-запрос добавления карточки на сервер POST
function reqAddCard(name, link, requestConfig) {
  return fetch(`${requestConfig.url}/cards`, {
    method: 'POST',
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then((res) => checRes(res, `Ошибка: ${res.status} во время запроса на добавление карточки.`));
};

//функция-запрос удаления карточки на сервере DELETE
function reqDeleteCard(cardId, requestConfig) {
  return fetch(`${requestConfig.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: requestConfig.headers,
  }).then((res) => checRes(res, `Ошибка: ${res.status} во время запроса на удаление карточки.`));
};

//функция-запрос постановки лайка карточке PUT
function reqLikeCard(cardId, requestConfig) {
  return fetch(`${requestConfig.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: requestConfig.headers,
  }).then((res) => checRes(res, `Ошибка: ${res.status} во время запроса добавления лайка.`));
};

//функция-запрос снятия лайка карточке DELETE
function reqDelLikeCard(cardId, requestConfig) {
  return fetch(`${requestConfig.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: requestConfig.headers,
  }).then((res) => checRes(res, `Ошибка: ${res.status} во время запроса удаления лайка.`));
};

//функция-запрос изменения аватара профиля на сервер PATCH
function reqUpAvatarProfile(avatar, requestConfig) {
  return fetch(`${requestConfig.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: requestConfig.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  }).then((res) => checRes(res, `Ошибка: ${res.status} во время запроса на изменение аватара профиля.`));
};