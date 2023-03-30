import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import IdeaApi from "../../../api/ideaApi";
import UserApi from "../../../api/userApi";
export default function ChartSection() {
  const [listUserData, setListUserData] = useState([]);
  const [listIdeaData, setListIdeaData] = useState([]);

  const handleMapData = ({ response }) => {
    const newData = response.map((item, index) => ({
      index: index,
      name: `${item.start} - ${item.end}`,
      countUser: item.countUser,
    }));
    setListUserData(newData);
  };

  const handleMapIdeaData = ({ response }) => {
    const newData = response.map((item, index) => ({
      index: index,
      countIdea: item.countIdea,
    }));
    setListIdeaData(newData);
  };

  const getNewUsersPerWeekInMonth = async () => {
    try {
      const response = await UserApi.getUsersPerWeekInMonthAPI();
      handleMapData({ response });
    } catch (error) {}
  };

  const getNewIdeaPerWeekInMonth = async () => {
    try {
      const response = await IdeaApi.getIdeasPerWeekInMonthAPI();
      handleMapIdeaData({ response });
    } catch (error) {}
  };

  const mergedArr = listUserData.map((item1) => {
    const item2 = listIdeaData.find((item2) => item2.index === item1.index);
    return { ...item1, ...item2 };
  });
  useEffect(() => {
    getNewUsersPerWeekInMonth();
    getNewIdeaPerWeekInMonth();
  }, []);

  return (
    <>
      <BarChart
        width={1000}
        height={250}
        data={mergedArr}
        barGap={12}
        barSize={50}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="countUser" name="New Users" fill="var(--primary-color)" />
        <Bar dataKey="countIdea" name="New Ideas" fill="#610f7f" />
      </BarChart>
    </>
  );
}
