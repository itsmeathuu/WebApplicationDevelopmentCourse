import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
import { getOrderHistory } from "../../api/OrderApi";

const OrderHistory = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load order history từ API
  useEffect(() => {
    if (user) {
      loadOrderHistory();
    }
  }, [user]);

  const loadOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await getOrderHistory();
      if (response.orders) {
        // Group orders by saleDate to create order groups
        const groupedOrders = groupOrdersByDate(response.orders);
        setOrders(groupedOrders);
      }
    } catch (error) {
      console.error("Failed to load order history:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Group sold products by date to create order-like structure
  const groupOrdersByDate = (soldProducts) => {
    const grouped = {};

    soldProducts.forEach(item => {
      const dateKey = new Date(item.saleDate).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          id: `ORD_${dateKey.replace(/\s/g, '_')}`,
          orderDate: item.saleDate,
          status: "Đã giao", // Default status since we don't have order status
          items: [],
          totalAmount: 0,
          customerInfo: {
            name: user?.fullName || "Khách hàng",
            phone: user?.phone || "N/A",
            address: user?.address || "N/A"
          }
        };
      }

      grouped[dateKey].items.push({
        productName: item.product?.name || "Sản phẩm",
        quantity: item.quantity,
        price: item.price,
        image: "https://via.placeholder.com/80x80?text=Product"
      });

      grouped[dateKey].totalAmount += item.total || (item.price * item.quantity);
    });

    return Object.values(grouped).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  };



  const getStatusColor = (status) => {
    switch (status) {
      case "Đã giao":
        return "text-green-600 bg-green-100";
      case "Đang giao":
        return "text-blue-600 bg-blue-100";
      case "Đã hủy":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Vui lòng đăng nhập để xem lịch sử đơn hàng</p>
          <button
            onClick={() => navigate("/signin")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Nút về trang chủ */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ← Về trang chủ
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Lịch sử đơn hàng</h1>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Đang tải...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Bạn chưa có đơn hàng nào</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                  {/* Header đơn hàng */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Đơn hàng #{order.id}</h3>
                      <p className="text-gray-600">Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Thông tin khách hàng */}
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Thông tin giao hàng:</h4>
                    <p><strong>Tên:</strong> {order.customerInfo.name}</p>
                    <p><strong>SĐT:</strong> {order.customerInfo.phone}</p>
                    <p><strong>Địa chỉ:</strong> {order.customerInfo.address}</p>
                  </div>

                  {/* Danh sách sản phẩm */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Sản phẩm đã đặt:</h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium">{item.productName}</h5>
                            <p className="text-gray-600">Số lượng: {item.quantity}</p>
                            <p className="text-red-600 font-semibold">
                              {(item.price * item.quantity).toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tổng tiền */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Tổng tiền:</span>
                      <span className="text-xl font-bold text-red-600">
                        {order.totalAmount.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
