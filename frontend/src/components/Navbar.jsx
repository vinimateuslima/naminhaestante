import { Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";

import { IconContext } from "react-icons";

import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <IconContext.Provider value={{ color: "var(--tertiary-color)" }}>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">
                <IoIcons.IoHome />
              </Link>
            </li>
            <li>
              <Link to="/add-book">
                <FaIcons.FaPlus />
              </Link>
            </li>
            <li>
              <Link to="#">
                <IoIcons.IoSearch />
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
