import { useNavigate } from "react-router-dom";
import bannerImg from "../../../assets/img/home_1.png";
import "./bannerSection.css";
import { Input } from "antd";
const { Search } = Input;
export default function BannerSection() {
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/login", { replace: "true" });
  };
  const handleNavigateSignup = () => {
    navigate("/register", { replace: "true" });
  };
  const onSearch = (value) => console.log(value);
  return (
    <div className="banner-section">
      {/* <div className="banner-section__info">
        <div className="banner-section__quotes">
          Share your ideas with others around the world
        </div>
        <div className="banner-section__btnWrapper">
          <button className="banner-section__btn" onClick={handleNavigateLogin}>
            Login
          </button>
          <button
            className="banner-section__btn"
            onClick={handleNavigateSignup}
          >
            Sign up
          </button>
        </div>
      </div> */}
      <Search
        style={{ margin: "0px 24px" }}
        size="large"
        className="bannner-section__search"
        placeholder="Search..."
        onSearch={onSearch}
        enterButton
      />
      <img
        className="banner-section__img"
        alt="bannerImg"
        src={bannerImg}
      ></img>
    </div>
  );
}
