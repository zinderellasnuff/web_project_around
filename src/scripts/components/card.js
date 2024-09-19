export class Card {
  constructor(data, templateSelector, handleOpenModal) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenModal = handleOpenModal;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__article")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".element__button-like")
      .classList.toggle("element__button-like-active");
  }

  _handleDeleteCard() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__button-like")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".element__button-trash")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._handleOpenModal(this._link, this._name);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__img").src = this._link;
    this._element.querySelector(".element__img").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
