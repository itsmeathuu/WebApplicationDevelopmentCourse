import { useEffect, useState } from "react";
import Footer from "../../components/layouts/footer";
import Header from "../../components/layouts/header";
import { useParams } from "react-router-dom";
import CategoryPage from "../../components/Categoryy/CategoryPage";
import { getAllProducts } from "../../api/Productsapi.jsx";

const CategoryOverview = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const { id } = useParams(); // ID category từ URL

  useEffect(() => {
    // Gọi API để lấy tất cả sản phẩm và lọc theo category
    getAllProducts()
      .then((response) => {
        if (Array.isArray(response?.products)) {
          setAllProducts(response?.products);
          const filteredProducts = response.products.filter(
            (product) => product?.category?.toLowerCase() === id.toLowerCase()
          );
          setProducts(filteredProducts);
        } else {
          setProducts([]); // Nếu không có sản phẩm, đặt products thành mảng rỗng
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm:", error);
        setProducts([]); // Đảm bảo products luôn là mảng ngay cả khi có lỗi
      });
  }, [id]);

  return (
    <div>
      <Header />
      {products.length === 0 ? (
        <p>Không có sản phẩm trong danh mục này.</p>
      ) : (
        <CategoryPage allProducts={allProducts} products={products} />
      )}
      <Footer />
    </div>
  );
};

export default CategoryOverview;
