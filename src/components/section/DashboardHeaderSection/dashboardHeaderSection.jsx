import { Header } from "antd/es/layout/layout";
import LogoImg from "../../../assets/img/logo.png";
import AccountDropdown from "../../base/AccountDropdown/accountDropdown";
import UserSection from "../UserSection/userSection";
export default function DashboardHeaderSection({ user }) {
  return (
    <Header className="header" style={{ justifyContent: "space-between" }}>
      <a className="header__logo-link" href="/home">
        <img src={LogoImg} className="header__logo"></img>
      </a>
      <AccountDropdown user={user}></AccountDropdown>
    </Header>
  );
}
