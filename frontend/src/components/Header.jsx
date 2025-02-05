
import { Link } from "react-router-dom";

import "./Header.css";
import { IconContext } from "react-icons";
import logo from "../assets/img/logo-naminhaestante.png";
import avatarProfile from "../assets/icons/avatar-profile.png"

const Header = () => {

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <>
        <div className="header">
          <Link to="#" className="menu-bars">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <Link to="#" className="menu-bars profile-img">
          <img  src={avatarProfile} alt="logo" />
          </Link>
        </div>
      
      </>
    </IconContext.Provider>
  );
};

export default Header;
