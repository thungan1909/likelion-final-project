import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, Table, message } from "antd";
import { useEffect, useState } from "react";
import UserApi from "../../../api/userApi";
import "./customTable.css";
import { useNavigate } from "react-router-dom";
import AuthenApi from "../../../api/authenApi";

export default function CustomTable() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
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
  const logoutFun = async () => {
    try {
      const response = await AuthenApi.logout(userId);
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      navigate(`/login`, { replace: true });
    } catch (error) {
      console.log("error");
    }
  };
  const deleteMySelf = async (id) => {
    try {
      const response = await UserApi.deleteUserById(id);
      messageApi
        .open({
          type: "success",
          content: `Delete successfully`,
          duration: 1.5,
        })
        .then(() => logoutFun());
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `${error.data}. Please try again`,
        duration: 3,
      });
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await UserApi.deleteUserById(id);
      getAllUsers();
      messageApi.open({
        type: "success",
        content: `Delete user successfully`,
        duration: 1.5,
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `${error.data}. Please try again`,
        duration: 3,
      });
    }
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
  const handleConfirmDelete = (id) => {
    if (id === userId) {
      deleteMySelf(id);
    } else {
      deleteUser(id);
    }
  };
  return (
    <>
      {contextHolder}
      <span>
        There are <span style={{ fontWeight: "600" }}>{data.length}</span> users
        in total.
      </span>
      <Table
        style={{ margin: "16px 0px" }}
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      ></Table>
    </>
  );
}
