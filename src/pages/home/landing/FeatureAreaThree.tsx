import { Link } from "react-router-dom";
import { scrollToSection } from "../utils/utils";

const FeatureAreaThree = () => {
  return (
    <div className="pt-140 pb-140 overflow-hidden position-relative z-index-common">
      <div className="feature-shape-4-1  spin"></div>
      <div className="feature-shape-4-2 alltuchtopdown"></div>
      <div className="feature-shape-4-3 alltuchtopdown"></div>
      <div className="feature-shape-4-4"></div>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-xl-5">
            <div className="section-title mb-50">
              <span className="sub-title">SOLUTIONS</span>
              <h2 className="title style2">How Vcoder helps businesses?</h2>
              <p className="mt-25">
                Vcoder's smart contract solutions means enhanced security,
                trust, and efficiency for your business. With immutable and
                tamper-proof contracts, you can eliminate risks of fraud or
                unauthorized modifications, ensuring peace of mind for both you
                and your clients.
              </p>
            </div>
          </div>
          <div className="col-xl-6">
            <ul className="feature-category-list mb-xl-0 mb-60">
              <li>
                <Link to="/blog-details">Blockchain development</Link>
              </li>
              <li>
                <Link to="/blog-details">Coin/Token Development</Link>
              </li>
              <li>
                <Link to="/blog-details">DeFi Development</Link>
              </li>
              <li>
                <Link to="/blog-details">Smart Contract Development</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="feature-wrap-4">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="feature-wrap4-thumb text-center alltuchtopdown">
                <img src="/assets/img/update/normal/contract.png" loading="lazy" alt="img" style={{
                  height:300,width:300
                }} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-title mb-0">
                <span className="sub-title text-title">FEATURES</span>
                <h2 className="title style2 text-title">
                  Safe & Secure Smart contracts
                </h2>
                <p className="text-title mt-20 mb-55">
                  We offer smart contracts that are safe and secure even the
                  developers cannot modify the code of the smart contract.{" "}
                </p>
                <Link
                  to={""}
                  onClick={() => scrollToSection("smart-contracts")}
                  className="btn btn3 book-btn"
                >
                  Book now
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
  );
};

export default FeatureAreaThree;
