import { useState } from "react";
import { Link } from "react-router-dom";
import VideoPopup from "../modals/VideoPopup";
import "./HeroArea.css"; // Import the CSS file
import { scrollToSection } from "../utils/utils";

const HeroArea = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="hero-wrapper hero-2">
      <div className="hero-bg-gradient2"></div>
      <div className="ripple-shape">
        <span className="ripple-1"></span>
        <span className="ripple-2"></span>
        <span className="ripple-3"></span>
        <span className="ripple-4"></span>
        <span className="ripple-5"></span>
      </div>
      <div className="container">
        <div className="hero-style2">
          <div className="row">
            <div className="col-lg-12">
              <h6 className="hero-subtitle">BOOK A NEW</h6>
              <h1
                className="hero-title"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: "7.5vw",
                  fontWeight: 700,
                  lineHeight: "0.8em",
                  letterSpacing: "-0.01em",
                  color: "#FFFFFF",
                }}
              >
                Smart Contract
              </h1>
              <div className="btn-wrap">
                <div
                  className="safe-secure-card"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <span>Safe and Secure</span>
                  <div className="play-btn popup-video">
                    <i>
                      <svg
                        className="play-icon"
                        width="22"
                        height="23"
                        viewBox="0 0 22 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.66602 11.6553V7.50193C1.66602 2.34526 5.31768 0.233597 9.78602 2.81193L13.391 4.8886L16.996 6.96526C21.4643 9.5436 21.4643 13.7669 16.996 16.3453L13.391 18.4219L9.78602 20.4986C5.31768 23.0769 1.66602 20.9653 1.66602 15.8086V11.6553Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </i>
                  </div>
                </div>
                <div className="hero-content">
                  <p className="hero-text">
                    Free 100% Decentralized Smart Contract Development in 24
                    hours. Book your 100% Decentralized Smart Contract and we
                    will deliver it within 24 hours.
                  </p>
                  <Link
                    to={""}
                    onClick={() => scrollToSection("smart-contracts")}
                    className="btn btn3 book-btn"
                  >
                    <span>Book a smart contract</span>
                    <span className="arrow-icon">
                      <svg
                        width="8.34"
                        height="14"
                        viewBox="0 0 8.34 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L7 7L1 13"
                          stroke="red"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Popup Component */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"3eb2bszJ6lM"}
      />
    </div>
  );
};

export default HeroArea;
