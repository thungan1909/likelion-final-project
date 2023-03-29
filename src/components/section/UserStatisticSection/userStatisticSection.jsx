import { useEffect, useState } from "react";
import UserApi from "../../../api/userApi";

import ChartSection from "../ChartSection/chartSection";
import IdeaApi from "../../../api/ideaApi";
import CustomCard from "../../base/CustomCard/customCard";

export default function UserStatisticSection() {
  const [newUsersInMonth, setNewUsersInMonth] = useState([]);
  const [newIdeasInMonth, setNewIdeasInMonth] = useState([]);
  const getNewUsersInMonth = async () => {
    try {
      const response = await UserApi.getUsersInMonthAPI();
      setNewUsersInMonth(response);
    } catch (error) {}
  };
  const getNewIdeasInMonth = async () => {
    try {
      const response = await IdeaApi.getIdeasInMonthAPI();
      setNewIdeasInMonth(response);
    } catch (error) {}
  };

  useEffect(() => {
    getNewUsersInMonth();
    getNewIdeasInMonth();
  }, []);

  return (
    <>
      <h1
        style={{ textAlign: "center", fontSize: "20px", marginBottom: "24px" }}
      >
        Statistics for the previous month
      </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            marginBottom: "24px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomCard
            title={"New users"}
            statistic={newUsersInMonth ? newUsersInMonth.length : 0}
          ></CustomCard>
          <CustomCard
            title={"New ideas"}
            statistic={newIdeasInMonth ? newIdeasInMonth.length : 0}
          ></CustomCard>
        </div>
        <ChartSection></ChartSection>
      </div>
    </>
  );
}
