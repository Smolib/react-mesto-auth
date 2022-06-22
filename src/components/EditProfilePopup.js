import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext, memo } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  onClose,
  isOpen,
  onUpdateUser,
  isSubmitInLoading,
  isSubmitSuccess,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [userName, setUserName] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [errorInputName, setErrorInputName] = useState({
    isValid: true,
    errorMessage: "",
  });
  const [errorInputAbout, setErrorInputAbout] = useState({
    isValid: true,
    errorMessage: "",
  });
  const [isUserUseInputName, setIsUserUseInputName] = useState(false);
  const [isUserUseInputAbout, setIsUserUseInputAbout] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setUserName(currentUser.name);
    setUserAbout(currentUser.about);
  }, [currentUser, isOpen]);

  useEffect(() => {
    setIsUserUseInputName(false);
    setIsUserUseInputAbout(false);
    setErrorInputName({
      isValid: true,
      errorMessage: "",
    });
    setErrorInputAbout({
      isValid: true,
      errorMessage: "",
    });
  }, [isOpen]);

  useEffect(() => {
    if (isSubmitSuccess) {
      setErrorInputName({ isValid: false, errorMessage: "" });
      setErrorInputAbout({ isValid: false, errorMessage: "" });
    }
  }, [isSubmitSuccess]);

  useEffect(() => {
    setCanSubmit(errorInputName.isValid && errorInputAbout.isValid);
  }, [errorInputName, errorInputAbout]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: userName,
      about: userAbout,
    });
    setIsUserUseInputName(false);
    setIsUserUseInputAbout(false);
  }

  function handleOnChangeInputName(e) {
    setUserName(e.target.value);
    setIsUserUseInputName(true);
    setErrorInputName({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage,
    });
  }

  function handleOnChangeInputAbout(e) {
    setUserAbout(e.target.value);
    setIsUserUseInputAbout(true);
    setErrorInputAbout({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-form"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      canSubmit={canSubmit}
      isSubmitInLoading={isSubmitInLoading}
      buttonText="Сохранить"
      buttonTextInLoading="Сохранение..."
    >
      <>
        <input
          value={userName || ''}
          type="text"
          className="popup-form__text-form"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleOnChangeInputName}
        />
        <span
          className={`popup-form__error-message${
            !errorInputName.isValid ? " popup-form__error-message_active" : ""
          }`}
          id="name-error"
        >
          {isUserUseInputName ? errorInputName.errorMessage : ""}
        </span>
        <input
          value={userAbout || ''}
          type="text"
          className="popup-form__text-form"
          name="speciality"
          placeholder="Призвание"
          minLength="2"
          maxLength="200"
          required
          onChange={handleOnChangeInputAbout}
        />
        <span
          className={`popup-form__error-message${
            !errorInputAbout.isValid ? " popup-form__error-message_active" : ""
          }`}
          id="speciality-error"
        >
          {isUserUseInputAbout ? errorInputAbout.errorMessage : ""}
        </span>
      </>
    </PopupWithForm>
  );
}

export default memo(EditProfilePopup);
