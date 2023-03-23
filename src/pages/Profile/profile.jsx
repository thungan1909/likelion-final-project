import { useEffect, useState } from "react";
import UserApi from "../../api/userApi";
import { EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import GetCurrentUserService from "../../service/getCurrentUserSevice";
export default function Profile() {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState(null);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
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
  }, [userId, isUpdateUser]);
  const handleEditProfile = () => {
    showModal();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };
  const updateUserInfo = async () => {
    try {
      const response = await UserApi.updateUser(userId, newData);
      setIsUpdateUser(true);
    } catch (error) {}
  };
  const handleOk = () => {
    updateUserInfo();
    setIsModalOpen(false);
  };

  return (
    <>
      Profile
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button onClick={handleEditProfile} style={{ width: "50px" }}>
          <EditOutlined key="edit" />
        </Button>
        <span>Email: {user.email}</span>
        <span>Username: {user.username} </span>
        <span>Role: {user.isAdmin ? "Admin" : "User"}</span>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          //   placeholder="Your email"
          style={{ height: "33px" }}
          defaultValue={user.email}
          name="email"
          onChange={handleChange}
        />
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          //   placeholder="Your username"
          defaultValue={user.username}
          onChange={handleChange}
          name="username"
          style={{ height: "33px" }}
        />
      </Modal>
    </>
  );
}
