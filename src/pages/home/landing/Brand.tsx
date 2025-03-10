import "./Brand.css";

const brand_data = [
  "/assets/img/update/client/avalanche.png",
  "/assets/img/update/client/metamask.png",
  "/assets/img/update/client/binance.png",
  "/assets/img/update/client/tron.png",
  "/assets/img/update/client/coinbase.png",
  "/assets/img/update/client/salona.png",
  "/assets/img/update/client/trust.png",
  "/assets/img/update/client/polygon.png",
];

const Brand = () => {
  return (
    <div className="brand-area3 py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="brand-title2">
              <h6 className="title">
                Our smart contracts are supported by leading wallets and
                blockchain networks.
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-slider">
        <div className="brand-track">
          {[...brand_data, ...brand_data].map((item, i) => (
            <div key={i} className="brand-item">
              <img src={item} alt="brand-logo" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
