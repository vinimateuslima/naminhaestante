
import { Link } from "react-router-dom";

import "./Header.css";
import { IconContext } from "react-icons";

const Header = () => {

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <>
        <div className="header">
          <Link to="#" className="menu-bars">
            <img src="https://via.placeholder.com/50x50" alt="logo" />
          </Link>
          <Link to="#" className="menu-bars profile-img">
          <img src="https://via.placeholder.com/50x50" alt="logo" />
          </Link>
        </div>
      
      </>
    </IconContext.Provider>
  );
};

export default Header;
