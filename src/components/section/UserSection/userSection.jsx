import { Avatar, Divider, Dropdown, Input, Modal } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../../../api/userApi";
import "./userSection.css";
import IdeaApi from "../../../api/ideaApi";
const { TextArea } = Input;
export default function UserSection({ isAuthen }) {
  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const handleLogout = () => {
    // AuthenApi.DeleteSession({ sessionId });
    // localStorage.removeItem("token");
    // localStorage.removeItem("approve_token");
    // localStorage.removeItem("session_id");
    // navigate(`/login`, { replace: true });
  };
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getCurrentUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
    } catch (error) {}
  };
  useEffect(() => {
    getCurrentUser();
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
      label: <a target="_blank">Logout </a>,
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
  const handleAddIdea = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    handleCreateIdea();
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setIdea({
      userId: userId,
      content: e.target.value,
    });
  };
  const handleCreateIdea = async () => {
    try {
      const response = await IdeaApi.addIdea(idea);
      console.log(response);
    } catch (error) {}
  };
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
        <button className="user-section_addBtn btn" onClick={handleAddIdea}>
          Add new idea
        </button>
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
        <Modal
          title="Add new idea"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="user-section-modal"
          okText="Post"
          cancelText="Cancel"
        >
          <TextArea
            className="user-section-modal__input"
            placeholder="Your idea..."
            name="content"
            rows={5}
            onChange={handleChange}
          />
        </Modal>
      </div>
    );
  }
}
