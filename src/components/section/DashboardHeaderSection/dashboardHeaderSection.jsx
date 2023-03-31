import { Header } from "antd/es/layout/layout";
import LogoImg from "../../../assets/img/logo-1.PNG";
import AccountDropdown from "../../base/AccountDropdown/accountDropdown";
export default function DashboardHeaderSection({ user }) {
  return (
    <Header
      className="header"
      style={{
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <a className="header__logo-link" href="/home">
        <img alt="logo image" src={LogoImg} className="header__logo"></img>
      </a>
      <AccountDropdown user={user}></AccountDropdown>
    </Header>
  );
}
