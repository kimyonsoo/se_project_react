import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddButtonClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-location">Date, Location</p>
      <button
        onClick={handleAddButtonClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__user- name">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
