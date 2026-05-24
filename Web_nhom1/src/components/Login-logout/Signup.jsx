import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/Auth";

const Signup = () => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    district: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value, errors: {} }));
  };

  const validateForm = () => {
    const errors = {};
    if (!signUpForm.fullName) errors.fullName = "Full Name is required";
    if (!signUpForm.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!signUpForm.address) errors.address = "Address is required";
    if (!signUpForm.email) errors.email = "Email is required";
    if (!signUpForm.password) errors.password = "Password is required";
    if (signUpForm.password !== signUpForm.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSignUp = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setSignUpForm((prev) => ({ ...prev, errors }));
      return;
    }

    const { fullName, phoneNumber, address, city, district, email, password } = signUpForm;

    try {
      const response = await signUp(email, fullName, password, phoneNumber);
      if (response.created) {
        alert("Bạn đã đăng ký thành công");
        navigate("/signin");
      } else {
        alert("Đăng ký thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(`Có lỗi xảy ra: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div
      className="font-[sans-serif] md:h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209990375268969_frame-218.png')",
      }}
    >
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6 backdrop-blur-sm bg-opacity-80">
        <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">Đăng ký</h2>
        <form>
          {/* Họ và tên */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={signUpForm.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {signUpForm.errors.fullName && (
              <p className="text-red-500 text-xs italic">{signUpForm.errors.fullName}</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={signUpForm.phoneNumber}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {signUpForm.errors.phoneNumber && (
              <p className="text-red-500 text-xs italic">{signUpForm.errors.phoneNumber}</p>
            )}
          </div>

          {/* Địa chỉ chi tiết */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Địa chỉ chi tiết
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={signUpForm.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {signUpForm.errors.address && (
              <p className="text-red-500 text-xs italic">{signUpForm.errors.address}</p>
            )}
          </div>

          {/* Tỉnh/Thành phố */}
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
              Tỉnh/Thành phố
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={signUpForm.city}
              onChange={handleChange}
              placeholder="Nhập tỉnh/thành phố"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Quận/Huyện */}
          <div className="mb-4">
            <label htmlFor="district" className="block text-gray-700 text-sm font-bold mb-2">
              Quận/Huyện
            </label>
            <input
              type="text"
              id="district"
              name="district"
              value={signUpForm.district}
              onChange={handleChange}
              placeholder="Nhập quận/huyện"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signUpForm.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {signUpForm.errors.email && (
              <p className="text-red-500 text-xs italic">{signUpForm.errors.email}</p>
            )}
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={signUpForm.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {signUpForm.errors.password && (
              <p className="text-red-500 text-xs italic">{signUpForm.errors.password}</p>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={signUpForm.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {signUpForm.errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">{signUpForm.errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSignUp}
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng ký
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-gray-600 text-sm">
          Đã có tài khoản?{" "}
          <Link to="/signin" className="text-pink-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
