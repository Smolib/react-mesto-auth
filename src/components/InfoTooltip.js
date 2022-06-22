import { memo, useEffect } from "react";

import { useHistory } from "react-router-dom";

function InfoTooltip({ isOpen, onClose, isSuccess, textSuccess, redirectLink }) {
  const history = useHistory();
  useEffect(() => {
    if (isOpen === false && isSuccess === true) {
      history.push(redirectLink);
    }
  }, [isOpen, isSuccess]);
  function handleMouseClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      onClose();
    }
  }
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

  return (
    <section
      id="popup-success-register"
      className={`popup ${isOpen && "popup_opened"}`}
      onMouseDown={handleMouseClick}
    >
      <div className="popup__container">
        <div className="popup-tooltip">
          <div
            className={`popup-tooltip__img${
              isSuccess
                ? " popup-tooltip__img_success"
                : " popup-tooltip__img_fail"
            }`}
          ></div>
          <div className="popup-tooltip__message">
            {isSuccess
              ? textSuccess
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </div>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
        ></button>
      </div>
    </section>
  );
}

export default memo(InfoTooltip);
