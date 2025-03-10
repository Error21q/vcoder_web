import { Link } from "react-router-dom";
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer-wrapper footer-layout2 pb-50">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-xl-4 col-lg-6 order-xl-1">
            <div className="widget footer-widget">
              <div className="widget-about">
                <div
                  className="footer-logo"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Link to="/">
                    <img
                      src="/assets/img/main/logo.svg"
                      alt="Vcoder"
                      style={{
                        height: "40px", // Increased height for better visibility
                        maxWidth: "150px", // Prevents logo from stretching too much
                        objectFit: "contain", // Ensures proper proportions
                      }}
                    />
                  </Link>
                </div>
                <p className="about-text">
                  Welcome to the world-class blockchain coder group called
                  VCoder.
                </p>
                <p className="copyright-text">
                  Copyright © 2025 Vcoder.io. All rights reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 order-xl-3">
            <div className="footer-widget widget-newsletter">
              <h3 className="fw-title">LINKS</h3>
              <ul className="links-list">
                <li>
                  <Link
                    to="https://vcoder.io/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://vcoder.io/terms-conditions/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 order-xl-2">
            <div className="footer-widget widget-contact">
              <h3 className="fw-title">CONTACT SUPPORT</h3>
              <p className="contact-info-text">
                3591 Wilshire Blvd, Los Angeles
              </p>
              <div className="contact-info-link">CA 90005 United States</div>
              <div
                className="contact-info-link"
                style={{ fontSize: "inherit" }}
              >
                support@vcoder.io
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
