import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, getUser } from "../../api/Auth";
import { setRestAuth } from "../../api/AxiosClient";
import { Context } from "../../context/context";

const Signin = () => {
  const navigate = useNavigate();
  const { setUser, handleGetCarts } = useContext(Context);
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInForm((prev) => ({ ...prev, [name]: value, errors: {} }));
  };

  const handleSignIn = async () => {
    const { email, password } = signInForm;
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (Object.keys(errors).length > 0) {
      setSignInForm((prev) => ({ ...prev, errors }));
      return;
    }

    try {
      const response = await signIn(email, password);
      console.log("Login response:", response);

      if (response.accessToken) {
        // Lưu tokens vào localStorage
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        // Set auth header cho axios
        setRestAuth(response.accessToken);

        // Decode token để lấy user ID (hoặc có thể backend trả về user info)
        const tokenPayload = JSON.parse(atob(response.accessToken.split('.')[1]));
        localStorage.setItem("user_id", tokenPayload._id);

        // Lấy thông tin user
        const userResponse = await getUser(tokenPayload._id);
        setUser(userResponse?.user);

        // Lấy giỏ hàng
        handleGetCarts();

        alert("Đăng nhập thành công");
        navigate("/");
      } else {
        alert("Đăng nhập thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(`Có lỗi xảy ra: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-pink-wedding-heart-shaped-balloon-flower-background-material-image_133648.jpg')",
      }}
    >
      <div className="max-w-md w-full bg-white bg-opacity-80 rounded-lg shadow-md p-6 backdrop-blur-sm z-10">
        <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">Đăng nhập</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signInForm.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {signInForm.errors.email && (
              <p className="text-red-500 text-xs italic">{signInForm.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={signInForm.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {signInForm.errors.password && (
              <p className="text-red-500 text-xs italic">{signInForm.errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSignIn}
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng nhập
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-gray-600 text-sm">
          Chưa có tài khoản?{" "}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>

      {/* Background image dưới form */}
      <img
        src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482927jLs/anh-mo-ta.png"
        alt="Background"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 opacity-40 pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />
    </div>
  );
};

export default Signin;
