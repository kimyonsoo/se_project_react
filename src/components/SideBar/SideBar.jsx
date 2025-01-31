import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sideBar">
      <img className="sideBar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sideBar__username">Default</p>
    </div>
  );
}

export default SideBar;
