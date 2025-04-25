import axiosClient from "./axiosClient";

const userApi = {
  getProfile: () => axiosClient.get("/user/profile"),
  getAllProfile: () => axiosClient.get("/admin/users"),
  updateProfile: (data) => axiosClient.put("/user/profile", data),
  adminUpdateProfile: (userId, data) => axiosClient.put(`/admin/users/${userId}`, data),
};

export default userApi;
