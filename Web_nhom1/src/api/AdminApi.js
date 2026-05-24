import axiosClient from "./AxiosClient";

// User management APIs
const getAllUsers = async () => {
  try {
    const response = await axiosClient.get(`/admin/user/findAll`);
    return response.data;
  } catch (error) {
    console.error("Get all users API call failed:", error);
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axiosClient.get(`/admin/user/findOne?_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get user API call failed:", error);
    throw error;
  }
};

// Order management APIs
const getAllOrders = async () => {
  try {
    const response = await axiosClient.get(`/admin/order/findAll`);
    return response.data;
  } catch (error) {
    console.error("Get all orders API call failed:", error);
    throw error;
  }
};

export {
  getAllUsers,
  getUser,
  getAllOrders
};
