/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ProductFilters from "../Products-Filters/ProductsFilters";
import { convertBase64toURL } from "../../utils/common";
import { useParams } from "react-router-dom";

const CategoryPage = ({ allProducts, products }) => {
  // Khởi tạo filteredProducts với tất cả sản phẩm của danh mục
  const { id } = useParams(); // ID category từ URL
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [filterForm, setFilterForm] = useState({
    type: id,
    minPrice: 0,
    maxPrice: 0,
    rating: "",
  });

  // Cập nhật filteredProducts khi danh sách sản phẩm của category thay đổi
  useEffect(() => {
    setFilteredProducts(products || []);
  }, [products]);

  const onChangeFormField = (value, field) => {
    setFilterForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilterProducts = () => {
    const filterProducts = allProducts.filter((product) => {
      return (
        (product.category === filterForm.type ||
          product.category?.includes(filterForm.type)) &&
        ((product.price >= Number(filterForm.minPrice) &&
          product.price <= Number(filterForm.maxPrice)) ||
          product.price > 0)
      );
    });
    setFilteredProducts(filterProducts);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Danh mục: {id}</h1>

      {/* Bộ lọc sản phẩm */}
      <ProductFilters
        allProducts={allProducts}
        filterForm={filterForm}
        onChangeFormField={onChangeFormField}
        handleFilterProducts={handleFilterProducts}
      />
      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts?.map((product) => (
            <div key={product._id} className="border p-4">
              <img
                className="w-full lg:w-45/8 object-cotain"
                src={convertBase64toURL(product?.images[0]?.buffer)}
                alt={product.name || "Product image"}
              />
              <h2 className="font-semibold">{product.name}</h2>
              <p>Price:{product.price.toLocaleString()} VND</p>
              <p>Rating: {product.rating} </p>
              <p>Category: {product.category}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">Không có sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
