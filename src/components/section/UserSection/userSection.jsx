import { Button, Form, Input, message, Modal, Popconfirm } from "antd";
import { BellOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../../../api/userApi";
import "./userSection.css";
import IdeaApi from "../../../api/ideaApi";
import AccountDropdown from "../../base/AccountDropdown/accountDropdown";
const { TextArea } = Input;
export default function UserSection({ isAuthen, setIsAddNewIdea }) {
  const navigate = useNavigate();
  const [idea, setIdea] = useState({ userId: "", content: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialContent, setInitialContent] = useState("");
  //  const [contentDefault, setContentDefault] = useState("");
  const getCurrentUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
      setIsAdmin(response.isAdmin);
    } catch (error) {}
  };

  useEffect(() => {
    if (userId.length > 0) {
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
    setInitialContent("");
    setIsModalOpen(true);
  };
  // const handleChangeTextAreaData = (e) => {
  //   setContentDefault(e.target.value);
  //   setIdea({
  //     userId: userId,
  //     content: e.target.value,
  //   });
  // };
  const handleClickOkBtn = () => {
    if (idea && idea.content.length > 0) {
      handleCreateIdea();
      resetAllData();
      setIsModalOpen(false);
    }
    //TODO: show error message empty field
  };
  const handleCreateIdea = async () => {
    try {
      const response = await IdeaApi.addIdea(idea);
      messageApi.open({
        type: "success",
        content: "Add new ideas successfully",
        duration: 5,
      });
      setIsAddNewIdea(true);
    } catch (error) {}
  };

  const resetAllData = () => {
    // setContentDefault(" ");
    // setIdea({ userId: "", content: "" });
  };

  // useEffect(() => {}, [initialContent]);
  const handleConfirmCancel = () => {
    setInitialContent("JK");
    setIsModalOpen(false);
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
          <BellOutlined />
        </button>
        <AccountDropdown user={user}></AccountDropdown>
        <Modal
          title="Add new idea"
          open={isModalOpen}
          onOk={handleClickOkBtn}
          // onCancel={handleCancel}
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
                // onChange={handleChangeTextAreaData}
                // value={contentDefault}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIdea({
                    userId: userId,
                    content: e.target.value,
                  });
                }}
                // value={initialContent}
                defaultValue={initialContent}
                allowClear
                onPressEnter
              />
            </Form.Item>
          </Form>
        </Modal>
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
