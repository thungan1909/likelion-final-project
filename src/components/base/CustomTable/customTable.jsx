import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import UserApi from "../../../api/userApi";
import "./customTable.css";

export default function CustomTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: true,
      render: (username) => `${username}`,
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      render: (email) => `${email}`,
      width: "30%",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "role",
      render: (isAdmin) => `${isAdmin}`,
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "User",
          value: "user",
        },
      ],
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "delete",
      render: (_id) => (
        <Popconfirm
          title="Delete user"
          description="Are you sure to delete this user?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleConfirmDelete(_id)}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <button className="btn deleteBtn">Delete</button>
        </Popconfirm>
      ),
      width: "20%",
    },
  ];
  const getAllUsers = async () => {
    try {
      const response = await UserApi.getAllUsersAPI();
      setData(response);
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
  const deleteUser = async (id) => {
    try {
      UserApi.deleteUserById(id);
      getAllUsers();
    } catch (error) {}
  };

  useEffect(() => {
    getAllUsers();
  }, [tableParams]);

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
  const handleConfirmDelete = (id) => {
    deleteUser(id);
  };
  return (
    <>
      <span>
        There are <span style={{ fontWeight: "600" }}>{data.length}</span> users
        in total.
      </span>
      <Table
        style={{ margin: "16px 0px" }}
        columns={columns}
        // rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      ></Table>
    </>
  );
}
