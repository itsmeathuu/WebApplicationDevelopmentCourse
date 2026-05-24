import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../context/context";

function Account() {
  // Trạng thái để theo dõi sidebar có đang mở trên mobile không
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(Context);

  // Hàm để toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100">
      {/* Nút mở menu cho mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 bg-orange-200 text-gray-800 font-bold"
      >
        ☰ Menu
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/5 h-screen bg-orange-200 border-r border-gray-300 pt-5 fixed md:static z-10`}
      >
        <ul className="list-none px-5">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-800 bg-blue-500 border border-gray-300 rounded-md mb-2 hover:bg-blue-600 text-white"
            >
              <span className="icon">
                <img
                  src="icon/home.svg"
                  alt="Home Icon"
                  className="w-5 h-5 mr-2"
                />
              </span>
              Quay về trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/User"
              className="flex items-center p-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md mb-2 hover:bg-gray-300"
            >
              <span className="icon">
                <img
                  src="icon/home.svg"
                  alt="Home Icon"
                  className="w-5 h-5 mr-2"
                />
              </span>
              Trang chủ User
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/Account"
              className="flex items-center p-2 text-white bg-red-500 rounded-md"
            >
              <span className="icon">
                <img
                  src="icon/account.svg"
                  alt="Account Icon"
                  className="w-5 h-5 mr-2"
                />
              </span>
              Tài khoản
            </Link>
          </li>
          <li>
            <Link
              to="/BuyHistory"
              className="flex items-center p-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md mb-2 hover:bg-gray-300"
            >
              <span className="icon">
                <img
                  src="icon/buyhistory.svg"
                  alt="BuyHistory Icon"
                  className="w-5 h-5 mr-2"
                />
              </span>
              Lịch sử mua
            </Link>
          </li>
          <li>
            <Link
              to="/Support"
              className="flex items-center p-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md mb-2 hover:bg-gray-300"
            >
              <span className="icon">
                <img
                  src="icon/support.svg"
                  alt="Support Icon"
                  className="w-5 h-5 mr-2"
                />
              </span>
              Hỗ trợ
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex flex-col w-full p-5 bg-gray-50 md:w-4/5">
        <div className="flex flex-col items-center mb-5">
          <img
            src="image/Avatar.jpg"
            alt="Avatar"
            className="w-24 h-24 rounded-full border"
          />
          <h2 className="text-2xl mt-2">Mai Xuân Nhân</h2>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-lg mx-auto">
          <label htmlFor="name" className="font-bold">
            Họ và tên:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={user?.fullName || ""}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user?.email || ""}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <label htmlFor="phone" className="font-bold">
            Số điện thoại:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            defaultValue={user?.phone || ""}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <label htmlFor="address" className="font-bold">
            Địa chỉ:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            defaultValue={user?.address || ""}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <button className="w-full md:w-1/2 mx-auto p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Cập nhật thông tin
          </button>
        </div>
      </main>
    </div>
  );
}

export default Account;
