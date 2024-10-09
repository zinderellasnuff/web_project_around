export class PopupWithConfirmation {
  constructor(popupSelector, handleDeleteCard) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleDeleteCard = handleDeleteCard; // Función que realmente borra la tarjeta
    this._confirmButton = this._popupElement.querySelector(
      ".popup__button-confirm"
    ); // Selector del botón de confirmar
    this._closeButton = this._popupElement.querySelector(
      ".popup__close-button"
    ); // Selector del botón de cerrar
    this._setEventListeners();
  }

  open(cardId) {
    this._cardId = cardId; // Guardar el ID de la tarjeta que se eliminará
    this._popupElement.style.display = "flex"; // Abrir el popup
  }

  close() {
    this._popupElement.style.display = "none"; // Cerrar el popup
  }

  _setEventListeners() {
    this._confirmButton.addEventListener("click", () => {
      this._handleDeleteCard(this._cardId); // Llama a la función para borrar la tarjeta
      this.close();
    });

    this._closeButton.addEventListener("click", () => {
      this.close(); // Cerrar el popup al hacer clic en el botón de cerrar
    });

    this._popupElement.addEventListener("click", (event) => {
      if (event.target === this._popupElement) {
        this.close(); // Cerrar el popup si se hace clic fuera de él
      }
    });
  }
}
