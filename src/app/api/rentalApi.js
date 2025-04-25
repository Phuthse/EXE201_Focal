import axiosClient from "./axiosClient";

const rentalApi = {
  //USER
  createRental: (data) => axiosClient.post("/rental", data),
  cancelRental: (id) => axiosClient.put(`/rental/${id}/cancel`),
  myRental: (id) => axiosClient.get(`/rental/my-rentals`),
  //ADMIN
  approveRental: (id, status) =>
  axiosClient.put(`/admin/rentals/${id}/approve`, { status }),
  getAllRental: () => axiosClient.get("/rental"),
};

export default rentalApi;
