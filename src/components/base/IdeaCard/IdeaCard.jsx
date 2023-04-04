import "./IdeaCard.css";
import Avt1 from "../../../assets/img/avt/avt1.jpg";
import { LikeOutlined } from "@ant-design/icons";
import { DislikeOutlined, LikeFilled } from "@ant-design/icons/lib/icons";
import { useEffect, useRef, useState } from "react";
import UserApi from "../../../api/userApi";
import { Button, Popover } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import IdeaApi from "../../../api/ideaApi";

export default function IdeaCard({
  idea,
  isAuthen,
  isChangeLike,
  setIsChangeLike,
}) {
  const [ideaState, setIdeaState] = useState(idea);
  let authorID = idea.author;
  const userId = localStorage.getItem("userId");
  const [author, setAuthor] = useState("");
  const [openLike, setOpenLike] = useState(false);
  const [isLikedBefore, setIsLikedBefore] = useState(false);
  const navigate = useNavigate();
  let thisIdea = useRef(null);

  const getthisAuthor = async () => {
    try {
      const response = await UserApi.getUserById(authorID);
      setAuthor(response);
    } catch (error) {}
  };

  const getLikeAPI = async (tempIsLikedBefore) => {
    let ideaId = thisIdea.current?._id;
    try {
      const response = await IdeaApi.likeIdeaByIdAPI(ideaId, userId);
      setIsLikedBefore(!tempIsLikedBefore);
      setIsChangeLike(true);
      // fetch the updated idea and update the idea state
      const updatedIdea = await IdeaApi.getIdeaByIdAPI(ideaId);
      setIdeaState(updatedIdea);
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
      setIdeaState(updatedIdea);
    } catch (error) {
      console.log(error);
    }
  };
  const checkIsLiked = () => {
    if (idea) {
      if (idea.likedBy.includes(userId)) {
        setIsLikedBefore(true);
      }
    }
  };

  useEffect(() => {
    getthisAuthor();
  }, [authorID]);

  useEffect(() => {
    checkIsLiked();
  }, [isChangeLike]);

  const handleClickLikeBtn = (idea) => {
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
                {author.username}
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
            onOpenChange={() => handleClickLikeBtn(idea)}
            trigger="click"
          >
            <button
              className="idea-card__actionBtn btn idea-card__like"
              onClick={() => handleClickLikeBtn(idea)}
            >
              {isLikedBefore ? <LikeFilled /> : <LikeOutlined />}
              <span className="idea-card__actionBtn--count btn">
                {ideaState.countLike}
              </span>
            </button>
          </Popover>

          {/* <Popover
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
          </Popover> */}
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
