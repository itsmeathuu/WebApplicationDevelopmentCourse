import axiosClient from "./AxiosClient";

const signUp = async (email, fullName, password, phone = null) => {
  try {
    const response = await axiosClient.post(`/signup`, {
      email,
      fullName,
      password,
      ...(phone && { phone })
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    const response = await axiosClient.post(`/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const response = await axiosClient.get(`/registered/profile?_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};


export { signUp, signIn,getUser };
