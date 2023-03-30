import { Divider, Dropdown } from "antd";
import AvtImg from "../../../assets/img/profile.png";

import { useNavigate } from "react-router-dom";
import AuthenApi from "../../../api/authenApi";
export default function AccountDropdown({ user }) {
  const navigate = useNavigate();
  const logoutFun = async () => {
    try {
      const response = await AuthenApi.logout(user._id);
      console.log(response);
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      navigate(`/login`, { replace: true });
    } catch (error) {
      // console.log("error");
    }
  };
  const handleLogout = () => {
    logoutFun();
  };
  const items = [
    {
      key: "1",
      label: (
        <a href="/profile" className="account-menu__user-info" target="_blank">
          <span style={{ fontWeight: "bold" }}>{user.username}</span>
          <span>{user.isAdmin ? "Admin" : "User"}</span>
          <Divider
            style={{
              marginBlock: "4px",
            }}
          />
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a href="/myidea" target="_blank">
          My ideas
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a href="/mylikes" target="_blank">
          My likes
          <Divider
            style={{
              marginBlock: "4px",
            }}
          />
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <>
          {user.isAdmin ? (
            <>
              <a target={"_blank"} href="/overview">
                Admin Dashboard
              </a>
              <Divider
                style={{
                  marginBlock: "4px",
                }}
              />{" "}
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      key: "5",
      label: (
        <a href="/profile" target="_blank">
          Profile{" "}
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <a href="/settings" target="_blank">
          Settings{" "}
        </a>
      ),
    },
    {
      key: "7",
      label: (
        <a target="_blank" href="#" onClick={handleLogout}>
          Log out
        </a>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      arrow
      className="dropdown"
    >
      <img
        alt="user avatar"
        style={{
          width: "45px",
          height: "45px",
          alignItems: "center",
          flexDirection: "column",
        }}
        src={AvtImg}
      ></img>
    </Dropdown>
  );
}
