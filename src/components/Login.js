import { memo } from "react";
import FormEmailPassword from "./FormEmailPassword";
import InfoTooltip from "./InfoTooltip";
import { Link } from "react-router-dom";

function Login({
  isSubmitInLoading,
  isTooltipOpen,
  closeAllPopups,
  isSuccess,
  onLogin,
}) {
  return (
    <>
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
        textSuccess="Вы успешно зашли!"
        redirectLink="/"
      ></InfoTooltip>
      <FormEmailPassword
        isSubmitInLoading={isSubmitInLoading}
        onSubmit={onLogin}
        nameOfForm="Вход"
        buttonTextInLoading="Входим..."
      />
      <p className="auth__text">
        Нет учетной записи?{" "}
        <Link to="/sign-up" className="auth__link">
          Зарегистрируйтесь
        </Link>
      </p>
    </>
  );
}

export default memo(Login);
