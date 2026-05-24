const CustomerReview = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">Khách Hàng Đánh Giá</h2>

      <div className="flex flex-col items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXSjkWNYkyTK94NswJwN5f4kUJ7eQMn2GJ7w&s"
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mb-4 shadow"
        />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Nguyễn Văn A</h3>
        <p className="italic text-lg text-gray-600 px-6">
          “Sản phẩm tuyệt vời! Giao hàng nhanh và đóng gói rất cẩn thận. Mình sẽ quay lại mua tiếp!”
        </p>
      </div>
    </div>
  );
};

export default CustomerReview;
