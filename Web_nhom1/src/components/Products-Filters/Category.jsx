/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Category = ({ allProducts, filterForm, onChangeFormField }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    if (allProducts && Array.isArray(allProducts)) {
      let arr = [];
      allProducts.forEach((product) => {
        if (!arr.includes(product?.category)) arr.push(product.category);
      });
      setCategoryOptions(arr);
    }
  }, [allProducts]);

  return (
    <>
      {categoryOptions.map((option, index) => (
        <div key={index} className="py-1 flex">
          <input
            className="outline-0 cursor-pointer w-[15px]"
            type="checkbox"
            id={index}
            checked={filterForm.type === option}
            onChange={() => onChangeFormField(option, "type")}
          />
          <label htmlFor={index} className="pl-1 cursor-pointer">
            {option}
          </label>
        </div>
      ))}
    </>
  );
};
export default Category;
