import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/context";
import UserManagement from "./components/UserManagement";
import OrderManagement from "./components/OrderManagement";
import ProductManagement from "./components/ProductManagement";
import ProductImageManagement from "./components/ProductImageManagement";

const AdminPage = () => {
  const { user } = useContext(Context);
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("ADMIN PAGE DEBUG");
    console.log("Current user:", user);
    console.log("User role:", user?.role);
    console.log("User ID from localStorage:", localStorage.getItem("user_id"));
    console.log("Access Token from localStorage:", localStorage.getItem("accessToken"));
  }, [user]);

  // Kiểm tra quyền admin
  useEffect(() => {
    if (user && user.role !== "admin" && user.role !== "owner") {
      alert("Bạn không có quyền truy cập trang này!");
      window.location.href = "/";
    }
  }, [user]);

  if (!user || (user.role !== "admin" && user.role !== "owner")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Đang kiểm tra quyền truy cập...
          </h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 to-blue-800">
          <img
            src="/logo.png"
            alt="Toy Kingdom"
            className="h-8 w-auto"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <h1 className="text-white text-xl font-bold ml-2" style={{display: 'none'}}>
            Toy Kingdom
          </h1>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-blue-100 text-blue-700 border-r-4 border-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Quản lý Người dùng
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === "orders"
                  ? "bg-blue-100 text-blue-700 border-r-4 border-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Quản lý Đơn hàng
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === "products"
                  ? "bg-blue-100 text-blue-700 border-r-4 border-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Quản lý Sản phẩm
            </button>

            <button
              onClick={() => setActiveTab("product-images")}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === "product-images"
                  ? "bg-blue-100 text-blue-700 border-r-4 border-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Quản lý Ảnh sản phẩm
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="px-4">
              <a
                href="/"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Về trang chủ
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-700 lg:hidden"
              >
                ☰
              </button>
              <h1 className="ml-4 text-2xl font-semibold text-gray-800">
                {activeTab === "users" && "Quản lý Người dùng"}
                {activeTab === "orders" && "Quản lý Đơn hàng"}
                {activeTab === "products" && "Quản lý Sản phẩm"}
                {activeTab === "product-images" && "Quản lý Ảnh sản phẩm"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Chào mừng, {user?.fullName || user?.email}
              </span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {(user?.fullName || user?.email || "A").charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === "users" && <UserManagement />}
            {activeTab === "orders" && <OrderManagement />}
            {activeTab === "products" && <ProductManagement />}
            {activeTab === "product-images" && <ProductImageManagement />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
