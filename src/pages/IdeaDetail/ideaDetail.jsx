import HeaderSection from "../../components/section/HeaderSection/headerSection";
import Avt1 from "../../assets/img/profile.png";
import { LikeOutlined } from "@ant-design/icons";
import { DislikeOutlined } from "@ant-design/icons/lib/icons";
import { Popover } from "antd";
import UserApi from "../../api/userApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ideaDetail.css";
import IdeaApi from "../../api/ideaApi";
import ExploreIdeaSection from "../../components/section/ExploreIdeaSection/exploreIdeaSection";
export default function IdeaDetail() {
  const { id } = useParams();

  const [isAuthen, setIsAuthen] = useState();

  const [idea, setIdea] = useState({});
  const [user, setUser] = useState("");
  const [openLike, setOpenLike] = useState(false);
  const [openDislike, setOpenDislike] = useState(false);
  const [isAddNewIdea, setIsAddNewIdea] = useState(false);
  const handleCheckIsAuthen = () => {
    const token = localStorage.getItem("access_token");
    const _isAuthenticated = token && token.length > 0 ? true : false;
    setIsAuthen(_isAuthenticated);
  };
  const getIdea = async () => {
    try {
      const response = await IdeaApi.getIdeaByIdAPI(id);
      // console.log(response);
      setIdea(response);
      getthisUser(response.userId);
    } catch (error) {}
    return user;
  };
  const getthisUser = async (userId) => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
    } catch (error) {}
    return user;
  };
  useEffect(() => {
    if (id !== undefined) {
      getIdea();
    }
  }, [id]);

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
  useEffect(() => {
    handleCheckIsAuthen();
  }, []);

  console.log(isAuthen);
  console.log(idea);
  if (isAuthen !== undefined && idea) {
    return (
      <div className="idea-detail">
        <HeaderSection isAuthen={isAuthen} setIsAddNewIdea={setIsAddNewIdea} />
        <div style={{ margin: "24px" }}>
          <h1
            style={{
              color: "var(--primary-color)",
              marginBottom: "24px",
              fontFamily: "inherit",
              fontSize: "40px",
            }}
          >
            Idea Detail
          </h1>
          <div className="idea-detail__content">
            <img
              alt="author avatar image"
              className="idea-detail__author-avatar"
              src={Avt1}
            ></img>
            <div className="idea-detail__wrapper">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="idea-card__author-username">
                  {user.username}
                </span>
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
                        <a
                          href="/login"
                          className="popover__content--action-btn btn"
                        >
                          Login
                        </a>
                        <a
                          href="/register"
                          className="popover__content--action-btn btn"
                        >
                          Register
                        </a>
                      </div>
                      <button
                        className="popover__content--closeBtn"
                        onClick={hide}
                      >
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
                        Join the{" "}
                        <span style={{ fontWeight: "bold" }}>Idea hub</span>{" "}
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
              </div>
            </div>
          </div>
        </div>
        <ExploreIdeaSection
          isAuthen={isAuthen}
          isAddNewIdea={isAddNewIdea}
          setIsAddNewIdea={setIsAddNewIdea}
        />
      </div>
    );
  }
}
