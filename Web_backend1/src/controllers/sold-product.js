import soldProductSv from '../services/sold-product.js';
import cartSv from '../services/cart.js';

/**
 * Tạo đơn hàng từ giỏ hàng
 * @param {Object} req Request từ client
 * @param {{items: [{productId: String, price: Number, quantity: Number}]}} req.body Body của request
 * @param {Object} res Response đến client
 * @param {{created: [SoldProduct]}} res.body Body của response
 */
const createOrder = async (req, res) => {
    const userId = req.tokenPayload._id;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items are required' });
    }

    // Validate items
    for (const item of items) {
        if (!item.productId || !item.price || !item.quantity) {
            return res.status(400).json({ message: 'Each item must have productId, price, and quantity' });
        }
    }

    try {
        const soldProducts = await soldProductSv.createOrder(items, userId);
        
        // Xóa các sản phẩm đã đặt hàng khỏi giỏ hàng
        const cartItemIds = items.map(item => item.cartId).filter(id => id);
        if (cartItemIds.length > 0) {
            await cartSv.destroy(cartItemIds, userId);
        }

        return res.status(200).json({ 
            created: soldProducts, 
            message: 'Order created successfully' 
        });
    } catch (error) {
        console.error('Create order error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

/**
 * Lấy lịch sử đơn hàng của user
 * @param {Object} req Request từ client
 * @param {{
 * filter: Object,
 * order: Object,
 * page: Number,
 * limit: Number}} req.query Query của request
 * @param {Object} res Response đến client
 * @param {{orders: [SoldProduct]}} res.body Body của response
 */
const findByUser = async (req, res) => {
    const userId = req.tokenPayload._id;
    const { filter, order, page, limit } = req.query;

    const criteria = filter && JSON.parse(filter);
    const orderObj = order ? JSON.parse(order) : null;

    soldProductSv.findByUser(userId, criteria, orderObj, page, limit, (err, orders) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ orders: orders, message: 'Ok' });
    });
}

/**
 * Lấy tất cả đơn hàng (admin)
 * @param {Object} req Request từ client
 * @param {{
 * filter: Object,
 * order: Object,
 * page: Number,
 * limit: Number}} req.query Query của request
 * @param {Object} res Response đến client
 * @param {{orders: [SoldProduct]}} res.body Body của response
 */
const findAll = async (req, res) => {
    const { filter, order, page, limit } = req.query;

    const criteria = filter && JSON.parse(filter);
    const orderObj = order ? JSON.parse(order) : null;

    soldProductSv.findAll(criteria, orderObj, page, limit, (err, orders) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ orders: orders, message: 'Ok' });
    });
}

export default {
    createOrder,
    findByUser,
    findAll
}
