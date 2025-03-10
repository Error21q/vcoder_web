import { Link } from "react-router-dom";
import { scrollToSection } from "../utils/utils";

const CtaAreaTwo = () => {
  return (
    <div className="pb-120 position-relative z-index-common">
      <div className="container">
        <div className="cta-wrap3">
          <div className="cta-wrap-details">
            <div className="section-title mb-20">
              <h2 className="title style2 text-title">Be part of the future</h2>
              <p className="sec-text text-title">
                We offer smart contracts that are safe and secure even the
                developers cannot modify the code of the smart contract.
              </p>
            </div>
            <Link
              to={""}
              onClick={() => scrollToSection("smart-contracts")}
              className="btn "
            >
              Book Contract
            </Link>
          </div>
          <div className="cta-3-thumb movingX">
            <img src="/assets/img/update/normal/cta_3-1.png" alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaAreaTwo;
