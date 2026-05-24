'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('ALTER TABLE ProductReviews AUTO_INCREMENT = 1');

        return queryInterface.bulkInsert('ProductReviews', [
            {
                productId: null,
                userId: null,
                rating: 5,
                comment: 'Món đồ chơi này rất hay, con tôi rất thích nó.',
                reviewDate: new Date(Date.now())
            },
            {
                productId: null,
                userId: null,
                rating: 5,
                comment: 'Đồ chơi này rất phù hợp cho sự phát triển của trẻ nhỏ.',
                reviewDate: new Date(Date.now())
            },
            {
                productId: null,
                userId: null,
                rating: 5,
                comment: 'Nay săn được đồ chơi đúng ý mà còn rẻ nữa! Con tôi rất thích món đồ chơi mẫu như vầy nhưng ngoài thị trường giá cao quá. Tôi đã tìm đến đây, nhiều đồ chơi khuyến mãi hợp túi tiền!',
                reviewDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
            },
            {
                productId: null,
                userId: null,
                rating: 5,
                comment: 'Sản phẩm đẹp, đóng gói kỹ càng. Tôi sẽ mua thêm nhiều đồ chơi ở đây để tặng con nhân dịp sinh nhật.',
                reviewDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
            },
            {
                productId: null,
                userId: null,
                rating: 4,
                comment: 'Đồ chơi rất hay, nhưng thường xuyên hết hàng. Tôi đã cố gắng theo dõi mãi mới mua được.',
                reviewDate: new Date(Date.now())
            },
            {
                productId: null,
                userId: null,
                rating: 4,
                comment: 'Con tôi trông mong mãi món đồ chơi này. Tôi muốn tặng nó cho con vào dịp sinh nhật nhưng giao hàng lâu quá. May mắn là nó vẫn được giao đến kịp.',
                reviewDate: new Date(Date.now())
            },
            {
                productId: null,
                userId: null,
                rating: 4,
                comment: null,
                reviewDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
            },
            {
                productId: null,
                userId: null,
                rating: 4,
                comment: 'Sản phẩm đẹp và bắt mắt, nhưng tôi gặp khó khăn khi kiểm tra về chất liệu, nguồn gốc xuất xứ của sản phẩm này.',
                reviewDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
            },
            {
                productId: null,
                userId: null,
                rating: 3,
                comment: null,
                reviewDate: new Date(Date.now())
            },
            {
                productId: null,
                userId: null,
                rating: 3,
                comment: null,
                reviewDate: new Date(Date.now())
            },
            {
                productId: null,
                userId: null,
                rating: 3,
                comment: 'Đồ chơi đẹp, hay. Giá còn khá đắt.',
                reviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            },
            {
                productId: null,
                userId: null,
                rating: 2,
                comment: 'Cửa hàng đã giao thiếu cho tôi sách hướng dẫn sử dụng của sản phẩm này.',
                reviewDate: new Date(Date.now())
            },
            {
                productId: null,
                userId: null,
                rating: 2,
                comment: null,
                reviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            },
            {
                productId: null,
                userId: null,
                rating: 1,
                comment: 'Cửa hàng đã giao nhầm mẫu sản phẩm cho tôi. Mong cửa hàng nhanh chóng khắc phục.',
                reviewDate: new Date(Date.now())
            },
            {
                productId: null,
                userId: null,
                rating: 1,
                comment: 'Tôi không thích mặt hàng này.',
                reviewDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('ProductReviews', null, {});
    }
};