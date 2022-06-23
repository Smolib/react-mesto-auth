import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import { api } from "../utils/api";
import { useEffect, memo } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    id: "",
  });
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSubmitInLoading, setIsSubmitInLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [selectedCard, setSelectedCard] = useState({ name: " ", link: " " });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  const [isSuccessLogin, setIsSuccessLogin] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const history = useHistory();

  useEffect(() => {
    auth
      .getMe()
      .then((data) => {
        if (data) {
          setCurrentUserEmail(data.data.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .finally(() => {
        setIsLoginChecked(true);
      });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          alert(
            "Ой! Что-то пошло не так! Mesto сломался и мы не смогли подгрузить данные пользователя и карточки, простите нас! :("
          );
          setCurrentUser({ name: "ой,", about: "что-то сломалось" });
        });
    }
  }, [loggedIn]);

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        alert(
          "Ой! Что-то пошло не так! Mesto не смог поменять like для карточки"
        );
      });
  }

  function handleCardDelete(card) {
    setIsSubmitInLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        alert("Ой! Что-то пошло не так! Mesto не смог удалить карточку");
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsSubmitInLoading(true);
    setIsSubmitSuccess(false);
    api
      .patchUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        setIsSubmitSuccess(true);
        closeAllPopups();
      })
      .catch((err) => {
        alert("Ой! Что-то пошло не так! Mesto не смог сохранить ваше имя");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsSubmitInLoading(true);
    setIsSubmitSuccess(false);
    api
      .patchUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        setIsSubmitSuccess(true);
        closeAllPopups();
      })
      .catch((err) => {
        alert("Ой! Что-то пошло не так! Mesto не смог сохранить ваш аватар");
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsSubmitInLoading(true);
    setIsSubmitSuccess(false);
    api
      .postCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        setIsSubmitSuccess(true);
        closeAllPopups();
      })
      .catch((err) => {
        alert(
          "Ой! Что-то пошло не так! Mesto не смог сохранить новую карточку"
        );
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function handleLoginSubmit({ email, password }) {
    setIsSubmitInLoading(true);
    clearTimeout(timerId);
    auth
      .login(password, email)
      .then((res) => {
        setIsTooltipOpen(true);
        if (res) {
          setIsSuccessLogin(true);
          setCurrentUserEmail(email);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsTooltipOpen(true);
        setIsSuccessLogin(false);
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }
  function handleRegisterSubmit({ email, password }) {
    setIsSubmitInLoading(true);
    clearTimeout(timerId);
    auth
      .register(password, email)
      .then((res) => {
        setIsTooltipOpen(true);
        if (res) {
          setIsSuccessRegister(true);
        }
      })
      .catch((err) => {
        setIsTooltipOpen(true);
        setIsSuccessRegister(false);
      })
      .finally(() => {
        setIsSubmitInLoading(false);
      });
  }

  function closeAllPopups() {
    setIsOpenEditProfile(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsTooltipOpen(false);

    const timerFreshPopup = setTimeout(() => {
      setSelectedCard({ name: " ", link: " ", likes: [] });
      setIsSuccessRegister(false);
      setIsSuccessLogin(false);
    }, 1000);
    setTimerId(timerFreshPopup);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    clearTimeout(timerId);
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsOpenEditProfile(true);
    setIsSubmitInLoading(false);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setIsSubmitInLoading(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setIsSubmitInLoading(false);
  }

  function handleTrashButtonClick(card) {
    setIsDeletePlacePopupOpen(true);
    clearTimeout(timerId);
    setIsSubmitInLoading(false);
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          onSignOut={onSignOut}
          userEmail={currentUserEmail}
        />
        <Switch>
          <Route path="/sign-up">
            <Register
              isTooltipOpen={isTooltipOpen}
              closeAllPopups={closeAllPopups}
              isSubmitInLoading={isSubmitInLoading}
              onRegister={handleRegisterSubmit}
              isSuccess={isSuccessRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              isTooltipOpen={isTooltipOpen}
              closeAllPopups={closeAllPopups}
              isSubmitInLoading={isSubmitInLoading}
              onLogin={handleLoginSubmit}
              isSuccess={isSuccessLogin}
            />
          </Route>
          {isLoginChecked ? (
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onTrashClick={handleTrashButtonClick}
                closeAllPopups={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                onUpdateAvatar={handleUpdateAvatar}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                cards={cards}
                isOpenEditProfile={isOpenEditProfile}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                isDeletePlacePopupOpen={isDeletePlacePopupOpen}
                isImagePopupOpen={isImagePopupOpen}
                isSubmitInLoading={isSubmitInLoading}
                isSubmitSuccess={isSubmitSuccess}
                selectedCard={selectedCard}
              />
            </ProtectedRoute>
          ) : (
            <></>
          )}
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default memo(App);
