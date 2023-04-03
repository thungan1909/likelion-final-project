import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import IdeaApi from "../../../api/ideaApi";
import IdeaCard from "../../base/IdeaCard/IdeaCard";
import "./exploreIdeaSection.css";
export default function ExploreIdeaSection({
  isAuthen,
  isAddNewIdea,
  setIsAddNewIdea,
}) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const showAllIdeas = async () => {
    try {
      const response = await IdeaApi.getAllIdea();
      response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(response);
    } catch (error) {}
  };

  useEffect(() => {
    showAllIdeas();
  }, [count]);
  //cách cũ
  // useEffect(() => {
  //   showAllIdeas();
  // }, []);
  useEffect(() => {
    if (isAddNewIdea) {
      //giải quyết vấn đề khi thêm một idea mới thì trang web không cập nhật ngay lập tức mà phải reload lại mới cập nhật
      //Cách làm cũ:showAllIdeas()
      //lý do: Khi state isAddNewIdea = true thì nó sẽ chạy bên trong useEffect này => và chạy hàm showAllIdeas()
      //khi đó state data sẽ cập nhật
      //mà mỗi làn re-render lại component này, state data lại bị cập nhật quay về mảng rỗng
      //=> giải quyết: thêm state để quản lý số lần thêm mới ý tưởng
      //=>count thay đổi => showAllIdeas()
      //=> data thay đổi => re-render lại component và hiển thị ý tưởng vừa thêm
      setCount((prevCount) => prevCount + 1);
      setIsAddNewIdea(false);
    }
  }, [isAddNewIdea]);

  return (
    <div className="exploreIdea__wrapper" style={{ margin: "24px" }}>
      <h1
        style={{
          color: "var(--primary-color)",
          marginBottom: "24px",
          fontFamily: "inherit",
          fontSize: "40px",
        }}
      >
        Explore ideas
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
