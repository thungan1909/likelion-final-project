import { Header } from "antd/es/layout/layout";
import "./headerSection.css";
import LogoImg from "../../../assets/img/logo.png";
import { Menu } from "antd";
import UserSection from "../UserSection/userSection";

export default function HeaderSection({ isAuthen }) {
  const items = [
    { key: 1, label: "Popular" },
    { key: 2, label: "Exloper ideas" },
    { key: 3, label: "Your ideas" },
  ];

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
      <UserSection isAuthen={isAuthen}></UserSection>
    </Header>
  );
}
