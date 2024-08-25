import { enableValidation, resetValidation } from "./validate.js";

document.addEventListener("DOMContentLoaded", () => {
  // Elementos de perfil
  const editButton = document.querySelector(".profile__info-button");
  const profilePopup = document.querySelector(".popup--edit-profile");
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
    resetValidation(profileForm, profileFormConfig);
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
    resetValidation(addCardForm, addCardFormConfig);
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
      .addEventListener("click", () => {
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
    const modalImg = modalElement.querySelector(".modal__image");
    const modalCaption = modalElement.querySelector(".modal__caption");
    const closeButton = modalElement.querySelector(".modal__close");

    modalImg.src = src;
    modalCaption.textContent = caption;
    modal.style.display = "flex";

    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.removeChild(modalElement);
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.removeChild(modalElement);
      }
    });

    document.body.appendChild(modalElement);
  }

  // Función para cerrar popup al hacer clic en la superposición
  function closePopupOnOverlayClick(event) {
    if (event.target === profilePopup) {
      closeProfilePopup();
    } else if (event.target === addCardPopup) {
      closeAddCardPopup();
    }
  }

  // Función para cerrar popup al presionar Esc
  function closePopupOnEsc(event) {
    if (event.key === "Escape") {
      closeProfilePopup();
      closeAddCardPopup();
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => {
        modal.style.display = "none";
        document.body.removeChild(modal);
      });
    }
  }

  // Configuraciones para validación
  const profileFormConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const addCardFormConfig = {
    formSelector: ".popup__form--add-card",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

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

  editButton.addEventListener("click", openProfilePopup);
  profileCloseButton.addEventListener("click", closeProfilePopup);
  profilePopup.addEventListener("click", closePopupOnOverlayClick);

  addCardButton.addEventListener("click", openAddCardPopup);
  addCardCloseButton.addEventListener("click", closeAddCardPopup);
  addCardPopup.addEventListener("click", closePopupOnOverlayClick);

  profileForm.addEventListener("submit", handleProfileFormSubmit);
  addCardForm.addEventListener("submit", handleAddCardFormSubmit);

  document.addEventListener("keydown", closePopupOnEsc);

  // Activar la validación
  enableValidation(profileFormConfig);
  enableValidation(addCardFormConfig);
});
