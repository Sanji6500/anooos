import "./Navbar.css";
import Logo from "./Images/Logo.svg";
import { BiUserCircle, BiRegistered } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { MdModeNight } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const userDropdonRef = useRef(null);
  const [userdropdown, setUserdropdown] = useDetectOutsideClick(
    userDropdonRef,
    false
  );
  const location = useLocation();
  const NotRenderNavbar = ["/Login", "/SignIn"];
  const Navigate = useNavigate();

  const RemoveToken = () => {
    localStorage.removeItem("authToken");
    Navigate("/");
  };

  return (
    <>
      {NotRenderNavbar.includes(location.pathname) ? null : (
        <nav className="Navbar-nav">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo" height="50" width="30" />
            </Link>
          </div>
          <div className="Navbar-links Nav-pills">
            {localStorage.getItem("authToken") ? (
              <ul>
                <li>
                  <Link to="/add">Add Product</Link>
                </li>
                <li>
                  <Link to="/AddVer">Add Advertis</Link>
                </li>
                <li>
                  <a href="#111111111">Test</a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <a href="#111111111">not working yet </a>
                </li>
              </ul>
            )}
          </div>
          <div className="Nav-buttons">
            <div className="search-box">
              <input
                type="text"
                className="search-text"
                name=""
                placeholder="Type to search"
              />
              <button type="button" className="Nav-button-search">
                <AiOutlineSearch size="1.8em" />
              </button>
            </div>
            <button type="button" className="Nav-button">
              <FaRegBell size="1.8em" />
            </button>
            <div className="User-dropdown">
              <button
                type="button"
                className="Nav-button-user"
                onClick={() => setUserdropdown(!userdropdown)}
              >
                <BiUserCircle size="1.8em" />
              </button>
              <div
                ref={userDropdonRef}
                className={`menu ${userdropdown ? "active" : "inactive"}`}
              >
                <ul>
                  <li>
                    {localStorage.getItem("authToken") ? (
                      <a href="#1111111">
                        <span className="icon-Dropdown">
                          <FiSettings size="1em" />
                        </span>
                        Settings
                      </a>
                    ) : (
                      <Link to="/Login">
                        <span className="icon-Dropdown">
                          <BiLogIn size="1em" />
                        </span>
                        Login
                      </Link>
                    )}
                  </li>

                  {localStorage.getItem("authToken") ? (
                    <li>
                      <a onClick={RemoveToken}>
                        <span className="icon-Dropdown">
                          <FiLogOut size="1em" />
                        </span>
                        Log out
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a onClick={RemoveToken}>
                        <span className="icon-Dropdown">
                          <BiRegistered size="1em" />
                        </span>
                        registration
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <button type="button" className="Nav-button">
              <MdModeNight size="1.8em" />
            </button>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
