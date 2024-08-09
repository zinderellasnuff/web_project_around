document.addEventListener("DOMContentLoaded", () => {
  // Elementos de perfil
  const editButton = document.querySelector(".profile__info-button");
  const profilePopup = document.querySelector(".popup");
  const profileCloseButton = profilePopup.querySelector(".popup__close-button");
  const profileName = document.querySelector(".profile__info-name");
  const profileSubtitle = document.querySelector(".profile__info-subtitle");
  const profileForm = profilePopup.querySelector(".popup__form");
  const profileNameInput = profilePopup.querySelector("#popup-name");
  const profileAboutInput = profilePopup.querySelector("#popup-about");

  // Elementos para añadir tarjetas
  const addCardButton = document.querySelector(".profile__button-add");
  const addCardPopup = document.querySelector(".popup--add-card");
  const addCardCloseButton = addCardPopup.querySelector(".popup__close-button");
  const addCardForm = addCardPopup.querySelector(".popup__form--add-card");
  const cardNameInput = addCardPopup.querySelector("#card-name");
  const cardImageInput = addCardPopup.querySelector("#card-image");

  // Elementos para las tarjetas y modal
  const elementsContainer = document.querySelector(".elements__container");
  const cardTemplate = document.querySelector("#card-template").content;
  const modalTemplate = document.querySelector("#modal-template").content;

  // Funciones de perfil
  function openProfilePopup() {
    profileNameInput.value = profileName.textContent;
    profileAboutInput.value = profileSubtitle.textContent;
    profilePopup.style.display = "flex";
  }

  function closeProfilePopup() {
    profilePopup.style.display = "none";
  }

  function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileSubtitle.textContent = profileAboutInput.value;
    closeProfilePopup();
  }

  // Funciones para añadir tarjetas
  function openAddCardPopup() {
    addCardPopup.style.display = "flex";
  }

  function closeAddCardPopup() {
    addCardPopup.style.display = "none";
  }

  function handleAddCardFormSubmit(event) {
    event.preventDefault();
    const cardName = cardNameInput.value;
    const cardImage = cardImageInput.value;
    addCard({ name: cardName, link: cardImage });
    closeAddCardPopup();
  }

  // Funciones para tarjetas y modal
  function addCard(card) {
    const cardElement = cardTemplate.cloneNode(true);
    const articleElement = cardElement.querySelector(".element__article");

    articleElement.querySelector(".element__img").src = card.link;
    articleElement.querySelector(".element__img").alt = card.name;
    articleElement.querySelector(".element__title").textContent = card.name;

    // Añadir funcionalidad de like
    const likeButton = articleElement.querySelector(".element__button-like");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("element__button-like-active");
    });

    // Eliminar tarjeta
    articleElement
      .querySelector(".element__button-trash")
      .addEventListener("click", function () {
        articleElement.remove();
      });

    // Mostrar imagen en modal
    articleElement
      .querySelector(".element__img")
      .addEventListener("click", () => {
        openModal(card.link, card.name);
      });

    elementsContainer.prepend(articleElement);
  }

  function openModal(src, caption) {
    const modalElement = modalTemplate.cloneNode(true);
    const modal = modalElement.querySelector(".modal");
    const modalImg = modalElement.querySelector(".modal__contenido");
    const modalCaption = modalElement.querySelector(".modal__caption");
    const closeButton = modalElement.querySelector(".modal__close");

    modalImg.src = src;
    modalCaption.textContent = caption;
    modal.style.display = "block";

    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    document.body.appendChild(modalElement);
  }

  // Inicializa las tarjetas iniciales
  const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    },
  ];

  initialCards.forEach(addCard);

  // Añadir event listeners
  editButton.addEventListener("click", openProfilePopup);
  profileCloseButton.addEventListener("click", closeProfilePopup);
  profileForm.addEventListener("submit", handleProfileFormSubmit);

  addCardButton.addEventListener("click", openAddCardPopup);
  addCardCloseButton.addEventListener("click", closeAddCardPopup);
  addCardForm.addEventListener("submit", handleAddCardFormSubmit);
});
