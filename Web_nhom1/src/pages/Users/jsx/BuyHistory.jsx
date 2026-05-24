import { Link } from "react-router-dom";

function BuyHistory() {
  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-1/5 h-full bg-orange-200 border-r border-gray-300 pt-5">
        <ul className="list-none px-5">
          <li className="mb-2">
            <Link
              to="/"
              className="flex items-center p-2 text-gray-800 bg-blue-500 border border-gray-300 rounded-md hover:bg-blue-600 text-white"
            >
              <span className="icon mr-2">
                <img src="icon/home.svg" alt="Home Icon" className="w-5 h-5" />
              </span>
              Quay về trang chủ
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/User"
              className="flex items-center p-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300"
            >
              <span className="icon mr-2">
                <img src="icon/home.svg" alt="Home Icon" className="w-5 h-5" />
              </span>
              Trang chủ User
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/Account"
              className="flex items-center p-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300"
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
          <li className="mb-2 active">
            <Link
              to="/BuyHistory"
              className="flex items-center p-2 text-white bg-red-500 border border-gray-300 rounded-md"
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
          <li className="mb-2">
            <Link
              to="/Support"
              className="flex items-center p-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300"
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

      {/* Main Content */}
      <main className="flex-grow p-5">
        <div className="text-center p-10">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Lịch sử mua hàng</h2>
          <p className="text-gray-500">Chức năng lịch sử mua hàng đang được phát triển.</p>
          <p className="text-sm text-gray-400 mt-2">Vui lòng quay lại sau để xem lịch sử đơn hàng của bạn.</p>
        </div>
      </main>
    </div>
  );
}

export default BuyHistory;
