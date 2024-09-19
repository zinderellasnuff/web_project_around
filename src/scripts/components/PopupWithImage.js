// PopupWithImage.js
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(".modal__image");
    this._caption = this._popup.querySelector(".modal__caption");
  }

  open(src, caption) {
    this._image.src = src;
    this._caption.textContent = caption;
    super.open();
  }
}
