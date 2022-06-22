import { Route, Switch, Link } from "react-router-dom";

function Header({ loggedIn, onSignOut, userEmail }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      {loggedIn ? (
        <>
          <input
            className="header__button"
            type="checkbox"
            id="header__button"
          />
          <label className="header__button-label" htmlFor="header__button"></label>
          <div className="header__profile">
            <span className="header__email">{userEmail}</span>
            <span className="header__exit" onClick={onSignOut}>Выйти</span>
          </div>
        </>
      ) : (
        <div className="header__auth">
          <Switch>
            <Route path="/sign-up">
              <Link to="./sign-in" className="header__text">
                Войти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link to="./sign-up" className="header__text">
                Регистрация
              </Link>
            </Route>
          </Switch>
        </div>
      )}
      <hr className="header__line" />
    </header>
  );
}

export default Header;
