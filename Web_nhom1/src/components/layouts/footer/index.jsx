const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

                {/* Khu vực 1: Logo + bản quyền */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyMK7SdQQHNfXdfhIsDoUuXX3T3OuS1V8S9Q&s"
                        alt="Logo"
                        className="w-20 h-20 object-contain mb-2"
                    />
                    <p className="text-xs text-gray-400 mt-4">
                        © 2023 <strong>Bằng Vàng</strong>. All Rights Reserved.
                    </p>
                </div>

                {/* Khu vực 2: Danh mục */}
                <div>
                    <h3 className="text-base font-semibold mb-4">Danh mục</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Trang chủ</a></li>
                        <li><a href="#" className="hover:underline">Sản phẩm</a></li>
                        <li><a href="#" className="hover:underline">Hỗ trợ</a></li>
                        <li><a href="#" className="hover:underline">Liên hệ</a></li>
                    </ul>
                </div>

                {/* Khu vực 3: Thông tin liên hệ */}
                <div>
                    <h3 className="text-base font-semibold mb-4">Thông tin liên hệ</h3>
                    <p>Địa chỉ: 279 Nguyễn Văn Phưởng, P5, Q10, TP.HCM</p>
                    <p>Điện thoại: (+84) 949 490 869</p>
                    <p>Email: info@ekalamp.com</p>
                </div>

                {/* Khu vực 4: App + thanh toán */}
                <div>
                    <h3 className="text-base font-semibold mb-4">Tải ứng dụng</h3>
                    <div className="flex flex-col space-y-2 mb-4">
                        <a href="#">
                            <img
                                src="https://www.apple.com/v/app-store/b/images/overview/icon_appstore__ev0z770zyxoy_large_2x.png"
                                alt="App Store"
                                className="h-10 object-contain"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                className="h-10 object-contain"
                            />
                        </a>
                    </div>

                    <h3 className="text-base font-semibold mb-2">Thanh toán</h3>
                    <div className="flex space-x-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            alt="PayPal"
                            className="h-6 object-contain"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                            alt="Visa"
                            className="h-6 object-contain"
                        />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
