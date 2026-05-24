import { useNavigate } from "react-router-dom";

const NewsletterBanner = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/signup");
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="md:w-1/2 flex items-center mb-6 md:mb-0 text-gray-800 font-semibold text-lg">
          Đăng ký bản tin của Beloved&Beyond để cập nhật thông tin mới nhất về chương trình giảm giá và sản phẩm mới nhất!
        </div>
        <div className="md:w-1/2 flex justify-end">
          <button
            onClick={handleRegister}
            className="bg-black text-white text-xl px-10 py-4 rounded-lg font-bold hover:bg-gray-900 transition"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
