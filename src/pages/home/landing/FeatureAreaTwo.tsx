const FeatureAreaTwo = () => {
  return (
    <div
      className="pt-140 pb-140 overflow-hidden position-relative z-index-common"
      id="feature"
    >
      <div className="bg-gradient-5"></div>

      <div className="container">
        <div className="row">
          <div className="col-xl-6 text-center">
            <div className="feature-thumb-wrap">
              <img
                className="feature-thumb-3-1 alltuchtopdown"
                src="/assets/img/update/normal/intro_1-1.png"
                alt="img"
              />
            </div>
          </div>
          <div className="col-xl-5">
            <div className="section-title mb-75">
              <span className="sub-title text-white">ABOUT</span>
              <h2 className="title style2">
                Empowering Trust with Immutable Smart Contracts
              </h2>
              <p className="mt-25">
                At Vcoder, we specialize in creating smart contracts that
                prioritize security and transparency. Our contracts are
                immutable, ensuring that even the developers cannot alter their
                code. With a focus on building trust in the blockchain space,
                Vcoder aims to empower businesses and individuals with robust
                decentralized solutions.
              </p>
            </div>
            <div className="counter-grid-wrap">
              <div className="counter-wrap">
                <div className="counter-card">
                  <h3 className="counter-card_number">2K+</h3>
                  <p className="counter-card_text">Smart contracts</p>
                </div>
              </div>
              <div className="counter-wrap">
                <div className="counter-card">
                  <h3 className="counter-card_number">98%</h3>
                  <p className="counter-card_text">Customer satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureAreaTwo;
