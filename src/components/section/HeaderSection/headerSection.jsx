import { Header } from "antd/es/layout/layout";
import "./headerSection.css";
import LogoImg from "../../../assets/img/logo.png";
import { Input, Menu } from "antd";
import UserSection from "../UserSection/userSection";
const { Search } = Input;
export default function HeaderSection({ isAuthen }) {
  const items = [
    { key: 1, label: "Popular" },
    { key: 2, label: "Exloper ideas" },
  ];

  const onSearch = (value) => console.log(value);

  return (
    <Header className="header">
      <a className="header__logo-link" href="/home">
        <img src={LogoImg} className="header__logo"></img>
      </a>

      <Menu
        className="header__menu"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
      />
      <Search
        style={{ margin: "0px 32px", width: "230px", height: "33px" }}
        className="header-section__search"
        placeholder="Search..."
        onSearch={onSearch}
      />
      <UserSection isAuthen={isAuthen}></UserSection>
    </Header>
  );
}
