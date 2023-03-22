import { Header } from "antd/es/layout/layout";
import "./headerSection.css";
import LogoImg from "../../../assets/img/logo.png";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
// import AccountDropdown from "../AccountDropdown/accountDropdown";
// import SearchBar from "../SearchBar/searchBar";

export default function HeaderSection() {
  const navigate = useNavigate();
  const items = [
    { key: 1, label: "Popular" },
    { key: 2, label: "Exloper ideas" },
    { key: 3, label: "Your ideas" },
  ];
  const handleNavigateLogin = () => {
    navigate("/login", { replace: "true" });
  };
  const handleNavigateSignup = () => {
    navigate("/register", { replace: "true" });
  };
  return (
    <Header className="header">
      <a href="/home">
        <img src={LogoImg} className="header__logo"></img>
      </a>

      <Menu
        className="header__menu"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
      />
      <div className="banner-section__btnWrapper">
        <button className="header-section__btn" onClick={handleNavigateLogin}>
          Login
        </button>
        <button className="header-section__btn" onClick={handleNavigateSignup}>
          Sign up
        </button>
      </div>
    </Header>
  );
}
