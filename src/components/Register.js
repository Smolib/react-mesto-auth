import { memo } from "react";
import FormEmailPassword from "./FormEmailPassword";
import InfoTooltip from "./InfoTooltip";
import { Link } from "react-router-dom";

function Register({
  isSubmitInLoading,
  isTooltipOpen,
  closeAllPopups,
  isSuccess,
  onRegister,
}) {
  return (
    <>
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
        textSuccess="Вы успешно зарегистрировались!"
        redirectLink="/sign-in"
      ></InfoTooltip>
      <FormEmailPassword
        isSubmitInLoading={isSubmitInLoading}
        onSubmit={onRegister}
        nameOfForm="Регистрация"
        buttonTextInLoading="Регистрируем..."
      />
      <p className="auth__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </>
  );
}
export default memo(Register);
