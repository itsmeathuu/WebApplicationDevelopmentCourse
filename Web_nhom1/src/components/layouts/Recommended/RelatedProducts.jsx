/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../api/Productsapi.jsx";
import ProductItem from "../productItems/ProductItem";

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, ] = useState(null);
  console.log(product);
  // Lấy các sản phẩm liên quan từ API
  // useEffect(() => {
  //
  // }, [product]);

  useEffect(() => {
    if (product) {
      getAllProducts().then((resp) => {
        if (Array.isArray(resp?.products)) {
          // Lọc các sản phẩm có cùng category và loại trừ sản phẩm chính
          const filteredProducts = resp.products.filter(
            (item) =>
              item.category === product.category && item._id !== product._id
          );
          console.log(filteredProducts);
          setRelatedProducts(filteredProducts);
        }
      });
    }
  }, [product]);

  // useEffect sẽ chạy lại khi product thay đổi
  console.log(relatedProducts);
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-center">Sản phẩm liên quan</h3>
      <div className="flex flex-wrap justify-center mt-4">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <ProductItem key={relatedProduct._id} product={relatedProduct} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            Không có sản phẩm liên quan
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
