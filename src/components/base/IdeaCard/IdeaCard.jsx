import "./IdeaCard.css";
import Avt1 from "../../../assets/img/avt/avt1.jpg";
import { LikeOutlined } from "@ant-design/icons";
import { DislikeOutlined } from "@ant-design/icons/lib/icons";
import { useEffect, useState } from "react";
import UserApi from "../../../api/userApi";
import { checkIsAuthenticated } from "../../../utils";
import { Popover } from "antd";

export default function IdeaCard({ idea, isAuthen }) {
  let userId = idea.userId;
  const [user, setUser] = useState("");
  const [openLike, setOpenLike] = useState(false);
  const [openDislike, setOpenDislike] = useState(false);
  const gettUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
    } catch (error) {}
    return user;
  };

  useEffect(() => {
    gettUser();
  }, [userId]);

  // const handleCheckIsAuthen = () => {
  //   const token = localStorage.getItem("access_token");
  //   return token && token.length > 0 ? checkIsAuthenticated(token) : false;
  // };
  const handleLike = () => {
    // const isAuthen = handleCheckIsAuthen();
    console.log("isAuthen3", isAuthen);
    if (!isAuthen) {
      setOpenLike(true);
    }
  };

  const handleDislike = () => {
    // const isAuthen = handleCheckIsAuthen();
    console.log("isAuthen4", isAuthen);
    if (!isAuthen) {
      setOpenDislike(true);
    }
  };
  const hide = () => {
    setOpenLike(false);
    setOpenDislike(false);
  };

  if (idea) {
    return (
      <div className="idea-card">
        <img className="idea-card__author-avatar" src={Avt1}></img>
        <div className="idea-card__wrapper">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="idea-card__author-username">{user.username}</span>
            <span className="idea-card__createAt">{idea.createAt}</span>
          </div>
          <p className="idea-card__content">{idea.content}</p>
          <div className="idea-card__action">
            <Popover
              placement="rightBottom"
              content={
                <div className="popover__content">
                  <span>
                    Join the{" "}
                    <span style={{ fontWeight: "bold" }}>Idea hub</span>{" "}
                    community to make your opinion count.
                  </span>
                  <div className="popover__content--action">
                    <a href="/login" className="popover__content--action-btn">
                      Login
                    </a>
                    <a
                      href="/register"
                      className="popover__content--action-btn"
                    >
                      Register
                    </a>
                  </div>
                  <a onClick={hide}>Close</a>
                </div>
              }
              title="Like this idea?"
              open={openLike}
              onOpenChange={handleLike}
              trigger="click"
            >
              <button
                className="idea-card__actionBtn idea-card__like"
                onClick={handleLike}
              >
                <LikeOutlined />
                <span className="idea-card__actionBtn--count">
                  {idea.countLike}
                </span>
              </button>
            </Popover>

            <Popover
              placement="rightBottom"
              content={
                <div className="popover__content">
                  <span>
                    Join the{" "}
                    <span style={{ fontWeight: "bold" }}>Idea hub</span>{" "}
                    community to make your opinion count.
                  </span>
                  <div className="popover__content--action">
                    <button className="popover__content--action-btn">
                      Login
                    </button>
                    <button className="popover__content--action-btn">
                      Register
                    </button>
                  </div>
                  <a onClick={hide}>Close</a>
                </div>
              }
              title="Don't like this idea?"
              trigger="click"
              open={openDislike}
              onOpenChange={handleDislike}
            >
              <button className="idea-card__actionBtn idea-card__dislike">
                <DislikeOutlined />
                <span className="idea-card__actionBtn--count">
                  {idea.countDislike}
                </span>
              </button>
            </Popover>
          </div>
        </div>
      </div>
      // </div>
    );
  }
}
