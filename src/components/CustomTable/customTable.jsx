import { Table } from "antd";
import { useEffect, useState } from "react";
import UserApi from "../../api/userApi";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (username) => `${username}`,
    width: "30%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email) => `${email}`,
    width: "30%",
  },
  {
    title: "Role",
    dataIndex: "isAdmin",
    key: "role",
    render: (isAdmin) => `${isAdmin}`,
    width: "20%",
  },
];
export default function CustomTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const getAllUsers = async () => {
    try {
      const response = await UserApi.getAllUser();
      setData(response);
      console.log(response);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.length,
        },
      });
    } catch (error) {}
  };
  useEffect(() => {
    getAllUsers();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return <Table columns={columns} dataSource={data}></Table>;
}
