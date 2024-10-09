export class Card {
  constructor(
    data,
    templateSelector,
    handleOpenModal,
    userId,
    handleDeleteCard // Callback para manejar la eliminación
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleOpenModal = handleOpenModal;
    this._id = data._id;
    this._element = null; // Inicializa _element aquí
    this._handleDeleteCard = handleDeleteCard; // Asigna la función de callback
  }

  // Obtiene el template de la tarjeta
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__article")
      .cloneNode(true);
  }

  // Maneja el cambio de estado del icono de "me gusta"
  _handleLikeIcon() {
    const likeButton = this._element.querySelector(".element__button-like");
    likeButton.classList.toggle("element__button-like-active");

    if (likeButton.classList.contains("element__button-like-active")) {
      this._likes.push("like"); // Agrega un "like"
    } else {
      this._likes.pop(); // Remueve un "like"
    }

    this._updateLikesCount(); // Actualiza la cuenta de likes
  }

  // Actualiza la cuenta de likes en el DOM
  _updateLikesCount() {
    const likesCountElement = this._element.querySelector(
      ".element__likes-count"
    );
    likesCountElement.textContent = this._likes.length; // Muestra el número actual de likes
  }

  // Maneja el clic en el botón de eliminar
  _handleDeleteCardClick() {
    this._handleDeleteCard(this._id); // Llama a la función de eliminación con el ID de la tarjeta
  }

  // Configura los event listeners para la tarjeta
  _setEventListeners() {
    this._element
      .querySelector(".element__button-like")
      .addEventListener("click", () => {
        this._handleLikeIcon(); // Llama a la función de "me gusta"
      });

    const trashButton = this._element.querySelector(".element__button-trash");
    if (this._ownerId === this._userId) {
      trashButton.addEventListener("click", () => {
        this._handleDeleteCardClick(); // Llama al método para manejar la eliminación
      });
    } else {
      trashButton.style.display = "none"; // Oculta el botón de eliminar si no es el propietario
    }

    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => {
        this._handleOpenModal(this._link, this._name); // Llama a la función para abrir el modal
      });
  }

  // Genera y retorna el elemento de la tarjeta
  generateCard() {
    this._element = this._getTemplate(); // Obtiene el template
    this._element.setAttribute("data-card-id", this._id); // Añade el ID de la tarjeta
    this._element.querySelector(".element__img").src = this._link;
    this._element.querySelector(".element__img").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    this._updateLikesCount(); // Muestra la cantidad de likes
    this._setEventListeners(); // Configura los listeners de eventos

    return this._element; // Devuelve el elemento de la tarjeta
  }
}
