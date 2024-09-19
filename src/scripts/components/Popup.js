// Popup.js
export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners(); // Asegúrate de que los listeners se configuren correctamente al instanciar la clase.
  }

  open() {
    this._popup.style.display = "flex";
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.style.display = "none";
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
