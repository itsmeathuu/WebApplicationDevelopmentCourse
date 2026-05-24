/* eslint-disable react/prop-types */
import { useState } from "react";
import Price from "./Price";
// import Rating from "./Rating";
import Category from "./Category";

const ProductFilters = ({
  allProducts,
  onChangeFormField,
  filterForm,
  handleFilterProducts,
}) => {
  const [toggleFilters, setToggleFilters] = useState(false);

  const toggleFiltersBtn = () => {
    setToggleFilters((prev) => !prev);
  };

  return (
    <>
      <button
        className="block border px-4 border-black font-medium py-1 mb-2 xl:hidden"
        onClick={toggleFiltersBtn}
      >
        Filters
      </button>
      <div
        className={`${
          toggleFilters ? "lg:flex lg:justify-between lg:w-full" : "hidden"
        } xl:flex`}
      >
        <div className="mt-[20px] border-b pb-[15px] w-full">
          <p className="pb-[20px] text-lg font-medium">Category</p>
          <Category
            allProducts={allProducts}
            filterForm={filterForm}
            onChangeFormField={onChangeFormField}
          />
        </div>
        <div className="w-full mt-[20px] pb-[15px]">
          <p className="pb-[20px] text-lg font-medium">Price</p>
          <Price
            filterForm={filterForm}
            onChangeFormField={onChangeFormField}
          />
        </div>
        {/* <div className="w-full mt-[20px] pb-[15px]">
          <p className="pb-[20px] text-lg font-medium">Rating</p>
          <div className="flex flex-col">
            <Rating
              filterForm={filterForm}
              onChangeFormField={onChangeFormField}
            />
          </div>
        </div> */}
      </div>
      {toggleFilters && (
        <button
          className="border px-2 uppercase rounded h-[30px] bg-black text-white hover:bg-gray-600 transition cursor-pointer"
          onClick={handleFilterProducts}
        >
          Filter
        </button>
      )}
    </>
  );
};
export default ProductFilters;
