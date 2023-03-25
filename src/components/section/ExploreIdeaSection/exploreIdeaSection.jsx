import { Col, Row, Space, Table } from "antd";
import { useEffect, useState } from "react";
import IdeaApi from "../../../api/ideaApi";
import IdeaCard from "../../base/IdeaCard/IdeaCard";

export default function ExploreIdeaSection() {
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
      console.log(response);
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

  return (
    <div style={{ margin: "24px" }}>
      <Row gutter={16}>
        {data?.length === 0 ? (
          <div></div>
        ) : (
          data.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <IdeaCard idea={item}></IdeaCard>
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
}
