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
import UserApi from "../../../api/userApi";
export default function ChartSection() {
  // const [usersData, setUsersData] = useState([]);
  const [mapUserData, setMapUserData] = useState([]);

  const mapData = ({ response }) => {
    const newData = response.map((item, index) => ({
      index: index,
      name: `${item.start} - ${item.end}`,
      count: item.count,
    }));
    setMapUserData(newData);
  };

  const getNewUsersPerWeekInMonth = async () => {
    try {
      const response = await UserApi.getUsersPerWeekInMonthAPI();
      mapData({ response });
    } catch (error) {}
  };

  useEffect(() => {
    getNewUsersPerWeekInMonth();
  }, []);

  console.log(mapUserData);
  return (
    <>
      <BarChart
        width={1000}
        height={250}
        data={mapUserData}
        barGap={12}
        barSize={50}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </>
  );
}
