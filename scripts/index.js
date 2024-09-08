import { FormValidator } from "./FormValidator.js";
import { Card } from "./card.js";
import { openModal } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del perfil
  const editButton = document.querySelector(".profile__info-button");
  const profilePopup = document.querySelector(".popup--edit-profile");
  const profileCloseButton = profilePopup.querySelector(".popup__close-button");
  const profileName = document.querySelector(".profile__info-name");
  const profileSubtitle = document.querySelector(".profile__info-subtitle");
  const profileForm = profilePopup.querySelector(".popup__form");
  const profileNameInput = profilePopup.querySelector("#popup-name");
  const profileAboutInput = profilePopup.querySelector("#popup-about");

  // Elementos para añadir tarjeta
  const addCardButton = document.querySelector(".profile__button-add");
  const addCardPopup = document.querySelector(".popup--add-card");
  const addCardCloseButton = addCardPopup.querySelector(".popup__close-button");
  const addCardForm = addCardPopup.querySelector(".popup__form--add-card");
  const cardNameInput = addCardPopup.querySelector("#card-name");
  const cardImageInput = addCardPopup.querySelector("#card-image");

  const elementsContainer = document.querySelector(".elements__container");

  // Configuración de validación
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

  // Instancias de validadores
  const profileFormValidator = new FormValidator(
    profileFormConfig,
    profileForm
  );
  const addCardFormValidator = new FormValidator(
    addCardFormConfig,
    addCardForm
  );

  // Habilitar validación
  profileFormValidator.enableValidation();
  addCardFormValidator.enableValidation();

  // Funciones para manejar el popup del perfil
  function openProfilePopup() {
    profileNameInput.value = profileName.textContent;
    profileAboutInput.value = profileSubtitle.textContent;
    profilePopup.style.display = "flex";
    profileFormValidator.resetValidation(); // Resetea la validación
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

  // Funciones para manejar el popup de añadir tarjeta
  function openAddCardPopup() {
    addCardPopup.style.display = "flex";
    addCardFormValidator.resetValidation(); // Resetea la validación
  }

  function closeAddCardPopup() {
    addCardPopup.style.display = "none";
  }

  function handleAddCardFormSubmit(event) {
    event.preventDefault();
    const cardData = {
      name: cardNameInput.value,
      link: cardImageInput.value,
    };
    const card = new Card(cardData, "#card-template", openModal);
    elementsContainer.prepend(card.generateCard());
    closeAddCardPopup();
  }

  // Inicializar tarjetas
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

  initialCards.forEach((data) => {
    const card = new Card(data, "#card-template", openModal);
    elementsContainer.prepend(card.generateCard());
  });

  // Listeners
  editButton.addEventListener("click", openProfilePopup);
  profileCloseButton.addEventListener("click", closeProfilePopup);
  profilePopup.addEventListener("click", (event) => {
    if (event.target === profilePopup) closeProfilePopup();
  });

  addCardButton.addEventListener("click", openAddCardPopup);
  addCardCloseButton.addEventListener("click", closeAddCardPopup);
  addCardPopup.addEventListener("click", (event) => {
    if (event.target === addCardPopup) closeAddCardPopup();
  });

  profileForm.addEventListener("submit", handleProfileFormSubmit);
  addCardForm.addEventListener("submit", handleAddCardFormSubmit);

  // Cerrar popups con Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProfilePopup();
      closeAddCardPopup();
    }
  });
});
