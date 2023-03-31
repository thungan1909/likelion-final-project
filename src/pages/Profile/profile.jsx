import { useEffect, useState } from "react";
import "./profile.css";
import ProfileImg from "../../assets/img/profile.png";
import UserApi from "../../api/userApi";
import {
  CloseOutlined,
  EditOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, message } from "antd";
import HeaderSection from "../../components/section/HeaderSection/headerSection";
export default function Profile() {
  const [messageApi, contextHolder] = message.useMessage();
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState(null);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const [emailDefault, setEmailDefault] = useState("");
  const [usernameDefault, setUsernameDefault] = useState("");
  const getCurrentUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
      setEmailDefault(response.email);
      setUsernameDefault(response.username);
    } catch (error) {}
  };
  useEffect(() => {
    getCurrentUser();
  }, [userId]);
  useEffect(() => {
    if (isUpdateUser) {
      getCurrentUser();
      setIsUpdateUser(false);
    }
  }, [isUpdateUser]);
  useEffect(() => {}, [emailDefault, usernameDefault]);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };
  const resetAllData = () => {
    setEmailDefault(user.email);
    setUsernameDefault(user.username);
  };
  const handleConfirmCancel = () => {
    resetAllData();
    setIsModalOpen(false);
  };
  const handleCancel = () => {};

  const handleChangeEmail = (e) => {
    setEmailDefault(e.target.value);
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeUsername = (e) => {
    setUsernameDefault(e.target.value);
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUserInfo = async () => {
    try {
      const response = await UserApi.updateUser(userId, newData);
      setIsUpdateUser(true);
      messageApi.open({
        type: "success",
        content: `Update profile successfully`,
        duration: 1.5,
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `${error.data}. Please try again`,
        duration: 3,
      });
    }
  };
  const handleOk = () => {
    updateUserInfo();
    setIsModalOpen(false);
  };

  return (
    <div className="profile">
      {contextHolder}
      <HeaderSection isAuthen={true} />
      <div style={{ display: "flex", flexDirection: "column", margin: "24px" }}>
        <div className="profile-banner">
          <div className="profile-info">
            <img
              alt="profile image"
              className="profile-avt-img"
              src={ProfileImg}
            ></img>
            <span className="profile-info__username"> {user.username} </span>
          </div>
          <Button className="profile__editBtn btn" onClick={handleEditProfile}>
            <EditOutlined className="profile__editBtn__icon"></EditOutlined>
          </Button>
        </div>

        <div className="profile-detail">
          <div className="profile-detail__wrapper">
            <div className="profile-detail__title">Email</div>
            <div className="profile-detail__value">{user.email}</div>
          </div>
          <div className="profile-detail__wrapper">
            <div className="profile-detail__title">Role</div>
            <div className="profile-detail__value">
              {user.isAdmin ? "Admin" : "User"}
            </div>
          </div>
          <div className="profile-detail__wrapper">
            <div className="profile-detail__title">Country</div>
            <div className="profile-detail__value">
              Ho Chi Minh City, Viet Nam
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Edit profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // closable={false}
        closeIcon={
          <>
            <Popconfirm
              title="Confirm cancel"
              description="Your unsaved changes will be lost if you confirm cancellation. Are you sure to cancel edit profile?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleConfirmCancel}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <CloseOutlined />
            </Popconfirm>
          </>
        }
        footer={[
          <Popconfirm
            title="Confirm cancel"
            description="Your unsaved changes will be lost if you confirm cancellation. Are you sure to cancel edit profile?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleConfirmCancel}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button onClick={handleCancel}>Cancel</Button>
          </Popconfirm>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <div className="profile-detail__title">Email</div>
        <Input
          className="modal__input"
          prefix={<MailOutlined className="site-form-item-icon" />}
          defaultValue={emailDefault}
          value={emailDefault}
          name="email"
          onChange={handleChangeEmail}
        />

        <div className="profile-detail__title">Username</div>
        <Input
          className="modal__input"
          prefix={<UserOutlined className="site-form-item-icon" />}
          defaultValue={usernameDefault}
          onChange={handleChangeUsername}
          name="username"
        />
      </Modal>
    </div>
  );
}
