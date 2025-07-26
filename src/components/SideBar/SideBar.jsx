import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onProfileEditModal, onLogOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="sideBar">
      <div className="sideBar__profile">
        {currentUser?.avatar && !imgError ? (
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="sideBar__avatar"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="sideBar__avatar sideBar__avatar_placeholder">
            {currentUser?.name[0].toUpperCase()}
          </div>
        )}
        <p className="sideBar__username">{currentUser.name}</p>
      </div>
      <div className="sideBar__container">
        <button
          onClick={onProfileEditModal}
          type="button"
          className="sideBar__edit-profile"
        >
          Change profile data
        </button>
        <button onClick={onLogOut} type="button" className="sideBar__log-out">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
