

const GiftCollection = () => {
    return (
        <section className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
            {/* Tiêu đề chính */}
            <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center">
                Bộ sưu tập quà tặng
            </h2>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Ảnh sản phẩm */}
                <div className="flex-shrink-0 w-full md:w-1/2">
                    <img
                        src="https://cdn.belovedbeyond.com/photos/view/photos/larges/VSenda.D630677/65c218384659f1c9fa0f0b74.D630677.belove-beyond-personal-gift-platform.webp"
                        alt="CUNG BẮC TÌNH YÊU"
                        className="w-full rounded-lg shadow-lg object-cover"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex-1 flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                        CUNG BẮC TÌNH YÊU
                    </h3>

                    {/* Thông tin khuyến mãi */}
                    <div className="flex items-center gap-4">
                        <span className="bg-pink-500 text-white font-semibold px-3 py-1 rounded-full text-sm shadow-md">
                            Voucher 20k
                        </span>
                        <span className="text-gray-600 text-sm italic">
                            Bảo hành 1 năm và các phụ kiện đi kèm
                        </span>
                    </div>

                    {/* Kích thước sản phẩm */}
                    <p className="text-gray-700 text-base">
                        <span className="font-semibold">Kích thước:</span> Ngang 28cm, Cao 25cm
                    </p>

                    {/* Nút Xem bộ sưu tập */}
                    <button
                        className="mt-6 w-max bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-300 shadow-md"
                        onClick={() => alert("Xem thêm bộ sưu tập")}
                    >
                        Xem bộ sưu tập
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GiftCollection;
