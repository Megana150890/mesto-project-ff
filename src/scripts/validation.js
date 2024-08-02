
const  validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
  

//валидация формы 

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
   inputElement.classList.add('popup__input_type_error');
   errorElement.textContent = errorMessage;
   errorElement.classList.add('popup__error_visible');
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  };

  const isValid = (formElement, inputElement) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

//Добавление обработчиков всем полям формы

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid (formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

export const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};


  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => { // возвращайте результат работы метода some для массива inputList.
      return !inputElement.validity.valid;
    })
  };

  
  const toggleButtonState = ( inputList, buttonElement) => { // функцию, которая отвечает за блокировку кнопки 
    if(hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
  buttonElement.classList.add('popup__button_disabled')
    } else {
        buttonElement.disabled = false;
      buttonElement.classList.remove('popup__button_disabled')
    }
  };




  