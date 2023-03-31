import "./IdeaCard.css";
import Avt1 from "../../../assets/img/avt/avt1.jpg";
import { LikeOutlined } from "@ant-design/icons";
import { DislikeOutlined } from "@ant-design/icons/lib/icons";
import { useEffect, useState } from "react";
import UserApi from "../../../api/userApi";
import { Button, Popover } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

export default function IdeaCard({ idea, isAuthen }) {
  let userId = idea.userId;
  const [user, setUser] = useState("");
  const [openLike, setOpenLike] = useState(false);
  const [openDislike, setOpenDislike] = useState(false);
  const navigate = useNavigate();
  const getthisUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
    } catch (error) {}
    return user;
  };

  useEffect(() => {
    getthisUser();
  }, [userId]);

  const handleLike = () => {
    if (!isAuthen) {
      setOpenLike(true);
    }
  };

  const handleDislike = () => {
    if (!isAuthen) {
      setOpenDislike(true);
    }
  };
  const hide = () => {
    setOpenLike(false);
    setOpenDislike(false);
  };
  const handleClickSeeDetail = (ideaId) => {
    navigate(`/detail/${ideaId}`, { replace: true });
  };

  if (idea) {
    return (
      <div className="idea-card">
        <div style={{ display: "flex" }}>
          <img
            alt="author avatar image"
            className="idea-card__author-avatar"
            src={Avt1}
          ></img>
          <div className="idea-card__wrapper">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="idea-card__author-username">
                {user.username}
              </span>
              <span className="idea-card__createAt">{idea.createAt}</span>
            </div>
            <p className="idea-card__content">{idea.content}</p>
          </div>
        </div>
        <div className="idea-card__action">
          <Popover
            placement="rightBottom"
            content={
              <div className="popover__content">
                <span>
                  Join the <span style={{ fontWeight: "bold" }}>Idea hub</span>{" "}
                  community to make your opinion count.
                </span>
                <div className="popover__content--action">
                  <a href="/login" className="popover__content--action-btn btn">
                    Login
                  </a>
                  <a
                    href="/register"
                    className="popover__content--action-btn btn"
                  >
                    Register
                  </a>
                </div>
                <button className="popover__content--closeBtn" onClick={hide}>
                  Close
                </button>
              </div>
            }
            title="Like this idea?"
            open={openLike}
            onOpenChange={handleLike}
            trigger="click"
          >
            <button
              className="idea-card__actionBtn btn idea-card__like"
              onClick={handleLike}
            >
              <LikeOutlined />
              <span className="idea-card__actionBtn--count btn">
                {idea.countLike}
              </span>
            </button>
          </Popover>

          <Popover
            placement="rightBottom"
            content={
              <div className="popover__content">
                <span>
                  Join the <span style={{ fontWeight: "bold" }}>Idea hub</span>{" "}
                  community to make your opinion count.
                </span>
                <div className="popover__content--action">
                  <button className="popover__content--action-btn btn">
                    Login
                  </button>
                  <button className="popover__content--action-btn btn">
                    Register
                  </button>
                </div>
                <button onClick={hide}>Close</button>
              </div>
            }
            title="Don't like this idea?"
            trigger="click"
            open={openDislike}
            onOpenChange={handleDislike}
          >
            <button className="idea-card__actionBtn btn idea-card__dislike">
              <DislikeOutlined />
              <span className="idea-card__actionBtn--count">
                {idea.countDislike}
              </span>
            </button>
          </Popover>
          <button
            className=" idea-card__actionBtn btn"
            onClick={() => handleClickSeeDetail(idea._id)}
          >
            See details
          </button>
        </div>
      </div>
      // </div>
    );
  }
}
