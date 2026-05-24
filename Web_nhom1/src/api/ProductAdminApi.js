import axiosClient from "./AxiosClient";

// Product management APIs for admin
const getAllProductsAdmin = async (page = 1, limit = 9) => {
  try {
    const url = `/admin/product/findAll?page=${page}&limit=${limit}`;
    console.log("API Call - GET:", url);
    console.log("Authorization header:", axiosClient.defaults.headers.common["Authorization"]);

    const response = await axiosClient.get(url);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get all products API call failed:", error);
    console.error("Response data:", error.response?.data);
    console.error("Response status:", error.response?.status);
    throw error;
  }
};

const getProductAdmin = async (productId) => {
  try {
    const response = await axiosClient.get(`/admin/product/findOne?_id=${productId}`);
    return response.data;
  } catch (error) {
    console.error("Get product API call failed:", error);
    throw error;
  }
};

const createProduct = async (productData) => {
  try {
    const payload = { attributes: productData };
    console.log("API Call - POST /admin/product/create");
    console.log("Payload:", payload);
    console.log("Authorization header:", axiosClient.defaults.headers.common["Authorization"]);

    const response = await axiosClient.post(`/admin/product/create`, payload);
    console.log("Create product response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Create product API call failed:", error);
    console.error("Response data:", error.response?.data);
    console.error("Response status:", error.response?.status);
    throw error;
  }
};

const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosClient.put(`/admin/product/update`, {
      _id: productId,
      attributes: productData
    });
    return response.data;
  } catch (error) {
    console.error("Update product API call failed:", error);
    throw error;
  }
};

const deleteProduct = async (productIds) => {
  try {
    const response = await axiosClient.delete(`/admin/product/delete`, {
      data: {
        _ids: Array.isArray(productIds) ? productIds : [productIds]
      }
    });
    return response.data;
  } catch (error) {
    console.error("Delete product API call failed:", error);
    throw error;
  }
};

// Product image management APIs
const uploadProductImage = async (productId, imageFile, order = 1, altText = "") => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('productId', productId);
    formData.append('order', order);
    formData.append('altText', altText);

    const response = await axiosClient.post(`/admin/product/image/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload product image API call failed:", error);
    throw error;
  }
};

const updateProductImage = async (imageId, imageFile, altText) => {
  try {
    const formData = new FormData();
    formData.append('_id', imageId);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (altText !== undefined) {
      formData.append('altText', altText);
    }

    const response = await axiosClient.put(`/admin/product/image/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update product image API call failed:", error);
    throw error;
  }
};

const deleteProductImage = async (imageIds) => {
  try {
    const response = await axiosClient.delete(`/admin/product/image/delete`, {
      data: {
        _ids: Array.isArray(imageIds) ? imageIds : [imageIds]
      }
    });
    return response.data;
  } catch (error) {
    console.error("Delete product image API call failed:", error);
    throw error;
  }
};

export {
  getAllProductsAdmin,
  getProductAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  updateProductImage,
  deleteProductImage
};
