import { useEffect, useState } from "react";
import UserApi from "../../../api/userApi";
import CustomCard from "../../CustomCard/customCard";
import { LineChart, Line } from "recharts";
import ChartSection from "../ChartSection/chartSection";
import IdeaApi from "../../../api/ideaApi";

export default function UserStatisticSection() {
  const [data, setData] = useState([]);
  const [usersInMonth, setUsersInMonth] = useState([]);
  const getNewUserInMonth = async () => {
    try {
      const response = await UserApi.getUsersInMonthAPI();
      setUsersInMonth(response);
    } catch (error) {}
  };


  useEffect(() => {
    getNewUserInMonth();
  }, []);
  if (usersInMonth !== undefined) {
    return (
      <>
        <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
          User statistics for the past month
        </h1>
        <div style={{ display: "flex", marginBottom: "48px" }}>
          <CustomCard
            title={"New user"}
            statistic={usersInMonth.length}
          ></CustomCard>
          <CustomCard
            title={"User login"}
            statistic={usersInMonth.length}
          ></CustomCard>
          <CustomCard
            title={"New idea"}
            statistic={usersInMonth.length}
          ></CustomCard>
        </div>
        <ChartSection></ChartSection>
      </>
    );
  }
}
