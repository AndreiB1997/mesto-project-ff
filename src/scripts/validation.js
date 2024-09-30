export {clearValidation, enableValidation};

//функция включения валидности
function enableValidation(validationConfig) { 
  const formList = Array.from(document.querySelectorAll(validationConfig.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(formElement, validationConfig);
  })
};

//функция установки слушателя input форме
function setEventListeners(formElement, validationConfig) { 
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));
  const popupButton = formElement.querySelector(validationConfig.popupButton);
  toggleButtonState(inputList, popupButton, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, popupButton, validationConfig);
    })
  })
};

//функция переключения активности кнопки в форме
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButton);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButton);
  }
};

//функция проверки на наличие хотя бы одного неверно заполненного поля ввода
function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  })
};

//функция проверки инпута на валидность
function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

//функция отображения ошибки в инпуте
function showInputError(formElement, inputElement, errorMessage, validationConfig) { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); /* span с текстом ошибки */
  inputElement.classList.add(validationConfig.inputError); /* добавляем красное подчёркивание инпуту при ошибке */
  errorElement.textContent = errorMessage; /* добовляем span с текстом ошибки */
  errorElement.classList.add(validationConfig.errorClass); /* делаем видимым span с текстом ошибки */
};

//функция скрытия ошибки в инпуте
function hideInputError(formElement, inputElement, validationConfig) { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); /* span с текстом ошибки */
  inputElement.classList.remove(validationConfig.inputError);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

//функция очистки валидации полей
function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));
  const buttonElement = formElement.querySelector(validationConfig.popupButton);
  inputList.forEach((inputElement) => hideInputError(formElement, inputElement, validationConfig));
  toggleButtonState(inputList, buttonElement, validationConfig);
};