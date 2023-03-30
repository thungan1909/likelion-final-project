import {
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  LockOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../api/authApi";
import "../Login/login.css";
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
      console.log(response);
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
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        fontFamily: "inherit",
      }}
    >
      <div className="login-wrapper">
        <div className="login-title">
          <h1 className="login-name">IDEA HUB</h1>
          <span className="login-slogan">Share your ideas</span>
        </div>
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
            backgroundColor: "var(--white-color)",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <h1 style={{ color: "var(--primary-color)" }}>Register</h1>
            <span style={{ color: "var(--black-color)" }}>
              Enter your email, username and password to register!
            </span>
          </div>
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
                  "Your password needs to be between 6 and 20 characters long",
              },
              {
                max: 20,
                message:
                  "Your password needs to be between 6 and 20 characters long",
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
                  color: "var(--primary-color)",
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
                  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,30}$",
                message:
                  "Your password needs to be between 6 and 30 characters long and contain one uppercase letter, one lowercase, one number and one special character.",
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
                    color: "var(--primary-color)",
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
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
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="authen-form-button btn"
              style={{
                width: "100%",
                marginBottom: "24px",
              }}
            >
              Register
            </Button>
            Already have an account?{" "}
            <a href="/login" style={{ color: "var(--primary-color)" }}>
              Login
            </a>
          </Form.Item>
        </Form>
      </div>
      <div className="login-intro">
        <h1 className="login-intro__title animated">
          We’d love to hear your ideas
        </h1>
        <span className="login-intro__slogan animated">
          Have a lot of fantastic ideas? We'd love to hear your ideas and help
          you tell them to the world.
        </span>
        <span className="login-intro__contact-email">
          nganthudoan2001@gmail.com
        </span>
        <ul className="login-intro__social-media">
          <li className="login-intro__social-media-item">
            <a
              href="https://www.facebook.com/doanthungan19"
              className="login-intro__social-media-link"
            >
              <FacebookOutlined
                style={{
                  fontSize: "40px",
                  padding: "4px",
                  backgroundColor: "var(--primary-color)",
                  color: "inherit",
                  borderRadius: "8px",
                }}
              />
            </a>
          </li>
          <li className="login-intro__social-media-item">
            <a
              href="https://www.linkedin.com/in/%C4%91o%C3%A0n-thu-ng%C3%A2n-76a6ab233/"
              className="login-intro__social-media-link"
            >
              <LinkedinOutlined
                style={{
                  fontSize: "40px",
                  padding: "4px",
                  backgroundColor: "var(--primary-color)",
                  color: "inherit",
                  borderRadius: "8px",
                }}
              />
            </a>
          </li>
          <li className="login-intro__social-media-item">
            <a
              href="https://github.com/thungan1909"
              className="login-intro__social-media-link"
            >
              <GithubOutlined
                style={{
                  fontSize: "40px",
                  padding: "4px",
                  backgroundColor: "var(--primary-color)",
                  color: "inherit",
                  borderRadius: "8px",
                }}
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
