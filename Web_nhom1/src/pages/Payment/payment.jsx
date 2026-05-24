import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../api/Productsapi";
import { Context } from "../../context/context";
import { convertBase64toURL } from "../../utils/common";
import { getProductImages } from "../../api/Productsapi";
import { createOrder } from "../../api/OrderApi";
import { getProvinces, getDistricts, getWards } from "../../api/LocationApi";

const Payment = () => {
  const { cart, user, handleGetCarts } = useContext(Context);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    orderMethod: "giao_hang_tai_nha",
    payMethod: "thanh_toan_khi_nhan_hang",
  });

  useEffect(() => {
    loadProvinces();
  }, []);

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  const loadProvinces = async () => {
    try {
      const response = await getProvinces();
      if (response.code === "success") {
        setProvinces(response.data);
      }
    } catch (error) {
      console.error("Failed to load provinces:", error);
    }
  };

  const handleProvinceChange = async (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);
    setForm(prev => ({ ...prev, province: provinceId, district: "", ward: "" }));

    if (provinceId) {
      try {
        const response = await getDistricts(provinceId);
        if (response.code === "success") {
          setDistricts(response.data);
        }
      } catch (error) {
        console.error("Failed to load districts:", error);
      }
    }
  };

  const handleDistrictChange = async (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedWard("");
    setWards([]);
    setForm(prev => ({ ...prev, district: districtId, ward: "" }));

    if (districtId) {
      try {
        const response = await getWards(districtId);
        if (response.code === "success") {
          setWards(response.data);
        }
      } catch (error) {
        console.error("Failed to load wards:", error);
      }
    }
  };

  const handleWardChange = (wardId) => {
    setSelectedWard(wardId);
    setForm(prev => ({ ...prev, ward: wardId }));
  };

  useEffect(() => {
    if (cart?.length) {
      const loadCartItems = async () => {
        const products = await getAllProducts().then(resp => resp?.products || []);

        const _cartItems = await Promise.all(
          cart.map(async (item) => {
            const product = products.find(p => p._id === item.productId);
            if (product) {
              try {
                const imageResp = await getProductImages(product._id);
                product.images = imageResp?.images || [];
              } catch (error) {
                console.error("Failed to load images for product:", product._id);
                product.images = [];
              }
            }
            return {
              ...product,
              quantity: item?.quantity || 1,
              cartId: item?._id,
            };
          })
        );
        setCartItems(_cartItems.filter(item => item._id));
      };

      loadCartItems();
    }
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !form[field]);

    if (missingFields.length > 0) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return false;
    }

    if (!selectedProvince || !selectedDistrict || !selectedWard) {
      alert("Vui lòng chọn đầy đủ tỉnh/huyện/xã!");
      return false;
    }

    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    try {
      const orderItems = cartItems.map(item => ({
        productId: item._id,
        price: item.price,
        quantity: item.quantity,
        cartId: item.cartId
      }));

      const response = await createOrder(orderItems);

      if (response.created) {
        await handleGetCarts();
        alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");
        navigate("/");
      }
    } catch (error) {
      console.error("Place order error:", error);
      alert(`Có lỗi xảy ra khi đặt hàng: ${error.response?.data?.message || error.message}`);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url("https://chus.vn/images/detailed/296/g%E1%BB%A3i_%C3%BD_qu%C3%A0_sinh_nh%E1%BA%ADt_m%C3%A0u_h%E1%BB%93ng.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-pink-900 bg-opacity-70"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-10">
        {/* Nút về trang chủ */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-2 px-5 rounded shadow transition duration-300"
          >
            ← Về trang chủ
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-white bg-opacity-90 rounded-lg shadow-lg p-6 md:p-10">
          {/* Thông tin khách hàng */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-extrabold text-pink-600 mb-6">Thông tin khách hàng</h2>

            <label htmlFor="name" className="block mb-2 font-semibold text-pink-700">
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-pink-300 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập tên của bạn"
            />

            <label htmlFor="email" className="block mb-2 font-semibold text-pink-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-pink-300 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập email của bạn"
            />

            <label htmlFor="phone" className="block mb-2 font-semibold text-pink-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-pink-300 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập số điện thoại"
            />

            <label htmlFor="province" className="block mb-2 font-semibold text-pink-700">
              Tỉnh
            </label>
            <select
              id="province"
              name="province"
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full p-3 border border-pink-300 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Chọn tỉnh</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>

            <label htmlFor="district" className="block mb-2 font-semibold text-pink-700">
              Quận/Huyện
            </label>
            <select
              id="district"
              name="district"
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              disabled={!selectedProvince}
              className={`w-full p-3 border rounded-md mb-5 focus:outline-none focus:ring-2 ${selectedProvince
                  ? "border-pink-300 focus:ring-pink-400"
                  : "border-gray-300 bg-gray-100 cursor-not-allowed"
                }`}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>

            <label htmlFor="ward" className="block mb-2 font-semibold text-pink-700">
              Phường/Xã
            </label>
            <select
              id="ward"
              name="ward"
              value={selectedWard}
              onChange={(e) => handleWardChange(e.target.value)}
              disabled={!selectedDistrict}
              className={`w-full p-3 border rounded-md mb-5 focus:outline-none focus:ring-2 ${selectedDistrict
                  ? "border-pink-300 focus:ring-pink-400"
                  : "border-gray-300 bg-gray-100 cursor-not-allowed"
                }`}
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>

            <label htmlFor="address" className="block mb-2 font-semibold text-pink-700">
              Địa chỉ cụ thể
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-pink-300 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Số nhà, tên đường, ..."
            />

            <label className="block mb-2 font-semibold text-pink-700">
              Phương thức nhận hàng
            </label>
            <select
              name="orderMethod"
              value={form.orderMethod}
              onChange={handleInputChange}
              className="w-full p-3 border border-pink-300 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="giao_hang_tai_nha">Giao hàng tại nhà</option>
              <option value="nhan_tai_cua_hang">Nhận tại cửa hàng</option>
            </select>

            <label className="block mb-2 font-semibold text-pink-700">
              Phương thức thanh toán
            </label>
            <select
              name="payMethod"
              value={form.payMethod}
              onChange={handleInputChange}
              className="w-full p-3 border border-pink-300 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="thanh_toan_khi_nhan_hang">Thanh toán khi nhận hàng</option>
              <option value="thanh_toan_online">Thanh toán Online</option>
            </select>
          </div>

          {/* Giỏ hàng */}
          <div className="lg:w-1/2 bg-pink-50 rounded-lg p-6 shadow-inner">
            <h2 className="text-2xl font-extrabold text-pink-600 mb-6">Giỏ hàng của bạn</h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-pink-500 font-semibold">Giỏ hàng trống</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-b border-pink-200 pb-4"
                  >
                    <img
                      src={item.images && item.images.length > 0 ? item.images[0] : ""}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md shadow"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-pink-700">{item.name}</h3>
                      <p className="text-pink-600 text-sm">Số lượng: {item.quantity}</p>
                      <p className="text-pink-600 text-sm">
                        Giá: {item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                      </p>
                      <p className="text-pink-700 font-bold">
                        Thành tiền: {(item.price * item.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 border-t border-pink-300 pt-4">
              <p className="text-lg font-bold text-pink-700">
                Tổng cộng: {calculateTotal().toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
              </p>
              <button
                onClick={handlePlaceOrder}
                className="mt-4 w-full bg-pink-600 hover:bg-pink-800 text-white font-bold py-3 rounded-md transition duration-300"
              >
                Đặt hàng ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
