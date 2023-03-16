import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../service/authServices";
import LoginImg from "../../assets/img/login-img.jpg";
import AuthApi from "../../api/authApi";
export default function Register() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [isFinish, setIsFinish] = useState(false);
  const navigate = useNavigate();
  const onFinish = (value) => {
    setUser({
      email: value.email,
      username: value.username,
      password: value.password,
    });

    setIsFinish(true);
  };

  const register = async (req) => {
    try {
      const response = await AuthApi.createUser(req);
      //TODO: Return exists users error
      navigate("/login", { replace: "true" });
    } catch (error) {
      console.log("register error", error);
    }
  };
  useEffect(() => {
    if (isFinish) {
      register(user);
    }
  }, [isFinish]);

  return (
    <Space
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="authForm"
        className="authen-Form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        style={{
          padding: "24px",
          borderRadius: "4px",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 4px 0px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h1>Register</h1>
          <span style={{ color: "#A3AED0", marginBottom: "24px" }}>
            Enter your email, username and password to register!
          </span>
        </div>
        <Form.Item
          label={
            <label
              style={{
                color: "#7e57c2",
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
              required: true,
              message: "This field is required",
            },
          ]}
          style={{ width: "380px", marginBottom: "8px" }}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Your email"
            style={{ height: "33px" }}
          />
        </Form.Item>
        <Form.Item
          label={
            <label
              style={{
                color: "#7e57c2",
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
          ]}
          style={{ width: "380px", marginBottom: "8px" }}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Your username"
            style={{ height: "33px" }}
          />
        </Form.Item>

        <Form.Item
          label={
            <label
              style={{
                color: "#7e57c2",
                fontWeight: "bold",
              }}
            >
              Password
            </label>
          }
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
            {
              pattern:
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$",
              message:
                "Your password needs to be between 8 and 30 characters long and contain one uppercase letter, one lowercase, one number and one special character.",
            },
          ]}
          style={{ width: "380px", marginBottom: "8px" }}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Your password"
            style={{ height: "33px" }}
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label={
            <label>
              {" "}
              <label
                style={{
                  color: "#7e57c2",
                  fontWeight: "bold",
                }}
              >
                Confirm Password
              </label>
            </label>
          }
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
          style={{ width: "380px", marginBottom: "8px" }}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm password"
            style={{ height: "33px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="authen-form-button"
            style={{
              backgroundColor: "#b299da",
              width: "100%",
              marginBottom: "24px",
            }}
          >
            Register
          </Button>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#7e57c2" }}>
            Login
          </a>
        </Form.Item>
      </Form>
      <Space>
        <img src={LoginImg}></img>
      </Space>
    </Space>
  );
}
