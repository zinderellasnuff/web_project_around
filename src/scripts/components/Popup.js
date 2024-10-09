export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners(); // Mantiene los listeners configurados correctamente
  }

  open() {
    this._popup.classList.add("popup_opened"); // Cambiar uso de display a clases CSS
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened"); // Cambiar uso de display a clases CSS
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Listener del botón de cerrar
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => this.close());

    // Cerrar el popup al hacer click fuera de la ventana
    this._popup.addEventListener("click", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
