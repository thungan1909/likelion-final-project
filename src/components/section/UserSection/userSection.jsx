import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { Avatar, Divider, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../../../api/userApi";
import "./userSection.css";

export default function UserSection({ isAuthen }) {
  console.log(isAuthen);
  const navigate = useNavigate();
  const handleLogout = () => {
    // AuthenApi.DeleteSession({ sessionId });
    // localStorage.removeItem("token");
    // localStorage.removeItem("approve_token");
    // localStorage.removeItem("session_id");
    // navigate(`/login`, { replace: true });
  };
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState("");

  const getCurrentUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
    } catch (error) {}
  };
  useEffect(() => {
    getCurrentUser();
    // const res = GetCurrentUserService.getCurrentUser();
    // setUser(res);
  }, [userId]);
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
      key: "5",
      label: <a target="_blank">Edit Profile </a>,
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
  const handleNavigateLogin = () => {
    navigate("/login", { replace: "true" });
  };
  const handleNavigateSignup = () => {
    navigate("/register", { replace: "true" });
  };

  useEffect(() => {
    console.log(isAuthen);
  }, [isAuthen]);
  if (isAuthen === false) {
    return (
      <div className="user-section_Wrapper">
        <button
          className="header-section__btn btn"
          onClick={handleNavigateLogin}
        >
          Login
        </button>
        <button
          className="header-section__btn btn"
          onClick={handleNavigateSignup}
        >
          Sign up
        </button>
      </div>
    );
  } else {
    return (
      <div className="user-section_Wrapper">
        <button className="user-section_addBtn btn">Add new idea</button>
        <button className="user-section_notify">
          <BellOutlined />
        </button>

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
      </div>
    );
  }
}
