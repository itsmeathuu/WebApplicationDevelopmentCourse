import axiosClient from "./AxiosClient";

const createOrder = async (items) => {
  try {
    const response = await axiosClient.post(`/user/order/create`, {
      items
    });
    return response.data;
  } catch (error) {
    console.error("Create order API call failed:", error);
    throw error;
  }
};

const getOrderHistory = async () => {
  try {
    const response = await axiosClient.get(`/user/order/history?order=${encodeURIComponent(JSON.stringify({saleDate: -1}))}&page=1&limit=100`);
    return response.data;
  } catch (error) {
    console.error("Get order history API call failed:", error);
    throw error;
  }
};

export {
  createOrder,
  getOrderHistory
};
