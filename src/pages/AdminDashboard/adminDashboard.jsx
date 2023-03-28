import { useEffect, useState } from "react";
import UserApi from "../../api/userApi";
import CustomCard from "../../components/CustomCard/customCard";
import UserStatisticSection from "../../components/section/UserStatisticSection/userStatisticSection";

export default function AdminDashboard() {
  return (
    <>
      <UserStatisticSection />
    </>
  );
}
