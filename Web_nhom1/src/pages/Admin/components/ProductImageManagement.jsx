import { useState, useEffect } from "react";
import { getAllProductsAdmin } from "../../../api/ProductAdminApi";
import { getProductImages } from "../../../api/Productsapi";
import { convertBase64toURL } from "../../../utils/common";
import ImageManager from "../../../components/Admin/ImageManager";

const ProductImageManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProductsAdmin(1, 100); // Load more products for selection

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
        setProducts(productsWithImages);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
      alert(`Không thể tải danh sách sản phẩm: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleImagesChange = (images) => {
    // Update the selected product's images
    if (selectedProduct) {
      setSelectedProduct(prev => ({
        ...prev,
        images: images
      }));

      // Update in products list
      setProducts(prev => prev.map(p =>
        p._id === selectedProduct._id
          ? { ...p, images: images }
          : p
      ));
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    searchTerm === "" ||
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Quản lý Ảnh Sản phẩm
        </h2>
      </div>

      <div className="p-6">
        {!selectedProduct ? (
          // Product selection view
          <div>
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Products grid */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 mt-4">Đang tải...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleProductSelect(product)}
                  >
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
                          <span className="text-gray-400 text-sm">Không có ảnh</span>
                        </div>
                      )}

                      {/* Image count badge */}
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {product.images?.length || 0} ảnh
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">
                          {product.price?.toLocaleString()}đ
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  {searchTerm ? "Không tìm thấy sản phẩm nào phù hợp" : "Chưa có sản phẩm nào"}
                </p>
              </div>
            )}
          </div>
        ) : (
          // Image management view
          <div>
            {/* Back button and product info */}
            <div className="mb-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Quay lại danh sách
              </button>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Giá: {selectedProduct.price?.toLocaleString()}đ</span>
                  <span>Danh mục: {selectedProduct.category}</span>
                  <span>Thương hiệu: {selectedProduct.brand}</span>
                </div>
              </div>
            </div>

            {/* Image manager */}
            <ImageManager
              productId={selectedProduct._id}
              onImagesChange={handleImagesChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageManagement;
