import "./pages/index.css";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Card } from "./scripts/components/card.js";
import { PopupWithConfirmation } from "./scripts/components/PopupWithConfirmation.js";
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
  api,
  avatarEditIcon,
  avatarPopup,
  avatarCloseButton,
  avatarForm,
  avatarInput,
} from "./scripts/utils/constants.js";

let currentUserId;

document.addEventListener("DOMContentLoaded", () => {
  const profileFormValidator = new FormValidator(
    profileFormConfig,
    profileForm
  );
  const addCardFormValidator = new FormValidator(
    addCardFormConfig,
    addCardForm
  );

  profileFormValidator.enableValidation();
  addCardFormValidator.enableValidation();

  const popupWithConfirmation = new PopupWithConfirmation(
    ".popup_confirmation",
    handleDeleteCard
  );

  // Funciones para manejar el popup del perfil
  function openProfilePopup() {
    profileNameInput.value = profileName.textContent;
    profileAboutInput.value = profileSubtitle.textContent;
    profilePopup.style.display = "flex";
    profileFormValidator.resetValidation();
  }

  function closeProfilePopup() {
    profilePopup.style.display = "none";
  }

  function handleProfileFormSubmit(event) {
    event.preventDefault();
    const saveButton = event.submitter; // Obtiene el botón que disparó el evento
    saveButton.textContent = "Guardando..."; // Cambia el texto del botón

    api
      .updateUserInfo(profileNameInput.value, profileAboutInput.value)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileSubtitle.textContent = userData.about;
        closeProfilePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        saveButton.textContent = "Guardar"; // Restaura el texto del botón
      });
  }

  // Funciones para manejar el popup de añadir tarjeta
  function openAddCardPopup() {
    addCardPopup.style.display = "flex";
    addCardFormValidator.resetValidation();
  }

  function closeAddCardPopup() {
    addCardPopup.style.display = "none";
  }

  function handleAddCardFormSubmit(event) {
    event.preventDefault();
    const saveButton = event.submitter; // Obtiene el botón que disparó el evento
    saveButton.textContent = "Guardando...";

    const cardData = {
      name: cardNameInput.value,
      link: cardImageInput.value,
    };

    api
      .addNewCard(cardData.name, cardData.link)
      .then((newCardData) => {
        const card = new Card(
          newCardData,
          "#card-template",
          openModal,
          currentUserId,
          popupWithConfirmation.open.bind(popupWithConfirmation)
        );
        elementsContainer.prepend(card.generateCard());
        closeAddCardPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        saveButton.textContent = "Guardar";
      });
  }

  // Funciones para manejar el popup de actualización de foto de perfil
  function openAvatarPopup() {
    avatarPopup.style.display = "flex";
    avatarInput.value = "";
  }

  function closeAvatarPopup() {
    avatarPopup.style.display = "none";
  }

  function handleAvatarFormSubmit(event) {
    event.preventDefault();
    const saveButton = event.submitter; // Obtiene el botón que disparó el evento
    saveButton.textContent = "Guardando..."; // Cambia el texto del botón

    const avatarUrl = avatarInput.value;

    api
      .updateAvatar(avatarUrl)
      .then(() => {
        const profileImage = document.querySelector(".profile__image");
        profileImage.src = avatarUrl;
        closeAvatarPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        saveButton.textContent = "Guardar"; // Restaura el texto del botón
      });
  }

  // Cargar datos de usuario y tarjetas iniciales
  api
    .getUserInfo()
    .then((userData) => {
      profileName.textContent = userData.name;
      profileSubtitle.textContent = userData.about;
      currentUserId = userData._id; // Guarda el ID del usuario actual
    })
    .catch((err) => console.log(err));

  api
    .getInitialCards()
    .then((cards) => {
      cards.forEach((data) => {
        const card = new Card(
          data,
          "#card-template",
          openModal,
          currentUserId,
          popupWithConfirmation.open.bind(popupWithConfirmation)
        );
        elementsContainer.prepend(card.generateCard());
      });
    })
    .catch((err) => console.log(err));

  // Implementación de la función handleDeleteCard
  function handleDeleteCard(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        const cardElement = document.querySelector(
          `[data-card-id="${cardId}"]`
        );
        if (cardElement) {
          cardElement.remove(); // Elimina la tarjeta del DOM
        }
      })
      .catch((err) => console.log(err));
  }

  // Event Listeners
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

  avatarEditIcon.addEventListener("click", openAvatarPopup);
  avatarCloseButton.addEventListener("click", closeAvatarPopup);
  avatarPopup.addEventListener("click", (event) => {
    if (event.target === avatarPopup) closeAvatarPopup();
  });

  avatarForm.addEventListener("submit", handleAvatarFormSubmit);
  profileForm.addEventListener("submit", handleProfileFormSubmit);
  addCardForm.addEventListener("submit", handleAddCardFormSubmit);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProfilePopup();
      closeAddCardPopup();
      closeAvatarPopup(); // Cerrar popup de avatar también
      popupWithConfirmation.close(); // Cerrar popup de confirmación si está abierto
    }
  });
});
