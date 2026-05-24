import ButtonNav from "./component/button-nav";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../../search/search";
import { Context } from "../../../context/context";
import Cart from "../Cart-Tab/Cart";

const Header = () => {
  // Lấy dữ liệu user, cart từ Context
  const { user, cart, setCart } = useContext(Context);
  const navigate = useNavigate();

  const wrapperRef = useRef(null);
  const searchRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowCart, setIsShowCart] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleShowCart = () => {
    setIsShowCart((prevBtnCart) => !prevBtnCart);
  };

  const onHiddenCart = () => setIsShowCart(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleHamburgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOnClickOutside = (e) => {
      const { target } = e;
      if (!wrapperRef.current.contains(target)) {
        setIsOpen(false);
      } else if (!searchRef.current.contains(target)) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOnClickOutside);

    return () => window.removeEventListener("mousedown", handleOnClickOutside);
  }, [wrapperRef, searchRef]);

  return (
    <header>
      <div className="marquee overflow-hidden whitespace-nowrap text-center p-1 text-white bg-black ">
        <h1 className="inline-block animate-marquee">
          Mua ngay, nhận quà hay.
        </h1>
      </div>
      <div className="flex items-center w-full h-20 px-7 gap-x-10 justify-between md:justify-start">
        <button className="md:hidden" onClick={toggleHamburgerMenu}>
          <span className="block w-8 h-1 bg-black my-1"></span>
          <span className="block w-8 h-1 bg-black my-1"></span>
          <span className="block w-8 h-1 bg-black my-1"></span>
        </button>
        <a
          href="/"
          className="flex items-center justify-center w-20 min-w-20 h-full -mb-2 mx-auto md:mx-0"
        >
          <img
            className="object-cover w-full"
            src="https://img.giftpop.vn/brand/logo/BELOVEDBEYOND.png"
            alt="logo"
          />
        </a>
        <div className="hidden md:flex h-full flex-1 items-center justify-between gap-4">
          <nav className="flex items-center gap-x-8 list-none mr-auto">
            <ButtonNav
              text={"About"}
              onClick={() => navigate("/about")}
            />
            <ButtonNav
              text={"Sản phẩm"}
              onClick={() => navigate("/products")}
            />

          </nav>
          <nav className="flex items-center w-fit gap-x-8 list-none ml-auto">
            <div
              ref={wrapperRef}
              className="flex items-center justify-center relative size-fit"
            >
              <ButtonNav
                text={<IoIosSearch className="text-lg" onClick={toggleSearch} />}
              />
              {isSearchOpen && <Search />}
            </div>

            <div
              ref={wrapperRef}
              className="flex items-center justify-center relative size-fit"
            >
              <ButtonNav
                text={<FaUser className="text-lg" onClick={toggleMenu} />}
              />
              {isOpen && (
                <div className="absolute right-0 top-full w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-sm text-gray-700 border-b">
                        <p className="font-semibold">{user.fullName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Thông tin cá nhân
                      </Link>
                      <Link
                        to="/orders"
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Lịch sử đơn hàng
                      </Link>
                      {(user.role === "admin" || user.role === "owner") && (
                        <Link
                          to="/admin"
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                        >
                          Trang Quản Trị
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/Signin"
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        to="/Signup"
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng ký
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center relative size-fit">
              <ButtonNav
                text={<BsCart3 className="text-lg" onClick={toggleShowCart} />}
              />
              {cart.length > 0 && (
                <span className="absolute right-[-7px] top-0 bg-[#00a046] text-[12px] h-[10px] flex items-center justify-center px-[7px] py-[10px] rounded-full">
                  {cart.length}
                </span>
              )}
              {isShowCart && (
                <Cart
                  cart={cart}
                  setCart={setCart}
                  onHiddenCart={onHiddenCart}
                />
              )}
            </div>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center justify-center">
            <nav className="flex gap-3 list-none">
              <ButtonNav
                text={"About"}
                onClick={() => navigate("/about")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              />
              <ButtonNav
                text={"Sản phẩm"}
                onClick={() => navigate("/products")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              />
              <ButtonNav
                text={"Accessories"}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              />
            </nav>
            <div className="flex list-none p-3">
              <div
                ref={wrapperRef}
                className="flex items-center justify-center relative size-fit"
              >
                <ButtonNav
                  text={
                    <IoIosSearch
                      className="text-lg mx-3"
                      onClick={toggleSearch}
                    />
                  }
                />
                {isSearchOpen && <Search />}
              </div>
              <div
                ref={wrapperRef}
                className="flex items-center justify-center relative size-fit"
              >
                <ButtonNav
                  text={<FaUser className="text-lg mx-3" onClick={toggleMenu} />}
                />
                {isOpen && (
                  <div className="absolute right-0 top-full w-48 bg-white rounded-md shadow-lg py-2 z-20">
                    {user ? (
                      <>
                        <div className="px-3 py-2 text-sm text-gray-700 border-b">
                          <p className="font-semibold">{user.fullName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Thông tin cá nhân
                        </Link>
                        <Link
                          to="/orders"
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Lịch sử đơn hàng
                        </Link>
                        {(user.role === "admin" || user.role === "owner") && (
                          <Link
                            to="/admin"
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                          >
                            Trang Quản Trị
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                        >
                          Đăng xuất
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/Signin"
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Đăng nhập
                        </Link>
                        <Link
                          to="/Signup"
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Đăng ký
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center relative size-fit">
                <ButtonNav
                  text={<BsCart3 className="text-lg mx-3" onClick={toggleShowCart} />}
                />
                {cart.length > 0 && (
                  <span className="absolute right-[-7px] top-0 bg-[#00a046] text-[12px] h-[10px] flex items-center justify-center px-[7px] py-[10px] rounded-full">
                    {cart.length}
                  </span>
                )}
                {isShowCart && (
                  <Cart
                    cart={cart}
                    setCart={setCart}
                    onHiddenCart={onHiddenCart}
                  />
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
