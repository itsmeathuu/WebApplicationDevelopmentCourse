const ProductShowcase = () => {
  const products = [
    {
      name: "Chocolate Chà neo",
      image: "https://cdn.belovedbeyond.com/photos/view/photos/600x750-cc/thaoco/65def118914255fbb30dfe35.belove-beyond-personal-gift-platform.webp",
      price: "1,000,000 VND - 1,500,000 VND",
      rating: 4.5,
    },
    {
      name: "Chocolate Deep Blue Sea",
      image: "https://cdn.belovedbeyond.com/photos/view/photos/larges/qua-yeu-thuong.D631001/65f07653e7b622278d06dac8.D631001.belove-beyond-personal-gift-platform.webp",
      price: "1,000,000 VND - 1,500,000 VND",
      rating: 5,
    },
    {
      name: "Only Rose 14",
      image: "https://hoayeuthuong.com/images/promotion/12581_only-rose--size--bong.jpg",
      price: "1,000,000 VND - 1,500,000 VND",
      rating: 4.5,
    },
    {
      name: "Hộp quà tặng combo 2 gel tắm",
      image: "https://cdn.belovedbeyond.com/photos/view/photos/larges/congtycophanfunet.D630832/65e5b1796710730acd018fda.D630832.belove-beyond-personal-gift-platform.webp",
      price: "1,000,000 VND - 1,500,000 VND",
      rating: 5,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-pink-500">Sản phẩm bán chạy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const [lowPrice, highPrice] = product.price.split(" - ");
          return (
            <div
              key={product.name}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              style={{ minHeight: "350px" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Đánh giá: {product.rating} sao
              </p>
              <p className="text-pink-500 font-bold mb-1">Sale {lowPrice}</p>
              <p className="text-gray-500 line-through">{highPrice}</p>
            </div>
          );
        })}
      </div>
      <button className="mt-6 block mx-auto bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded">
        Xem thêm
      </button>
    </div>
  );
};

export default ProductShowcase;
