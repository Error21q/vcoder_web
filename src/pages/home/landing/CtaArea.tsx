import { useState } from "react";
import { Link } from "react-router-dom";
import VideoPopup from "../modals/VideoPopup";
import "./CtaArea.css";
import { scrollToSection } from "../utils/utils";

const CtaArea = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="pt-140 pb-140 position-relative z-index-common">
        <div className="bg-gradient-5"></div>
        <div className="cta-2-shape1 alltuchtopdown">
          <img src="/assets/img/update/bg/cta-2-shape1.png" alt="img" />
        </div>
        <div className="container">
          <div
            className="cta-wrap2 pt-140 pb-140"
            style={{
              backgroundImage: `url(/assets/img/update/bg/download.jpg)`,
              backgroundSize: "cover",
            }}
          >
            <div className="row gy-40 align-items-center cta-responsive">
              {/* Mobile View: Play Button First */}
              <div className="col-12 mobile-play-btn">
                <div className="text-center">
                  <a
                    onClick={() => setIsVideoOpen(true)}
                    style={{ cursor: "pointer" }}
                    className="play-btn popup-video"
                  >
                    <i>
                      <svg
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
                  </a>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-xl-6 col-lg-8">
                <div className="section-title mb-50">
                  <span className="sub-title text-white">HOW-TO GUIDE</span>
                  <h2 className="title style2">
                    How to book a smart contract at Vcoder?
                  </h2>
                  <p className="sec-text text-white">
                    We offer smart contracts that are safe and secure even the
                    developers cannot modify the code of the smart contract.
                  </p>
                </div>
                {/* <div className="col col-md-6 mx-auto"> */}
                <Link
                  to={""}
                  onClick={() => scrollToSection("smart-contracts")}
                  className="btn btn3 book-btn"
                >
                  Book Contract
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
                {/* </div> */}
              </div>

              {/* Desktop View: Play Button at the End */}
              <div className="col-xl-6 col-lg-4 desktop-play-btn">
                <div className="text-lg-center">
                  <a
                    onClick={() => setIsVideoOpen(true)}
                    style={{ cursor: "pointer" }}
                    className="play-btn popup-video"
                  >
                    <i>
                      <svg
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Popup */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"BFphcrUw-gk"}
      />
    </>
  );
};

export default CtaArea;
