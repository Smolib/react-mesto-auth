import { memo, useState, useEffect } from "react";

function FormEmailPassword({ isSubmitInLoading, onSubmit, nameOfForm, buttonTextInLoading }) {
  const [userEmail, setUserEmail] = useState("");
  const [errorInputEmail, setErrorInputEmail] = useState({
    isValid: false,
    errorMessage: "",
  });
  const [isUserUseInputEmail, setIsUserUseInputEmail] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [errorInputPassword, setErrorInputPassword] = useState({
    isValid: false,
    errorMessage: "",
  });
  const [isUserUseInputPassword, setIsUserUseInputPassword] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setCanSubmit(errorInputEmail.isValid && errorInputPassword.isValid);
  }, [errorInputEmail, errorInputPassword]);

  function handleOnChangeInputEmail(e) {
    setUserEmail(e.target.value);
    setIsUserUseInputEmail(true);
    setErrorInputEmail({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage,
    });
  }
  function handleOnChangeInputPassword(e) {
    setUserPassword(e.target.value);
    setIsUserUseInputPassword(true);
    setErrorInputPassword({
      isValid: e.target.validity.valid,
      errorMessage: e.target.validationMessage,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onSubmit({
      password: userPassword,
      email: userEmail,
    })
  }

  return (
    <section className="auth">
      <form className="auth__form" noValidate onSubmit={handleSubmit}>
        <h2 className="auth__title">{nameOfForm}</h2>
        <input
          value={userEmail}
          type="email"
          className="auth__input"
          name="email"
          placeholder="E-mail"
          minLength="2"
          maxLength="40"
          required
          onChange={handleOnChangeInputEmail}
        />
        <span
          className={`auth__error-message${
            !errorInputEmail.isValid ? " auth__error-message_active" : ""
          }`}
          id="login-email-error"
        >
          {isUserUseInputEmail ? errorInputEmail.errorMessage : ""}
        </span>
        <input
          value={userPassword}
          type="password"
          className="auth__input"
          name="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          required
          onChange={handleOnChangeInputPassword}
        />
        <span
          className={`auth__error-message${
            !errorInputPassword.isValid ? " auth__error-message_active" : ""
          }`}
          id="login-password-error"
        >
          {isUserUseInputPassword ? errorInputPassword.errorMessage : ""}
        </span>
        <button
          type="submit"
          className={`auth__submit-button${
            !canSubmit || isSubmitInLoading ? "" : " auth__submit-button_active"
          }`}
          disabled={!canSubmit || isSubmitInLoading}
        >
          {isSubmitInLoading ? buttonTextInLoading : nameOfForm}
        </button>
      </form>
    </section>
  );
}

export default memo(FormEmailPassword);
