import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../api/authApi";
import LoginImg from "../../assets/img/login-img.jpg";
import authServices from "../../service/authServices";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [isFinish, setIsFinish] = useState(false);
  const onFinish = (value) => {
    setUser({
      username: value.username,
      password: value.password,
    });
    setIsFinish(true);
  };
  const login = async (req) => {
    try {
      const response = await AuthApi.login(req);
      console.log("response", response.accessToken);
      //todo: check is success response
      localStorage.setItem("access_token", response.accessToken);
      navigate("/home", { replace: "true" });
    } catch (error) {
      console.log(error.message);
      // console.log(error.response);
      // console.log("Login error", error);
      // console.log(parseInt(error.message, 10));
    }
  };
  useEffect(() => {
    if (isFinish) {
      login(user);
    }
  });
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
        name="loginForm"
        className="login-form"
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
          <h1>Login</h1>
          <span style={{ color: "#A3AED0", marginBottom: "24px" }}>
            Enter your username and password to sign in!
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
          ]}
          style={{ width: "380px", marginBottom: "8px" }}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            style={{ height: "33px" }}
          />
        </Form.Item>
        <Form.Item>
          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ color: "#7e57c2" }}>Remember me</Checkbox>
          </Form.Item> */}

          <a className="login-form-forgot" href="/forgotPassword">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{
              backgroundColor: "#b299da",
              width: "100%",
              marginBottom: "24px",
            }}
          >
            Log in
          </Button>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#7e57c2" }}>
            Create an account
          </a>
        </Form.Item>
      </Form>
      <Space>
        <img src={LoginImg}></img>
      </Space>
    </Space>
  );
}
