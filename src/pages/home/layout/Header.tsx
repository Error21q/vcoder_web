import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file
import { scrollToSection } from "../utils/utils";

const Header = () => {
  return (
    <header id="header" className="header-layout1">
      <div className="menu-area transparent-header">
        <div className="container custom-container">
          <div className="row">
            <div className="col-12">
              <div className="menu-wrap">
                <nav className="menu-nav">
                  <div
                    className="logo"
                    style={{ width: "200px", height: "80.6px" }}
                  >
                    <Link to="/">
                      <img
                        src="/assets/img/main/logo.svg"
                        alt="Logo"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Link>
                  </div>

                  {/* Fluid container for BOOK NOW button */}
                  <div className="header-action-container">
                    <div className="header-action">
                      <ul className="list-wrap">
                        <li className="header-login">
                          <Link
                            className="btn2"
                            to={""}
                            onClick={() => scrollToSection("smart-contracts")}
                          >
                            BOOK NOW
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
