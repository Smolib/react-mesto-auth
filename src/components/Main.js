import ImagePopup from "./ImagePopup";
import { useContext, memo } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onTrashClick,
  closeAllPopups,
  onUpdateUser,
  onUpdateAvatar,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  cards,
  isOpenEditProfile,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isDeletePlacePopupOpen,
  isImagePopupOpen,
  isSubmitInLoading,
  isSubmitSuccess,
  selectedCard,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isOpenEditProfile}
        onUpdateUser={onUpdateUser}
        isSubmitInLoading={isSubmitInLoading}
        isSubmitSuccess={isSubmitSuccess}
      />
      <EditAvatarPopup
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={onUpdateAvatar}
        isSubmitInLoading={isSubmitInLoading}
        isSubmitSuccess={isSubmitSuccess}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlace={onAddPlaceSubmit}
        isSubmitInLoading={isSubmitInLoading}
        isSubmitSuccess={isSubmitSuccess}
      />
      <DeletePopup
        onClose={closeAllPopups}
        isOpen={isDeletePlacePopupOpen}
        card={selectedCard}
        onCardDelete={onCardDelete}
        isSubmitInLoading={isSubmitInLoading}
        isSubmitSuccess={isSubmitSuccess}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__speciality">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="locations">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onTrashClick={onTrashClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default memo(Main);
