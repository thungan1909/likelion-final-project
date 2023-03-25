import { Button, Form, Input, message, Modal } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../../../api/userApi";
import "./userSection.css";
import IdeaApi from "../../../api/ideaApi";
import AccountDropdown from "../../base/AccountDropdown/accountDropdown";
const { TextArea } = Input;
export default function UserSection({ isAuthen }) {
  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
      setIsAdmin(response.isAdmin);
    } catch (error) {}
  };
  useEffect(() => {
    getCurrentUser();
  }, [userId]);

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
    if (idea && idea.content.length > 0) {
      handleCreateIdea();
    }
    //TODO: show error message empty field
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
      messageApi.open({
        type: "success",
        content: "Add new ideas successfully",
        duration: 5,
      });
      setIsModalOpen(false);
      setIdea("");
      setTimeout(() => {
        window.location.reload();
      }, 500);
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
        {contextHolder}
        <button className="user-section_addBtn btn" onClick={handleAddIdea}>
          Add new idea
        </button>
        <button className="user-section_notify">
          <BellOutlined />
        </button>
        <AccountDropdown user={user}></AccountDropdown>
        <Modal
          title="Add new idea"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="user-section-modal"
          // okText="Post"
          // cancelText="Cancel"
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Add
            </Button>,
          ]}
        >
          <Form>
            <Form.Item
              label={
                <label
                  style={{
                    color: "#7e57c2",
                    fontWeight: "bold",
                  }}
                >
                  Content
                </label>
              }
              name="content"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              style={{ width: "380px", marginBottom: "8px" }}
            >
              <TextArea
                className="user-section-modal__input"
                placeholder="Your idea..."
                name="content"
                rows={5}
                onChange={handleChange}
                allowClear
                onPressEnter
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
