import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddButtonClick,
  weatherData,
  onRegisterModal,
  onLoginModal,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="Logo" src={logo} />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch className="header__switch" />
      {!isLoggedIn ? (
        <>
          <button
            onClick={onRegisterModal}
            type="button"
            className="header__sign-up"
          >
            Sign Up
          </button>
          <button
            onClick={onLoginModal}
            type="button"
            className="header__log-in"
          >
            Log In
          </button>
        </>
      ) : (
        <button
          onClick={handleAddButtonClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add clothes
        </button>
      )}

      {isLoggedIn && (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__user-name">{currentUser?.name}</p>
            {currentUser?.avatar ? (
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar_placeholder">
                {currentUser?.name[0]}
              </div>
            )}
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
