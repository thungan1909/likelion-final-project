import {
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthApi from "../../api/authApi";
// import LoginImg from "../../assets/img/login-img.jpg";
import "./login.css";
import { login, loginSuccess } from "../../redux/actions/auth";

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onFinish = async (value) => {
    const user = {
      username: value.username,
      password: value.password,
    };
    dispatch(login());
    try {
      const response = await AuthApi.login(user);
      dispatch(
        loginSuccess({
          accessToken: response.accessToken,
          userId: response._id,
        })
      );
      navigate("/home", { replace: "true" });
    } catch (error) {
      console.log(error);
    }
  };

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
          name="loginForm"
          className="login-form"
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
            <h1 style={{ color: "var(--primary-color)" }}>Login</h1>
            <span style={{ color: "var(--black-color)" }}>
              Enter your username and password to sign in!
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
            <a className="login-form-forgot" href="/forgotPassword">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button btn"
              style={{
                width: "100%",
                marginBottom: "24px",
              }}
            >
              Log in
            </Button>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "var(--primary-color)" }}>
              Create an account
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
