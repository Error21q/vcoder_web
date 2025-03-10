interface DataType {
  id: number;
  title: string;
  thumb: string;
  desc_1: string;
  desc_2?: string; // Optional desc_2
  points?: string[]; // Optional points for the checklist
}

const feature_data: DataType[] = [
  {
    id: 1,
    title: "Transference",
    thumb: "/assets/img/update/feature/feature-card-thumb-2.png",
    desc_1:
      "Our contracts are immutable, ensuring that even the developers cannot alter their code.",
  },
  {
    id: 2,
    title: "Secure & Safe",
    thumb: "/assets/img/update/feature/feature-card-thumb-3.png",
    desc_1:
      "We specialize in creating smart contracts that prioritize security and transparency",
    points: [
      "Unparalleled Security",
      "Developer Independence",
      "Innovative Solutions",
    ],
  },
];

const FeatureArea = () => {
  return (
    <div
      className="feature-area-2 pt-110 pb-140 position-relative overflow-hidden "
      style={{
        backgroundImage: `url(/assets/img/update/bg/feature-area-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      id="blockchain"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-8">
            <div className="section-title text-center mb-50">
              <span className="sub-title">ABOUT VCODER</span>
              <h2 className="title style2">Why Vcoder?</h2>
              <p className="sec-text">
                We’ve worked with over 400 companies to build blockchain
                solutions for their business, and we are still growing.
              </p>
            </div>
          </div>
        </div>
        <div className="feature-grid-wrap">
          <div className="feature-card-grid">
            <div className="feature-card-details">
              <h3 className="feature-card-title">Flexibility</h3>
              <p className="feature-card-text">
                With a focus on building trust in the blockchain space, Vcoder
                aims to empower businesses and individuals with robust
                decentralized solutions.
              </p>
              <div className="checklist">
                <ul>
                  <li>
                    <i className="fas fa-circle"></i> Unparalleled Security
                  </li>
                  <li>
                    <i className="fas fa-circle"></i> Developer Independence
                  </li>
                  <li>
                    <i className="fas fa-circle"></i> Innovative Solutions
                  </li>
                </ul>
              </div>
            </div>
            <div className="feature-card-img">
              <img
                className="alltuchtopdown"
                src="/assets/img/update/feature/feature-card-thumb-1.png"
                alt="img"
              />
            </div>
          </div>
          {feature_data.map((item) => (
            <div key={item.id} className="feature-card-grid">
              <div className="feature-card-details">
                <h3 className="feature-card-title">{item.title}</h3>
                <p className="feature-card-text">{item.desc_1}</p>
                {item.points && (
                  <div className="checklist">
                    <ul>
                      {item.points.map((point, index) => (
                        <li key={index}>
                          <i className="fas fa-circle"></i> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="feature-card-img">
                <img src={item.thumb} alt="img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureArea;
