import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { getAllProducts } from "../../api/Productsapi";
import { convertBase64toURL } from "../../utils/common";

export function Search() {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchField, setSearchField] = useState(false);

  const debounced = useDebounce(search);

  useEffect(() => {
    if (debounced.length >= 2) {
      getAllProducts()
        .then((response) => {
          console.log(debounced);
          console.log(response);
          const filtered = response?.products.filter(
            (product) =>
              product.name &&
              product.name?.toLowerCase().includes(debounced?.toLowerCase())
          );
          console.log(filtered);
          setFilteredProducts(filtered);
          setDropdown(filtered.length > 0); // Chỉ hiển thị dropdown khi có sản phẩm tìm thấy
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setDropdown(false); // Ẩn dropdown nếu không có gì để tìm
    }
  }, [debounced]);

  const clickHandler = () => {
    setDropdown(false);
    setSearchField(false); // Đóng form tìm kiếm
  };

  const toggleForm = () => setSearchField(false); // Đóng form tìm kiếm

  const submitSearchForm = (event) => {
    event.preventDefault();
    if (search !== "") {
      setSearchField(false);
    }
    setDropdown(false);
  };

  if (error) return <div>{error}</div>;

  return (
    <>
      {searchField && (
        <div
          className="absolute right-0 top-full w-48 bg-white rounded-md shadow-lg py-2"
          onClick={toggleForm}
        />
      )}

      <form
        className={`${
          searchField
            ? "absolute top-full mt-1 right-0 w-[250px] bg-white z-20 rounded shadow-md flex items-center justify-between transition-all duration-300"
            : ""
        }`}
        onSubmit={submitSearchForm}
      >
        <input
          type="text"
          placeholder="Search"
          className="px-1 text-lg text-black outline-0 h-[35px] w-1/2 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="bg-slate-400 h-[35px] px-3 md:px-2 rounded-r hover:bg-gray-700 transition cursor-pointer"
          type="submit"
          value="Find"
        />

        {dropdown && (
          <div className="absolute left-0 top-[36px] right-0 search-box z-40">
            <div className=" flex flex-col bg-white p-2 border  border-black rounded max-h-[400px] overflow-y-auto ">
              {filteredProducts.map((product, index) => (
                <Link
                  to={`/products/${product._id}`}
                  onClick={() => clickHandler()}
                  className="text-black flex items-center max-h-[80px] mb-4 border-b pb-2 last:border-0 last:mb-0 hover:opacity-50 transition"
                  key={index}
                >
                  <img
                    className="w-[50px] mr-4 max-h-[75px]"
                    src={convertBase64toURL(product?.images?.[0]?.buffer)}
                    alt={product.name}
                  />
                  <div>
                    <p className="text-sm line-clamp-2">{product.name}</p>
                    <p className="text-md font-medium">$ {product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </form>
    </>
  );
}
