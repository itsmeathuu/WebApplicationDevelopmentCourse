/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const Price = ({ filterForm, onChangeFormField }) => {
  return (
    <form>
      <input
        type="number"
        className="border w-[100px] outline-0 text-center rounded h-[30px]"
        placeholder="Min Price"
        value={filterForm.minPrice}
        onChange={(e) => onChangeFormField(e.target.value, "minPrice")} // Cập nhật giá trị min
        required
      />
      <FontAwesomeIcon icon={faMinus} className="mx-2" />
      <input
        type="number"
        className="border w-[100px] outline-0 text-center rounded h-[30px]"
        placeholder="Max Price"
        value={filterForm.maxPrice}
        onChange={(e) => onChangeFormField(e.target.value, "maxPrice")} // Cập nhật giá trị min
        required
      />
      
    </form>
  );
};
export default Price;
