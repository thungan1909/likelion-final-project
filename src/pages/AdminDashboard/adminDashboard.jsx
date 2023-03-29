import { useEffect, useState } from "react";
import UserApi from "../../api/userApi";
import CustomCard from "../../components/base/CustomCard/customCard";
import UserStatisticSection from "../../components/section/UserStatisticSection/userStatisticSection";

export default function AdminDashboard() {
  return (
    <>
      <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>Overview page</h1>
      <UserStatisticSection />
    </>
  );
}
