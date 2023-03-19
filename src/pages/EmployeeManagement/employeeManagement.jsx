import { Button } from "antd";
import CustomTable from "../../components/CustomTable/customTable";

export default function EmployeeManagement() {
  return (
    <>
      <Button style={{ marginBottom: "16px" }}>Add</Button>
      <CustomTable></CustomTable>
    </>
  );
}
