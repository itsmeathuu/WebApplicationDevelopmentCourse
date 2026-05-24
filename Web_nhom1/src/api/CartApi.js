import axiosClient from "./AxiosClient";

const createCart= async (userId, productId, quantity) => {
    try {
      const response = await axiosClient.post(`/user/cart/create`, {
        productId, quantity
      });
      return response.data;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };


const updateCart= async (cartId, quantity) => {
  try {
    const response = await axiosClient.put(`/user/cart/update`, {
      _id: cartId, quantity
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

const getCarts = async ( ) => {
  try {
    const response = await axiosClient.get(`/user/cart/find?order=${encodeURIComponent(JSON.stringify({createdAt: 1}))}&page=1&limit=10000`);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};


const deleteCart= async (_ids) => {
  try {
    console.log(_ids)
    const response = await axiosClient.delete(`/user/cart/delete`, {
      data: { _ids }
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

  export {
    createCart,
    updateCart,
    deleteCart,
    getCarts
  }