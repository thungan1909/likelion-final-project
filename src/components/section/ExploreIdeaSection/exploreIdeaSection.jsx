import { Row } from "antd";
import { useEffect, useState } from "react";
import IdeaApi from "../../../api/ideaApi";
import IdeaCard from "../../base/IdeaCard/IdeaCard";

export default function ExploreIdeaSection() {
  const [data, setData] = useState([]);
  const showAllIdeas = async () => {
    try {
      const response = await IdeaApi.getAllIdea();
      console.log(response);
      setData(response);
    } catch (error) {}
  };
  useEffect(() => {
    showAllIdeas();
  }, []);
  return (
    <div style={{ margin: "24px" }}>
      <Row justify={"space-between"}>
        {data?.length === 0 ? (
          <div></div>
        ) : (
          data.map((item, index) => {
            if (index < 10) {
              return <IdeaCard key={index} idea={item}></IdeaCard>;
            }
          })
        )}
      </Row>
    </div>
  );
}
