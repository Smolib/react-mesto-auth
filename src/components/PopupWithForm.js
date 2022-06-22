import { useEffect, memo } from "react";

function PopupWithForm({
  title,
  name,
  onClose,
  isOpen,
  onSubmit,
  canSubmit,
  isSubmitInLoading,
  buttonText,
  buttonTextInLoading,
  children,
}) {
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
      className={`popup ${isOpen && "popup_opened"} popup_type_${name}`}
      onMouseDown={handleMouseClick}
    >
      <div className="popup__container">
        <form className="popup-form" name={name} noValidate onSubmit={onSubmit}>
          <h2 className="popup-form__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup-form__save-button${
              !canSubmit || isSubmitInLoading
                ? ""
                : " popup-form__save-button_active"
            }`}
            disabled={!canSubmit || isSubmitInLoading}
          >
            {isSubmitInLoading ? buttonTextInLoading : buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default memo(PopupWithForm);
