import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

// Elementos del perfil
export const editButton = document.querySelector(".profile__info-button");
export const profilePopup = document.querySelector(".popup--edit-profile");
export const profileCloseButton = profilePopup.querySelector(
  ".popup__close-button"
);
export const profileName = document.querySelector(".profile__info-name");
export const profileSubtitle = document.querySelector(
  ".profile__info-subtitle"
);
export const profileForm = profilePopup.querySelector(".popup__form");
export const profileNameInput = profilePopup.querySelector("#popup-name");
export const profileAboutInput = profilePopup.querySelector("#popup-about");

// Elementos para añadir tarjeta
export const addCardButton = document.querySelector(".profile__button-add");
export const addCardPopup = document.querySelector(".popup--add-card");
export const addCardCloseButton = addCardPopup.querySelector(
  ".popup__close-button"
);
export const addCardForm = addCardPopup.querySelector(".popup__form--add-card");
export const cardNameInput = addCardPopup.querySelector("#card-name");
export const cardImageInput = addCardPopup.querySelector("#card-image");

// Contenedor de elementos
export const elementsContainer = document.querySelector(".elements__container");

// Configuración de validación
export const profileFormConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const addCardFormConfig = {
  formSelector: ".popup__form--add-card",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Tarjetas iniciales
export const initialCards = [
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
