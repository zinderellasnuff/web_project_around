document.addEventListener("DOMContentLoaded", () => {
  // Obtén los elementos necesarios
  const editButton = document.querySelector(".profile__info-button");
  const closeButton = document.querySelector(".popup__close-button");
  const popup = document.querySelector(".popup");
  const profileName = document.querySelector(".profile__info-name");
  const profileSubtitle = document.querySelector(".profile__info-subtitle");
  const form = document.querySelector(".popup__form");
  const nameInput = document.querySelector("#popup-name");
  const aboutInput = document.querySelector("#popup-about");

  // Muestra el popup con los datos actuales del perfil
  function openPopup() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileSubtitle.textContent;
    popup.style.display = "flex";
  }

  // Cierra el popup
  function closePopup() {
    popup.style.display = "none";
  }

  // Maneja el envío del formulario
  function handleProfileFormSubmit(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Actualiza los datos del perfil
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;

    closePopup(); // Cierra el popup
  }

  // Asigna los eventos a los botones
  editButton.addEventListener("click", openPopup);
  closeButton.addEventListener("click", closePopup);
  form.addEventListener("submit", handleProfileFormSubmit);
});
