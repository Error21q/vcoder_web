import "../styles/index.css";
import FooterTwo from "../layout/Footer";
import HeaderTwo from "../layout/Header";
import Brand from "./Brand";
import CtaArea from "./CtaArea";
import CtaAreaTwo from "./CtaAreaTwo";
import FaqArea from "./FaqArea";
import FeatureArea from "./FeatureArea";
import FeatureAreaThree from "./FeatureAreaThree";
import FeatureAreaTwo from "./FeatureAreaTwo";
import HeroArea from "./HeroArea";
import ScrollToTop from "../common/ScrollToTop";
import Contracts from "../contracts";

const Landing = () => {
  return (
    <div className="home-purple-gradient">
      <ScrollToTop />
      <HeaderTwo />
      <HeroArea />
      <Contracts />
      <CtaArea />
      <Brand />
      <FeatureArea />
      <FeatureAreaTwo />
      <FeatureAreaThree />
      <FaqArea />
      <CtaAreaTwo />
      <FooterTwo />
    </div>
  );
};

export default Landing;
