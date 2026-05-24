import  { useState } from 'react';
const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    // Hàm xử lý khi thay đổi giá trị input
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };  
    return (
        <div className="absolute right-0 top-full w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Tìm kiếm sản phẩm"
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 border-gray-400"
            />
        </div>
    );
};

export default SearchComponent;
