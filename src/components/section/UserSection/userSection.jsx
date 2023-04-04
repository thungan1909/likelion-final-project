import { Button, Form, Input, message, Modal, Popconfirm } from "antd";
import {
  BellFilled,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../../../api/userApi";
import "./userSection.css";
import IdeaApi from "../../../api/ideaApi";
import AccountDropdown from "../../base/AccountDropdown/accountDropdown";
const { TextArea } = Input;
export default function UserSection({ isAuthen, setIsAddNewIdea }) {
  const navigate = useNavigate();
  const [idea, setIdea] = useState({ author: "", content: "" });
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getCurrentUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
    } catch (error) {}
  };
  const resetAllData = () => {
    setIdea({ author: "", content: "" });
    form.setFieldsValue({
      author: "",
      content: "",
    });
  };

  useEffect(() => {
    if (userId && userId.length > 0) {
      getCurrentUser();
    }
  }, [userId]);

  const handleNavigateLogin = () => {
    navigate("/login", { replace: "true" });
  };
  const handleNavigateSignup = () => {
    navigate("/register", { replace: "true" });
  };

  const handleClickAddIdeaBtn = () => {
    setIsModalOpen(true);
  };
  const handleClickOkBtn = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        handleCreateIdea();
        setIsModalOpen(false);
        resetAllData();
      })
      .catch((errorInfo) => {
        console.log("Validation error:", errorInfo);
        messageApi.open({
          type: "error",
          content: "Content field cannot be empty",
          duration: 3,
        });
      });
  };
  const handleCreateIdea = async () => {
    try {
      const response = await IdeaApi.addIdea(idea);
      setIsAddNewIdea(true);
      messageApi.open({
        type: "success",
        content: "Add new ideas successfully",
        duration: 3,
      });
    } catch (error) {}
  };

  const handleConfirmCancel = () => {
    setIsModalOpen(false);
    resetAllData();
  };

  if (isAuthen === true) {
    return (
      <div className="user-section_Wrapper">
        {contextHolder}
        <button
          className="user-section_addBtn btn"
          onClick={handleClickAddIdeaBtn}
        >
          Add new idea
        </button>
        {/* TODO: NOTIFICATION */}
        <button className="user-section_notify">
          <BellFilled />
        </button>
        <AccountDropdown user={user}></AccountDropdown>
        {/* Bổ sung isModalOpen ở đây để sửa lỗi khi mở modal lại, modal không reset field */}
        {/* Lý do:  modal isn't being unmounted, but only not displayed. (Modal không thực sự unmounted mà chỉ là không hiển thị ra thôi) */}
        {isModalOpen && (
          <Modal
            title={<h2 className="modal__title">Add new idea</h2>}
            open={isModalOpen}
            onOk={handleClickOkBtn}
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
            className="user-section-modal"
            footer={[
              <Popconfirm
                title="Confirm cancel"
                description="Your unsaved changes will be lost if you confirm cancellation. Are you sure to cancel add new idea?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleConfirmCancel}
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button>Cancel</Button>
              </Popconfirm>,
              <Button key="submit" type="primary" onClick={handleClickOkBtn}>
                Add
              </Button>,
            ]}
          >
            <Form
              form={form}
              onFinish={handleClickAddIdeaBtn}
              onFinishFailed={console.log}
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
                style={{ width: "100%", marginBottom: "8px" }}
              >
                <TextArea
                  className="user-section-modal__input"
                  placeholder="Your idea..."
                  name="content"
                  rows={5}
                  onChange={(e) => {
                    setIdea({
                      author: userId,
                      content: e.target.value,
                    });
                  }}
                  value={idea.content}
                  allowClear
                />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    );
  } else {
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
  }
}
