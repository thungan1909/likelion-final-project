import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function UserSection({ isAuthen }) {
  console.log(isAuthen);
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/login", { replace: "true" });
  };
  const handleNavigateSignup = () => {
    navigate("/register", { replace: "true" });
  };
  useEffect(() => {}, [isAuthen]);
  if (!isAuthen) {
    return (
      <div className="banner-section__btnWrapper">
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
      <>
        <button className="user-section_addBtn btn">Add new idea</button>
      </>
    );
  }
}
