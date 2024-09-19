import "./pages/index.css";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Card } from "./scripts/components/card.js";
import { openModal } from "./scripts/utils.js";
import {
  editButton,
  profilePopup,
  profileCloseButton,
  profileName,
  profileSubtitle,
  profileForm,
  profileNameInput,
  profileAboutInput,
  addCardButton,
  addCardPopup,
  addCardCloseButton,
  addCardForm,
  cardNameInput,
  cardImageInput,
  elementsContainer,
  profileFormConfig,
  addCardFormConfig,
  initialCards,
} from "./scripts/utils/constants.js";

document.addEventListener("DOMContentLoaded", () => {
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
