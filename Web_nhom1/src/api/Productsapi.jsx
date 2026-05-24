import { axiosPublic } from "./AxiosClient";
const getAllProducts = async (page = 1, limit = 9) => {
  const response = await axiosPublic.get(`/product/findAll?page=${page}&limit=${limit}`);
  return response.data;
};
const getProduct = async (id) => {
  try {
    console.log("Product ID:", id); // Kiểm tra giá trị id
    const response = await axiosPublic.get(`/product/findOne`, {
      params: { _id: id },
    });
    console.log("API Response:", response.data); // Log response để debug
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};
const getAllCategories = async () => {
  // Backend không có endpoint categories riêng, lấy categories từ products
  const response = await axiosPublic.get("/product/findAll");
  const products = response.data.products || [];
  // Lấy danh sách categories unique từ products
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  return { categories: categories.map(cat => ({ name: cat, _id: cat })) };
};
const getProductByCategory = async (categoryName) => {
  // Tìm products theo category name
  const filter = JSON.stringify({ category: categoryName });
  const response = await axiosPublic.get(`/product/findAll?filter=${encodeURIComponent(filter)}`);
  return response.data;
};

const getProductImages = async (productId) => {
  try {
    const response = await axiosPublic.get(`/product/image/find?productId=${productId}`);
    return response.data;
  } catch (error) {
    console.error("Get product images failed:", error);
    throw error;
  }
};

export { getAllProducts, getProduct, getAllCategories, getProductByCategory, getProductImages };
