import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../api/AuthApi";
// import LoginImg from "../../assets/img/login-img.jpg";
// import "./login.css";

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
    // console.log(value);
  };
  useEffect(() => {
    if (isFinish) {
      //   console.log(user);
      AuthApi.register({ user });
      //TODO: Return exists users error
      navigate("/login", { replace: "true" });
    }
  }, [isFinish]);
  //   useEffect(() => {
  //     console.log(user);
  //   }, user);
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
      >
        <h1>Register</h1>
        <span style={{ color: "#A3AED0" }}>
          Enter your username and password to sign in!
        </span>
        <Form.Item
          style={{ marginTop: "24px" }}
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
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Your email"
          />
        </Form.Item>
        <Form.Item
          style={{ marginTop: "24px" }}
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
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Your username"
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
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ color: "#7e57c2" }}>Remember me</Checkbox>
          </Form.Item> */}

          <a className="login-form-forgot" href="">
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
            Register
          </Button>
          Not registered yet?{" "}
          <a href="" style={{ color: "#7e57c2" }}>
            Create an account
          </a>
        </Form.Item>
      </Form>
      {/* <Space>
        <img src={LoginImg}></img>
      </Space> */}
    </Space>
  );
}
