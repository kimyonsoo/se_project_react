import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddButtonClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="Logo" src={logo} />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch className="header__switch" />
      <button
        onClick={handleAddButtonClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__user-name">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
