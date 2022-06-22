import PopupWithForm from "./PopupWithForm";
import { memo } from "react";

function DeletePopup({
  onClose,
  isOpen,
  card,
  onCardDelete,
  isSubmitInLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-form"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      canSubmit={true}
      isSubmitInLoading={isSubmitInLoading}
      buttonText="Удалить"
      buttonTextInLoading="Удаление..."
    />
  );
}

export default memo(DeletePopup);
