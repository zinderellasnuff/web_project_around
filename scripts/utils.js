export function openModal(src, caption) {
  const modalTemplate = document.querySelector("#modal-template").content;
  const modalElement = modalTemplate.cloneNode(true);
  const modal = modalElement.querySelector(".modal");
  const modalImg = modalElement.querySelector(".modal__image");
  const modalCaption = modalElement.querySelector(".modal__caption");
  const closeButton = modalElement.querySelector(".modal__close");

  modalImg.src = src;
  modalCaption.textContent = caption;
  modal.style.display = "flex";

  const closeModal = () => {
    modal.style.display = "none";
    document.body.removeChild(modalElement);
    document.removeEventListener("keydown", handleEscape);
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", handleEscape);

  document.body.appendChild(modalElement);
}
