import { useEffect, useState } from "react";
import ProductDetailItem from "../../components/Products-detailItems/ProductDetailItems";
import Header from "../../components/layouts/header";
import Footer from "../../components/layouts/footer";
import { getProduct } from "../../api/Productsapi";
import { useParams } from "react-router-dom";

const ProductOverview = () => {
  const [product, setProduct] = useState(null); // Trạng thái để lưu sản phẩm
  const [error, setError] = useState(null); // Trạng thái để lưu lỗi
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const param = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching product with ID:", param.id);

        const response = await getProduct(param.id);
        console.log("Product response:", response);

        if (response && response.product) {
          setProduct(response.product);
        } else if (response && !response.product) {
          setError("Sản phẩm không tồn tại hoặc đã bị xóa");
        } else {
          setError("Không tìm thấy sản phẩm");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(`Lỗi khi tải sản phẩm: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (param.id) {
      fetchProduct();
    }
  }, [param.id]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Đang tải sản phẩm...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 text-lg">Lỗi: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Thử lại
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-600">Không tìm thấy sản phẩm</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <ProductDetailItem product={product} />
      <Footer />
    </div>
  );
};

export default ProductOverview;
