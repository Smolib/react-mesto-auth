import { useEffect, memo } from "react";

function ImagePopup({ card, onClose, isOpen }) {
  useEffect(() => {
    const handlerKeyClick = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handlerKeyClick);
    } else {
      document.removeEventListener("keydown", handlerKeyClick);
    }
  }, [isOpen]);

  function handleMouseClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      onClose();
    }
  }

  return (
    <section
      id="popup-big-image"
      className={`popup ${isOpen && "popup_opened"} popup_overlay_dark`}
      onMouseDown={handleMouseClick}
    >
      <div className="popup__container">
        <figure className="popup-big-image">
          <img
            src={card.link}
            alt={card.name}
            className="popup-big-image__image"
          />
          <figcaption className="popup-big-image__text">{card.name}</figcaption>
        </figure>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
        ></button>
      </div>
    </section>
  );
}

export default memo(ImagePopup);
