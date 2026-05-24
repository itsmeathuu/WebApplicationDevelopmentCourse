import { useState, useEffect } from "react";
import { getAllProductsAdmin, createProduct, updateProduct, deleteProduct, uploadProductImage } from "../../../api/ProductAdminApi";
import { getProductImages } from "../../../api/Productsapi";
import { convertBase64toURL } from "../../../utils/common";

// ProductForm component
const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    brand: product?.brand || "",
    stock: product?.stock || "",
    sold: product?.sold || 0,
    discount: product?.discount || null,
    isSale: product?.isSale || false,
    suitableAge: product?.suitableAge || "",
    tag: product?.tag || ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fixed options
  const categoryOptions = [
    "Đồ chơi vận động",
    "Đồ chơi trí tuệ",
    "Đồ chơi mô hình",
    "Đồ chơi giáo dục",
    "Đồ chơi điện tử",
    "Búp bê và phụ kiện",
    "Xe đồ chơi",
    "Đồ chơi xây dựng"
  ];

  const brandOptions = [
    "LEGO",
    "Barbie",
    "Hot Wheels",
    "Fisher-Price",
    "Playmobil",
    "United Sport",
    "Disney",
    "Marvel",
    "Pokemon",
    "Khác"
  ];

  const ageOptions = [
    "0-2 tuổi",
    "3-5 tuổi",
    "6-8 tuổi",
    "9-12 tuổi",
    "13+ tuổi",
    "Mọi lứa tuổi"
  ];

  const tagOptions = [
    "new",
    "hot",
    "sale",
    "bestseller",
    "limited"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category || !formData.brand) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Giá, Danh mục, Thương hiệu)!");
      return;
    }

    setLoading(true);
    try {
      // Submit product data
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        sold: parseInt(formData.sold) || 0,
        discount: formData.discount ? parseFloat(formData.discount) : null,
        suitableAge: parseInt(formData.suitableAge) || null
      };

      const result = await onSubmit(productData, imageFile);

      // Handle image upload result
      if (result && result.imageUploadError) {
        alert(`Sản phẩm đã được lưu nhưng có lỗi khi upload ảnh: ${result.imageUploadError}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên sản phẩm *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giảm giá (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount || ""}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categoryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thương hiệu *
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn thương hiệu</option>
                  {brandOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng tồn kho
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đã bán
                </label>
                <input
                  type="number"
                  name="sold"
                  value={formData.sold}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly={!product}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Độ tuổi phù hợp
                </label>
                <select
                  name="suitableAge"
                  value={formData.suitableAge}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn độ tuổi</option>
                  {ageOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag
                </label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn tag</option>
                  {tagOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isSale"
                checked={formData.isSale}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">
                Đang khuyến mãi
              </label>
            </div>
          </div>

          {/* Right column - Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hình ảnh sản phẩm
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview || (product?.images && product.images.length > 0) ? (
                <div className="relative">
                  <img
                    src={imagePreview || convertBase64toURL(product.images[0].buffer, product.images[0].mimetype)}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">Chọn hình ảnh</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-4 w-full"
              />
            </div>
          </div>
        </div>

        {/* Form actions */}
        <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : (product ? "Cập nhật" : "Tạo mới")}
          </button>
        </div>
      </form>
    </div>
  );
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 9;

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  const loadProducts = async (page = 1) => {
    try {
      setLoading(true);
      console.log("Loading products...");
      console.log("Current token:", localStorage.getItem("accessToken"));
      console.log("Current user:", localStorage.getItem("user_id"));

      const response = await getAllProductsAdmin(page, productsPerPage);
      console.log("Products response:", response);
      console.log("Number of products:", response.products?.length || 0);

      if (response.products && response.products.length > 0) {
        const productsWithImages = await Promise.all(
          response.products.map(async (product) => {
            try {
              const imageResponse = await getProductImages(product._id);
              return {
                ...product,
                images: imageResponse.images || []
              };
            } catch (error) {
              console.error(`Failed to load images for product ${product._id}:`, error);
              return {
                ...product,
                images: []
              };
            }
          })
        );
        console.log("Products with images:", productsWithImages.length);
        setProducts(productsWithImages);
      } else {
        console.log("No products found");
        setProducts([]);
      }

      setTotalProducts(response.totalProducts || 0);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error("Failed to load products:", error);
      console.error("Error details:", error.response?.data);
      console.error("Error status:", error.response?.status);
      alert(`Không thể tải danh sách sản phẩm: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      await deleteProduct(productId);
      alert("Xóa sản phẩm thành công!");
      loadProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Không thể xóa sản phẩm");
    }
  };

  const handleFormSubmit = async (productData, imageFile) => {
    try {
      console.log("Saving product:", productData);
      console.log("Current token:", localStorage.getItem("accessToken"));

      let result;
      if (editingProduct) {
        console.log("Updating product:", editingProduct._id);
        result = await updateProduct(editingProduct._id, productData);
        console.log("Update result:", result);

        // Upload image if provided
        if (imageFile) {
          try {
            await uploadProductImage(editingProduct._id, imageFile, 1, "");
            console.log("Image uploaded successfully");
          } catch (imageError) {
            console.error("Image upload failed:", imageError);
            return { imageUploadError: imageError.message };
          }
        }
        alert("Cập nhật sản phẩm thành công!");
      } else {
        console.log("Creating new product");
        result = await createProduct(productData);
        console.log("Create result:", result);

        // Upload image if provided and we have the created product
        if (imageFile && result.created && result.created._id) {
          try {
            await uploadProductImage(result.created._id, imageFile, 1, "");
            console.log("Image uploaded successfully");
          } catch (imageError) {
            console.error("Image upload failed:", imageError);
            return { imageUploadError: imageError.message };
          }
        }
        alert("Tạo sản phẩm thành công!");
      }
      setShowForm(false);
      setEditingProduct(null);
      loadProducts(currentPage);
      return result;
    } catch (error) {
      console.error("Failed to save product:", error);
      console.error("Error details:", error.response?.data);
      console.error("Error status:", error.response?.status);
      alert(`Không thể lưu sản phẩm: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  };

  // Get unique categories for filter
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter products based on search term and category filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" ||
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Quản lý Sản phẩm ({filteredProducts.length})
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Add button */}
            <button
              onClick={handleCreateProduct}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Đang tải...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product image */}
                <div className="h-48 bg-gray-200 relative">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={convertBase64toURL(product.images[0].buffer, product.images[0].mimetype)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Không có hình ảnh</span>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {product.price?.toLocaleString()}đ
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Kho: {product.stock || 0} | Đã bán: {product.sold || 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              {searchTerm || categoryFilter ? "Không tìm thấy sản phẩm nào phù hợp" : "Chưa có sản phẩm nào"}
            </p>
            {!searchTerm && !categoryFilter && (
              <button
                onClick={handleCreateProduct}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Thêm sản phẩm đầu tiên
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 py-6 mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        )}

        {/* Show pagination info */}
        {totalProducts > 0 && (
          <div className="text-center text-sm text-gray-600 mt-4">
            Hiển thị {((currentPage - 1) * productsPerPage) + 1} - {Math.min(currentPage * productsPerPage, totalProducts)} của {totalProducts} sản phẩm
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
