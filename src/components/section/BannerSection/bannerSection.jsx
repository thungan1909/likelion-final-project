import bannerImg from "../../../assets/img/home_1.png";
import "./bannerSection.css";
import { Input } from "antd";
const { Search } = Input;
export default function BannerSection() {
  const onSearch = (value) => {
    console.log(value);
  };
  return (
    <div className="banner-section">
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
