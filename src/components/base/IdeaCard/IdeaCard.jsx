import "./IdeaCard.css";
import Avt1 from "../../../assets/img/avt/avt1.jpg";
import { LikeOutlined } from "@ant-design/icons";
import { DislikeOutlined } from "@ant-design/icons/lib/icons";
import { useEffect, useState } from "react";
import UserApi from "../../../api/userApi";
export default function IdeaCard({ idea }) {
  let userId = idea.userId;
  const [user, setUser] = useState("");
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
  if (idea) {
    return (
      <div className="idea-card">
        {/* <div className="idea-card__author"> */}
        <img className="idea-card__author-avatar" src={Avt1}></img>
        <div className="idea-card__wrapper">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="idea-card__author-username">{user.username}</span>
            <span className="idea-card__createAt">{idea.createAt}</span>
          </div>
          <p className="idea-card__content">{idea.content}</p>
          <div className="idea-card__action">
            <button className="idea-card__actionBtn idea-card__like">
              <LikeOutlined />
              <span className="idea-card__actionBtn--count">
                {idea.countLike}
              </span>
            </button>
            <button className="idea-card__actionBtn idea-card__dislike">
              <DislikeOutlined />
              <span className="idea-card__actionBtn--count">
                {idea.countDislike}
              </span>
            </button>
          </div>
        </div>
      </div>
      // </div>
    );
  }
}
