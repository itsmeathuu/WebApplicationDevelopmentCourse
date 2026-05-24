/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductImages } from "../../../api/Productsapi.jsx";
import { convertBase64toURL } from "../../../utils/common";

const ProductItem = ({ product }) => {
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    if (product?._id) {
      getProductImages(product._id)
        .then((response) => {
          if (response?.images && response.images.length > 0) {
            setProductImage(response.images[0]);
          }
        })
        .catch((error) => {
          console.error("Failed to load product image:", error);
        });
    }
  }, [product?._id]);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
      <Link
        to={`/products/${product?._id}`}
        className="h-[400px] shadow-md border border-gray-200 relative rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col justify-between"
      >
        <img
          className="w-[200px] h-auto m-auto mt-[50px] object-contain"
          src={productImage ? convertBase64toURL(productImage.buffer, productImage.mimetype) : "/placeholder-image.jpg"}
          alt={product?.name}
        />
        <div className="text-center font-medium mt-4  hover:text-lg transition-all duration-300">
          {product?.name}
        </div>
        <div className="flex justify-center gap-3 items-center pb-4">
          <span className="text-xl font-semibold hover:text-lg ">
            {product?.price?.toLocaleString()} VND
          </span>
        </div>
      </Link>
    </div>
  );
};
export default ProductItem;
