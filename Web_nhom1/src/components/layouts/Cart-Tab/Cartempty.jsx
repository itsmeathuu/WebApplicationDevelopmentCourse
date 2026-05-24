export function CartEmpty() {
  return (
    <div className="text-center">
      <img
        className="w-[300px] h-[280px] m-auto sm:h-[300px]"
        src={"/empty.png"}
        alt="cart empty"
      />
      <p className="text-2xl">Giỏ hàng đang trống !</p>
      <p className="text-base my-2 text-gray-500">
        Hãy thêm sản phẩm vào giỏ hàng nào
      </p>
    </div>
  );
}
