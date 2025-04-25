import React, { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import userApi from "../../api/userApi";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getAllProfile();
        if (response.data?.status === "success") {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error(
          "❌ Error fetching user data:",
          error?.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleEditClick = (user) => {
    const defaultUser = {
      ...user,
      depositAmount: user.depositAmount ?? 0,
      status: user.status ?? "ACTIVE",
      role: "CUSTOMER",
    };
    setEditData(defaultUser);
    setOriginalData(defaultUser); // lưu bản gốc để so sánh
    setIsModalOpen(true);
  };
  const isDataChanged = (original, updated) => {
    return (
      original.firstName !== updated.firstName ||
      original.lastName !== updated.lastName ||
      original.phone !== updated.phone ||
      original.address !== updated.address ||
      original.dateOfBirth !== updated.dateOfBirth ||
      Number(original.depositAmount) !== Number(updated.depositAmount) ||
      original.status !== updated.status
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!editData || !originalData) return;

    if (!isDataChanged(originalData, editData)) {
      messageApi.info("Không có thay đổi nào để cập nhật.");
      return;
    }

    try {
      const payload = {
        firstName: editData.firstName,
        lastName: editData.lastName,
        phone: editData.phone,
        address: editData.address,
        dateOfBirth: editData.dateOfBirth,
        depositAmount: Number(editData.depositAmount) || 0,
        status: editData.status || "ACTIVE",
        role: "CUSTOMER",
      };

      await userApi.adminUpdateProfile(editData.userId, payload);
      messageApi.success("Cập nhật thành công!");
      setIsModalOpen(false);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === editData.userId
            ? { ...user, ...payload, userId: editData.userId }
            : user
        )
      );
    } catch (error) {
      console.error(
        "❌ Lỗi khi cập nhật:",
        error?.response?.data || error.message
      );
      messageApi.error("Cập nhật thất bại!");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="p-6">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">User List</h2>
      </div>

      <div className="flex space-x-4 mb-4 font-semibold text-gray-600">
        <div className="w-1/6 text-center">Name</div>
        <div className="w-1/6 text-center">Email</div>
        <div className="w-1/6 text-center">Phone</div>
        <div className="w-1/4 text-center">Address</div>
        <div className="w-1/6 text-center">Date of Birth</div>
        <div className="w-1/6 text-center">Actions</div>
      </div>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow border"
          >
            <div className="w-1/6 text-center font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </div>
            <div className="w-1/6 text-center text-sm text-gray-500">
              {user.email}
            </div>
            <div className="w-1/6 text-center text-sm text-gray-500">
              {user.phone}
            </div>
            <div className="w-1/4 text-center text-sm text-gray-500">
              {user.address}
            </div>
            <div className="w-1/6 text-center text-sm text-gray-500">
              {user.dateOfBirth}
            </div>
            <div className="w-1/6 flex items-center space-x-4 justify-center">
              <EditOutlined
                className="text-gray-600 hover:text-black text-lg cursor-pointer"
                onClick={() => handleEditClick(user)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 rounded-lg shadow">
        <div className="font-semibold text-gray-800">Total Users</div>
        <div className="font-semibold text-gray-800">
          {users.length} item(s)
        </div>
      </div>

      {/* Modal chỉnh sửa */}
      <Modal
        title="Chỉnh sửa thông tin"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsModalOpen(false)}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        {editData && (
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="Họ"
              value={editData.firstName}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Tên"
              value={editData.lastName}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={editData.email}
              className="w-full border-b border-gray-300 outline-none"
              readOnly
            />
            <input
              type="text"
              name="phone"
              placeholder="Điện thoại"
              value={editData.phone}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 outline-none"
            />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={editData.address}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 outline-none"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={editData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 outline-none"
            />
            <input
              type="number"
              name="depositAmount"
              placeholder="Số tiền nạp"
              value={editData.depositAmount}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 outline-none"
            />
            <select
              name="status"
              value={editData.status}
              onChange={handleInputChange}
              className="w-full border-b border-gray-300 outline-none"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        )}
      </Modal>
    </div>
  );
}
