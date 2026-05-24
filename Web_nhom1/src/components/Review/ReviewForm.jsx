import { useState } from "react";

const ReviewForm = () => {
  const [rating, setRating] = useState(2);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const alertReview = () => {
    alert("Cảm ơn bạn , đánh giá đã được gửi !!!");
    setIsFormVisible(false);
  };
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Toggle Button */}
      <button
        onClick={toggleFormVisibility}
        className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        {isFormVisible ? "Đóng đánh giá" : "Viết đánh giá"}
      </button>

      {/* Review Form */}
      {isFormVisible && (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">Viết đánh giá mới</h2>

          {/* Name Input */}
          <div className="space-y-1">
            <label htmlFor="name" className="block font-medium">
              Tên
            </label>
            <input
              type="text"
              id="name"
              placeholder="Tên của bạn (>3 ký tự và <20 ký tự)"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="john.smith@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Rating Input */}
          <div className="space-y-1">
            <label className="block font-medium">Đánh giá</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-sm ml-2">{rating === 1 ? "poor" : ""}</span>
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-1">
            <label htmlFor="title" className="block font-medium">
              Tiêu đề
            </label>
            <input
              type="text"
              id="title"
              placeholder="Hãy cho một tiêu đề (>3 ký tự và <50 ký tự)"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Content Input */}
          <div className="space-y-1">
            <label htmlFor="content" className="block font-medium">
              Nội dung
            </label>
            <textarea
              id="content"
              placeholder="Viết nội dung đánh giá ở đây (>3 ký tự và <1000 ký tự)"
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={alertReview}
          >
            Gửi đánh giá
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
