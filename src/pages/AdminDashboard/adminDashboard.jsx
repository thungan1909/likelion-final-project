import { useEffect, useState } from "react";
import UserApi from "../../api/userApi";
import CustomCard from "../../components/CustomCard/customCard";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const getAllUsers = async () => {
    try {
      // const response = await UserApi.getAllUsersAPI();
      // console.log(response.length);
      const response = await UserApi.getNumberUsersAPI();
      console.log(response);
      setData(response);
    } catch (error) {}
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <CustomCard></CustomCard>
    </>
  );
}
