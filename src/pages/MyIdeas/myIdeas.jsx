import { Col, Row } from "antd";
import IdeaApi from "../../api/ideaApi";
import { useEffect, useState } from "react";
import IdeaCard from "../../components/base/IdeaCard/IdeaCard";
import HeaderSection from "../../components/section/HeaderSection/headerSection";

export default function MyIdeas({ isAuthen }) {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");
  const [isAddNewIdea, setIsAddNewIdea] = useState(false);
  const showAllMyIdeas = async () => {
    try {
      const response = await IdeaApi.getIdeasByUserId(userId);
      setData(response);
    } catch (error) {}
  };
  useEffect(() => {
    if (userId !== undefined) {
      showAllMyIdeas();
    }
  }, []);

  useEffect(() => {
    if (isAddNewIdea) {
      showAllMyIdeas();
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
          {data?.length === 0 ? (
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
