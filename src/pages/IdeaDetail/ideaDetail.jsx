import HeaderSection from "../../components/section/HeaderSection/headerSection";
import Avt1 from "../../assets/img/profile.png";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import UserApi from "../../api/userApi";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./ideaDetail.css";
import IdeaApi from "../../api/ideaApi";
export default function IdeaDetail() {
  const { id } = useParams();
  const [isAuthen, setIsAuthen] = useState();
  const [idea, setIdea] = useState({});
  const [author, setAuthor] = useState("");
  const [openLike, setOpenLike] = useState(false);
  const [isAddNewIdea, setIsAddNewIdea] = useState(false);
  const [isLikedBefore, setIsLikedBefore] = useState(false);
  const [isChangeLike, setIsChangeLike] = useState(false);
  const [countToChangeLike, setCountToChangeLike] = useState(0);
  const [authorID, setAuthorID] = useState("");
  let thisIdea = useRef(null);
  const userId = localStorage.getItem("userId");

  const handleCheckIsAuthen = () => {
    const token = localStorage.getItem("access_token");
    const _isAuthenticated = token && token.length > 0 ? true : false;
    setIsAuthen(_isAuthenticated);
  };

  const getIdea = async () => {
    try {
      const response = await IdeaApi.getIdeaByIdAPI(id);
      setIdea(response);
      setAuthorID(response.author);
      // checkIsLiked();
      getthisAuthor();
    } catch (error) {
      console.log(error);
    }
  };

  const getthisAuthor = async () => {
    try {
      const response = await UserApi.getUserById(authorID);
      setAuthor(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getLikeAPI = async (tempIsLikedBefore) => {
    let ideaId = thisIdea.current?._id;
    try {
      const response = await IdeaApi.likeIdeaByIdAPI(ideaId, userId);
      setIsLikedBefore(!tempIsLikedBefore);
      setIsChangeLike(true);
      // fetch the updated idea and update the idea state
      const updatedIdea = await IdeaApi.getIdeaByIdAPI(ideaId);
      setIdea(updatedIdea);
    } catch (error) {
      console.log(error);
    }
  };
  const getUnLikeAPI = async (tempIsLikedBefore) => {
    let ideaId = thisIdea.current?._id;
    try {
      const response = await IdeaApi.unlikeIdeaByIdAPI(ideaId, userId);
      setIsLikedBefore(!tempIsLikedBefore);
      setIsChangeLike(true);
      // fetch the updated idea and update the idea state
      const updatedIdea = await IdeaApi.getIdeaByIdAPI(ideaId);
      setIdea(updatedIdea);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const checkIsLiked = () => {
      if (idea && idea.likedBy && idea.likedBy.includes(userId)) {
        setIsLikedBefore(true);
      } else {
        setIsLikedBefore(false);
      }
    };

    checkIsLiked();
  }, [idea, userId]);

  useEffect(() => {
    getthisAuthor();
  }, [authorID]);

  useEffect(() => {
    getIdea();
  }, [countToChangeLike]);

  useEffect(() => {
    if (isChangeLike) {
      setCountToChangeLike((prevCount) => prevCount + 1);
      setIsChangeLike(false);
    }
  }, [isChangeLike]);

  useEffect(() => {
    if (id !== undefined) {
      getIdea();
      handleCheckIsAuthen();
    }
  }, [id]);

  const handleClickLikeBtn = () => {
    if (!isAuthen) {
      setOpenLike(true);
    }
    thisIdea.current = idea;
    let tempIsLikedBefore = isLikedBefore;

    if (isLikedBefore) {
      getUnLikeAPI(tempIsLikedBefore);
    } else {
      getLikeAPI(tempIsLikedBefore);
    }
  };

  const hide = () => {
    setOpenLike(false);
  };

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
                  {author.username}
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
                  onOpenChange={handleClickLikeBtn}
                  trigger="click"
                >
                  <button
                    className="idea-card__actionBtn btn idea-card__like"
                    onClick={handleClickLikeBtn}
                  >
                    {isLikedBefore ? <LikeFilled /> : <LikeOutlined />}
                    <span className="idea-card__actionBtn--count btn">
                      {idea.countLike}
                    </span>
                  </button>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
