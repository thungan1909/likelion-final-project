import { useEffect, useState } from "react";
import "./profile.css";
import ProfileImg from "../../assets/img/profile.png";
import UserApi from "../../api/userApi";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, message } from "antd";
import HeaderSection from "../../components/section/HeaderSection/headerSection";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState({ username: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [newData, setNewData] = useState({ email: "", username: "" });
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (userId && userId.length > 0) {
      getCurrentUser();
    }
  }, [userId]);
  useEffect(() => {
    if (isUpdateUser) {
      getCurrentUser();
      setIsUpdateUser(false);
    }
  }, [isUpdateUser]);
  const getCurrentUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditProfileBtn = () => {
    setIsModalOpen(true);
  };

  const resetAllData = () => {
    setNewData({ email: user.email, username: user.username });
  };
  const handleConfirmCancel = () => {
    resetAllData();
    setIsModalOpen(false);
    form.setFieldsValue({
      email: user.email,
      username: user.username,
    });
  };
  const handleChangeEmail = (e) => {
    setNewData({ ...newData, email: e.target.value });
  };
  const handleChangeUsername = (e) => {
    setNewData({ ...newData, username: e.target.value });
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
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: `${error.data}. Please try again`,
        duration: 3,
      });
    }
  };
  const handleClickUpdateBtn = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        updateUserInfo();
        // setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Validation error:", errorInfo);
      });
  };

  const logoutFun = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    navigate(`/login`, { replace: true });
  };
  const deleteMySelf = async () => {
    try {
      const response = await UserApi.deleteUserById(userId);
      messageApi
        .open({
          type: "success",
          content: `Delete successfully`,
          duration: 1,
        })
        .then(() => logoutFun());
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `${error.data}. Please try again`,
        duration: 3,
      });
    }
  };
  const handleConfirmDelete = () => {
    deleteMySelf();
  };
  if (user._id && user._id.length > 0) {
    return (
      <div className="profile">
        {contextHolder}
        <HeaderSection isAuthen={true} />
        <div
          style={{ display: "flex", flexDirection: "column", margin: "24px" }}
        >
          <div className="profile-banner">
            <div className="profile-info">
              <img
                alt="profile image"
                className="profile-avt-img"
                src={ProfileImg}
              ></img>
              <span className="profile-info__username"> {user.username} </span>
            </div>
            <div className="profile__editBtn_wrapper">
              <Button
                className="profile__editBtn btn"
                onClick={handleClickEditProfileBtn}
              >
                <EditOutlined className="profile__editBtn__icon"></EditOutlined>
              </Button>
              <Popconfirm
                title="Delete user"
                description="Are you sure to delete yourself? This action will make you logout and not be able to log back in"
                okText="Yes"
                cancelText="No"
                onConfirm={handleConfirmDelete}
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button className="profile__editBtn btn">
                  <DeleteOutlined className="profile__editBtn__icon"></DeleteOutlined>
                </Button>
              </Popconfirm>
            </div>
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
        {isModalOpen && (
          <Modal
            title={<h2 className="modal__title">Update profile</h2>}
            open={isModalOpen}
            onOk={handleClickUpdateBtn}
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
                <Button>Cancel</Button>
              </Popconfirm>,
              <Button
                key="submit"
                type="primary"
                onClick={handleClickUpdateBtn}
              >
                Update
              </Button>,
            ]}
          >
            <Form
              form={form}
              onFinish={handleClickUpdateBtn}
              onFinishFailed={console.log}
              className="profile__form"
              layout="vertical"
            >
              <Form.Item
                label={
                  <label
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </label>
                }
                name="email"
                hasFeedback
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                  {
                    max: 50,
                    message: "Your email needs to max 50 characters long",
                  },
                  {
                    required: true,
                    message: "This field is required!",
                  },
                ]}
                style={{
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Your email"
                  style={{ height: "35px" }}
                  defaultValue={user.email}
                  name="email"
                  onChange={handleChangeEmail}
                />
              </Form.Item>
              <Form.Item
                label={
                  <label
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: "bold",
                    }}
                  >
                    Username
                  </label>
                }
                name="username"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                  {
                    min: 6,
                    message:
                      "Your username needs to be between 6 and 20 characters long",
                  },
                  {
                    max: 20,
                    message:
                      "Your username needs to be between 6 and 20 characters long",
                  },
                ]}
                style={{ width: "100%", marginBottom: "8px" }}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Your username"
                  style={{ height: "35px" }}
                  defaultValue={user.username}
                  // value={newData?.username ?? user.username}
                  // defaultValue={newData?.username ?? user.username}
                  onChange={handleChangeUsername}
                  name="username"
                />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}
