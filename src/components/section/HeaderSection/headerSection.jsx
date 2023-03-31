import { Header } from "antd/es/layout/layout";
import "./headerSection.css";
import LogoImg from "../../../assets/img/logo-1.PNG";
import { Input, Menu } from "antd";
import UserSection from "../UserSection/userSection";
const { Search } = Input;
export default function HeaderSection({ isAuthen, setIsAddNewIdea }) {
  const items = [
    { key: 1, label: <a href="/home">Homepage</a> },
    { key: 2, label: <a href="/myideas">My ideas</a> },
    // { key: 3, label: "Popular" },
  ];

  //TODO: SEARCH FEATURE
  const onSearch = (value) => {
    // console.log(value)
  };

  return (
    <Header className="header">
      <a className="header__logo-link" href="/home">
        <img src={LogoImg} className="header__logo"></img>
      </a>

      <Menu className="header__menu" mode="horizontal" items={items} />
      <Search
        style={{ margin: "0px 32px", width: "230px", height: "33px" }}
        className="header-section__search"
        placeholder="Search..."
        onSearch={onSearch}
      />
      <UserSection
        isAuthen={isAuthen}
        setIsAddNewIdea={setIsAddNewIdea}
      ></UserSection>
    </Header>
  );
}
