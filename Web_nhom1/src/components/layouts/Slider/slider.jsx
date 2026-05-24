import { useState, useEffect } from "react";

const SliderWithSlogans = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    "https://cdn.belovedbeyond.com/photos/view/photos/larges/647eb3505ccd53d4e208715b.cl.belove-beyond-personal-gift-platform.webp",
    "https://vcdn1-kinhdoanh.vnecdn.net/2023/10/17/image003-1697529652-3341-1697530520.png?w=460&h=0&q=100&dpr=2&fit=crop&s=0BXJZUCJqsiwm45hdhYrJA",
    "https://cdn.belovedbeyond.com/photos/view/photos/larges/648940429f2b5dd97e016e68.cl.belove-beyond-personal-gift-platform.webp",
  ];

  // Tự động chuyển slide mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full">
      {/* Dấu chấm chỉ slide lên trên */}
      <div className="flex justify-center space-x-3 mb-4">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${activeSlide === index ? "bg-gray-800" : "bg-gray-400"
              }`}
            onClick={() => setActiveSlide(index)}
            aria-current={activeSlide === index}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slider ảnh */}
      <div className="relative h-80 md:h-[600px] overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${activeSlide === index
                ? "translate-x-0"
                : activeSlide === (index - 1 + slides.length) % slides.length
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        ))}
      </div>

      {/* Nút điều khiển trước/sau */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>

      {/* Phần slogan bên dưới */}
      <div className="mt-8 flex justify-center space-x-10 text-center px-4 md:px-0">
        {/* Mục 1 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src="https://png.pngtree.com/png-vector/20220618/ourmid/pngtree-diamond-jewelry-icon-vector-design-template-png-image_5213834.png"
            alt="An Toàn"
            className="w-14 h-14 mb-3"
          />
          <p className="font-semibold text-lg">Trọng kết nối an toàn</p>
        </div>

        {/* Mục 2 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src="https://png.pngtree.com/png-vector/20210124/ourmid/pngtree-delivery-truck-silhouette-icon-design-template-vector-isolated-png-image_2801327.jpg"
            alt="Giao Hàng"
            className="w-14 h-14 mb-3"
          />
          <p className="font-semibold text-lg">
            Miễn phí phí giao hàng đơn hàng từ 300.000 VNĐ
          </p>
        </div>

        {/* Mục 3 */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src="https://bizweb.dktcdn.net/100/484/728/files/exchange-of-goods-icon-return-parcel-sign-vector-24240788-f1729c49-41a8-42e6-b643-bc88bb537415.png?v=1703305143283"
            alt="Đổi Trả"
            className="w-14 h-14 mb-3"
          />
          <p className="font-semibold text-lg">Chính sách đổi trả dễ dàng</p>
        </div>
      </div>
    </div>
  );
};

export default SliderWithSlogans;
