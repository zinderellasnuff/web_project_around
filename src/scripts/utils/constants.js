import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import { Api } from "../components/Api.js";

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

// Constants for the avatar popup functionality
export const avatarEditIcon = document.querySelector(
  ".profile__avatar-edit-icon"
); // Ícono de edición
export const avatarPopup = document.querySelector(".popup-avatar");
export const avatarCloseButton = document.querySelector(".popup__close-button");
export const avatarForm = document.querySelector(".popup-avatar__form");
export const avatarInput = document.querySelector("#avatar-url");

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

//Instancia Api
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10", // Asegúrate de que la URL sea correcta
  headers: {
    authorization: "541d0e53-114b-4fb1-9af0-b09c04c191b9", // Tu token de autorización
    "Content-Type": "application/json",
  },
});

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
