/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewForm from "../Review/ReviewForm";
import { convertBase64toURL } from "../../utils/common";
import { createCart } from "../../api/CartApi";
import { getProductImages } from "../../api/Productsapi.jsx";
import RelatedProducts from "../layouts/Recommended/RelatedProducts";

const ProductDetailItem = ({ product }) => {
  const { user, handleGetCarts } = useContext(Context);
  const [productImages, setProductImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (product?._id) {
      getProductImages(product._id)
        .then((response) => {
          if (response?.images && response.images.length > 0) {
            setProductImages(response.images);
            setMainImage(convertBase64toURL(response.images[0].buffer, response.images[0].mimetype));
          }
        })
        .catch((error) => {
          console.error("Failed to load product images:", error);
        });
    }
  }, [product?._id]);

  const countStar = (rating) => {
    const arr = [];
    const ratingRound = Math.round(rating);
    for (let i = 0; i < ratingRound; i++) {
      arr.push(i);
    }
    return arr.map((star) => (
      <FontAwesomeIcon key={star} className="text-yellow-500" icon={faStar} />
    ));
  };

  const addProductToCart = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    try {
      const response = await createCart(user._id, product._id, 1);
      if (response) {
        handleGetCarts();
        alert("Đã thêm sản phẩm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(`Có lỗi xảy ra: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="px-4 pt-4 max-w-screen-xl mx-auto">
      <p className="capitalize text-gray-500 text-sm sm:text-base mb-6">
        <Link to="/" className="hover:underline text-pink-600">Home</Link>
        <span className="px-2">/</span>
        <Link to={`/category/${product.category || "unknown"}`} className="hover:underline text-pink-600">
          {product.category || "Danh mục"}
        </Link>
        <span className="pl-2">/</span>
        <span className="text-gray-700 font-semibold"> {product.name || "Sản phẩm"}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Hình ảnh sản phẩm */}
        <div className="w-full">
          <div className="border rounded-xl overflow-hidden shadow-sm p-2 bg-white">
            <img
              className="w-full object-contain transition-transform duration-300 hover:scale-105"
              src={mainImage || "/placeholder-image.jpg"}
              alt={product.name || "Product image"}
            />
          </div>

          {/* Danh sách hình ảnh phụ */}
          <div className="flex mt-4 gap-2 overflow-x-auto">
            {productImages.map((img, index) => {
              const imgURL = convertBase64toURL(img.buffer, img.mimetype);
              return (
                <img
                  key={index}
                  onClick={() => setMainImage(imgURL)}
                  className={`w-16 h-16 object-cover cursor-pointer border rounded-md ${imgURL === mainImage
                    ? "border-pink-500"
                    : "hover:border-gray-400"
                    }`}
                  src={imgURL}
                  alt={`thumbnail-${index}`}
                />
              );
            })}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="w-full">
          <h1 className="text-2xl font-bold text-pink-700 mb-2">
            {product.name || "Tên sản phẩm"}
          </h1>
          <p className="text-xl font-semibold text-pink-500 mb-3">
            {product.price
              ? `${product.price.toLocaleString()} VND`
              : "Giá liên hệ"}
          </p>

          {product.rating && (
            <div className="flex items-center text-yellow-500 mb-1">
              {countStar(product.rating)}
            </div>
          )}
          {product.totalReviews !== undefined && (
            <p className="text-sm text-gray-500 mb-1">
              {product.totalReviews} đánh giá
            </p>
          )}
          {product.stock !== undefined && (
            <p className="text-sm text-gray-500 mb-1">
              Kho: {product.stock}
            </p>
          )}
          {product.suitableAge && (
            <p className="text-sm text-gray-500 mb-4">
              Độ tuổi phù hợp: {product.suitableAge}+
            </p>
          )}

          <button
            onClick={addProductToCart}
            className="w-full bg-pink-600 hover:bg-white hover:text-pink-600 border border-transparent hover:border-pink-600 text-white px-4 py-2 rounded-md font-semibold transition"
          >
            THÊM VÀO GIỎ
          </button>

          <div className="mt-6">
            <h2 className="font-semibold text-base mb-1">Mô tả</h2>
            <p className="text-sm text-gray-700">
              {product.description || "Chưa có mô tả cho sản phẩm này."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ReviewForm />
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold text-center border-b-2 border-pink-500 w-fit mx-auto mb-4">
          Sản phẩm liên quan
        </h2>
        <RelatedProducts product={product || []} />
      </div>
    </div>
  );
};

export default ProductDetailItem;
