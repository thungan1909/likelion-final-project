import { Col, Row, Space, Table } from "antd";
import { useEffect, useState } from "react";
import IdeaApi from "../../../api/ideaApi";
import IdeaCard from "../../base/IdeaCard/IdeaCard";

export default function ExploreIdeaSection({
  isAuthen,
  isAddNewIdea,
  setIsAddNewIdea,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const showAllIdeas = async () => {
    try {
      const response = await IdeaApi.getAllIdea();
      setData(response);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.length,
        },
      });
    } catch (error) {}
  };
  useEffect(() => {
    showAllIdeas();
  }, []);

  useEffect(() => {
    if (isAddNewIdea) {
      showAllIdeas();
      setIsAddNewIdea(false);
    }
  }, [isAddNewIdea]);
  return (
    <div style={{ margin: "24px" }}>
      <h1
        style={{
          color: "var(--primary-color)",
          marginBottom: "24px",
          fontFamily: "inherit",
          fontSize: "40px",
        }}
      >
        Top ideas
      </h1>
      <Row gutter={16}>
        {data?.length === 0 ? (
          <div></div>
        ) : (
          data.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <IdeaCard idea={item} isAuthen={isAuthen}></IdeaCard>
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
}
