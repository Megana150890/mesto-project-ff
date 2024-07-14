

//окртыие popup
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', popupCloseEsc)
    document.addEventListener('mouseup', popupCloseOverlay)
  }

  // //закрытие popup
  export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', popupCloseEsc)
    document.removeEventListener('mouseup', popupCloseOverlay)
  }

  
// закрsтие кнопкой Esc
export function popupCloseEsc (evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
  closePopup(openedPopup)
    }
  }
  
  // закрытие на оверлей
  export function popupCloseOverlay (evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(evt.target);
  }
  }