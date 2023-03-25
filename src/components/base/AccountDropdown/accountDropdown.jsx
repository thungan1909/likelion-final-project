import { Avatar, Divider, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthApi from "../../../api/authApi";
import { useNavigate } from "react-router-dom";
export default function AccountDropdown({ user }) {
  const navigate = useNavigate();
  const logoutFun = async () => {
    try {
      const response = await AuthApi.logout(user._id);
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      navigate(`/login`, { replace: true });
    } catch (error) {
      console.log("error");
    }
  };
  const handleLogout = () => {
    logoutFun();
  };
  const items = [
    {
      key: "1",
      label: (
        <a className="account-menu__user-info" target="_blank">
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
      label: <a target="_blank">My ideas</a>,
    },
    {
      key: "3",
      label: (
        <a target="_blank">
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
              <a target={"_blank"} href="/admindashboard">
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
      label: <a target="_blank">Settings </a>,
    },
    {
      key: "7",
      label: (
        <a target="_blank" rel="register" onClick={handleLogout}>
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
      <Avatar size={40} icon={<UserOutlined />} />
    </Dropdown>
  );
}
