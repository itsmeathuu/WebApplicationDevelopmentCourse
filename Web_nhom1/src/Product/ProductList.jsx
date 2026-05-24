import { useEffect, useState } from "react";
import ProductItem from "../components/layouts/productItems/ProductItem";
import { getAllProducts } from "../api/Productsapi.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 9;

  const loadProducts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getAllProducts(page, productsPerPage);
      setProducts(response.products || []);
      setTotalProducts(response.totalProducts || 0);
      setTotalPages(response.totalPages || 0);
    } catch (err) {
      setError('Lấy sản phẩm thất bại');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  if (error) return <div>{error}</div>;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Sản phẩm của tôi</h1>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      ) : (
        <>
          {/* Giữ nguyên bố cục cũ với flex wrap */}
          <div className="flex flex-wrap justify-between">
            {products.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 py-8 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg border ${
                      currentPage === page
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          )}

          {products.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Không có sản phẩm nào</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export { ProductList };
