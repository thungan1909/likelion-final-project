import { Col, Row, Spin } from "antd";
import IdeaApi from "../../api/ideaApi";
import { useEffect, useState } from "react";
import IdeaCard from "../../components/base/IdeaCard/IdeaCard";
import HeaderSection from "../../components/section/HeaderSection/headerSection";

export default function MyIdeas({ isAuthen }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const userId = localStorage.getItem("userId");
  const [isAddNewIdea, setIsAddNewIdea] = useState(false);
  const showAllMyIdeas = async () => {
    try {
      setLoading(true);
      const response = await IdeaApi.getIdeasByUserId(userId);
      response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userId !== undefined) {
      showAllMyIdeas();
    }
  }, [count]);
  useEffect(() => {
    if (isAddNewIdea) {
      setCount((prevCount) => prevCount + 1);
      setIsAddNewIdea(false);
    }
  }, [isAddNewIdea]);
  if (userId !== undefined) {
    return (
      <div style={{ margin: "24px" }}>
        <HeaderSection isAuthen={true} setIsAddNewIdea={setIsAddNewIdea} />
        <h1
          style={{
            color: "var(--primary-color)",
            marginBottom: "24px",
            fontFamily: "inherit",
            fontSize: "40px",
          }}
        >
          My ideas
        </h1>
        <Row gutter={16} className="exploreIdea__row">
          {loading ? (
            <Spin tip="Loading" size="large" />
          ) : data?.length === 0 ? (
            <div className="exploreIdea__empty">No idea. Add new ideas now</div>
          ) : (
            data.map((item, index) => {
              return (
                <Col
                  className="exploreIdea__column"
                  xs={{
                    span: 24,
                    // offset: 1,
                  }}
                  sm={{
                    span: 11,
                  }}
                  lg={{
                    span: 6,
                  }}
                  key={index}
                >
                  <IdeaCard idea={item} isAuthen={isAuthen}></IdeaCard>
                </Col>
              );
            })
          )}
        </Row>
      </div>
    );
  }
}
