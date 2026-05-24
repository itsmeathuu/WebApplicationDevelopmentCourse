import axiosClient from "./AxiosClient";

const updateUser = async (userData) => {
  try {
    const response = await axiosClient.put(`/registered/profile/update`, {
      attributes: userData
    });
    return response.data;
  } catch (error) {
    console.error("Update user API call failed:", error);
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axiosClient.get(`/registered/profile?_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get user API call failed:", error);
    throw error;
  }
};

export {
  updateUser,
  getUser
};
