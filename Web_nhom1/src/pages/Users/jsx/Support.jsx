import { Link } from "react-router-dom";

function Support() {
  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/5 h-full bg-[#ffddae] border-r border-gray-300 pt-5">
        <ul className="list-none px-5">
          <li className="mb-2">
            <Link
              to="/"
              className="flex items-center w-full p-2 text-gray-800 bg-blue-500 border border-gray-300 rounded hover:bg-blue-600 text-white"
            >
              <span className="icon mr-2">
                <img src="icon/home.svg" alt="Home Icon" className="w-5 h-5" />
              </span>
              Quay về trang chủ
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/user"
              className="flex items-center w-full p-2 text-gray-800 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300"
            >
              <span className="icon mr-2">
                <img src="icon/home.svg" alt="Home Icon" className="w-5 h-5" />
              </span>
              Trang chủ User
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/account"
              className="flex items-center w-full p-2 text-gray-800 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300"
            >
              <span className="icon mr-2">
                <img
                  src="icon/account.svg"
                  alt="Account Icon"
                  className="w-5 h-5"
                />
              </span>
              Tài khoản
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/buyhistory"
              className="flex items-center w-full p-2 text-gray-800 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300"
            >
              <span className="icon mr-2">
                <img
                  src="icon/buyhistory.svg"
                  alt="BuyHistory Icon"
                  className="w-5 h-5"
                />
              </span>
              Lịch sử mua
            </Link>
          </li>
          <li className="mb-2 active">
            <Link
              to="/support"
              className="flex items-center w-full p-2 text-white bg-red-500 border border-gray-300 rounded"
            >
              <span className="icon mr-2">
                <img
                  src="icon/support.svg"
                  alt="Support Icon"
                  className="w-5 h-5"
                />
              </span>
              Hỗ trợ
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
        {/* Thông tin liên hệ */}
        <div className="flex items-center border rounded-lg border-gray-300 p-3">
          <aside className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">TEL</span>
          </aside>
          <main className="ml-3">
            <h2 className="text-lg md:text-xl mb-1">Hotline hỗ trợ</h2>
            <p className="text-base md:text-lg text-gray-600">1900-xxxx</p>
          </main>
        </div>

        <div className="flex items-center border rounded-lg border-gray-300 p-3">
          <aside className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-green-600">@</span>
          </aside>
          <main className="ml-3">
            <h2 className="text-lg md:text-xl mb-1">Email hỗ trợ</h2>
            <p className="text-base md:text-lg text-gray-600">support@toykingdom.com</p>
          </main>
        </div>

        <div className="flex items-center border rounded-lg border-gray-300 p-3">
          <aside className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border rounded-full overflow-hidden bg-yellow-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-yellow-600">LOC</span>
          </aside>
          <main className="ml-3">
            <h2 className="text-lg md:text-xl mb-1">Địa chỉ cửa hàng</h2>
            <p className="text-base md:text-lg text-gray-600">123 Đường ABC, Quận XYZ</p>
          </main>
        </div>

        <div className="flex items-center border rounded-lg border-gray-300 p-3">
          <aside className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-600">TIME</span>
          </aside>
          <main className="ml-3">
            <h2 className="text-lg md:text-xl mb-1">Giờ làm việc</h2>
            <p className="text-base md:text-lg text-gray-600">8:00 - 22:00 hàng ngày</p>
          </main>
        </div>
      </main>
    </div>
  );
}

export default Support;
