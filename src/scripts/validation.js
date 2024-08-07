

//валидация формы 

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
inputElement.classList.add(validationConfig.inputErrorClass)
 errorElement.textContent = errorMessage;
 errorElement.classList.add(validationConfig.errorClass)
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass)
  errorElement.classList.remove(validationConfig.errorClass)
  errorElement.textContent = ''
};

const isValid = (formElement, inputElement, validationConfig) => {
  if(inputElement.validity.patternMismatch) {
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

//Добавление обработчиков всем полям формы

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)

// чтобы проверить состояние кнопки в самом начале
toggleButtonState(inputList, buttonElement, validationConfig);

inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    isValid (formElement, inputElement, validationConfig);
    // чтобы проверять его при изменении любого из полей
    toggleButtonState(inputList, buttonElement, validationConfig);
  });
});
}; 

export const enableValidation = (validationConfig) => {
// Найдём все формы с указанным классом в DOM,
// сделаем из них массив методом Array.from
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

formList.forEach((formElement) => { // Обойдём все элементы полученной коллекции
  setEventListeners(formElement, validationConfig); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
}); 
};



const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { // возвращайте результат работы метода some для массива inputList.
    return !inputElement.validity.valid;
  })
};


const toggleButtonState = ( inputList, buttonElement, validationConfig) => { // функцию, которая отвечает за блокировку кнопки 
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass)
  }
};

export const clearValidation = (formElement, validationConfig) => {
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig)
  })
  toggleButtonState(inputList, buttonElement, validationConfig)
}


