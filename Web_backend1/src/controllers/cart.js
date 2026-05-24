import cartSv from '../services/cart.js';
import { Cart } from '../models.js';

/**
 * Tạo sản phẩm giỏ hàng
 * @param {Object} req Request từ client
 * @param {{productId: String, quantity: Number}} req.body Body của request
 * @param {Object} res Response đến client
 * @param {{created: Cart}} res.body Body của response
 */
const create = async (req, res) => {
    const userId = req.tokenPayload._id;
    const { productId, quantity } = req.body;

    cartSv.create({ userId, productId, quantity }, (err, cart) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ created: cart, message: 'Ok' })
    });
}

/**
 * Tìm sản phẩm giỏ hàng bởi chính người sở hữu nó
 * @param {Object} req Request từ client
 * @param {{
 * filter: Object,
 * order: Object,
 * page: Number,
 * limit: Number}} req.body Body của request
 *
 * @param {Object} filter Điều kiện lọc giỏ hàng
 * @see cartSv.findAll tham số criteria
 *
 * @param {{key: Number}} order Điều kiện sắp xếp kết quả
 *
 * @param {Object} res Response đến client
 * @param {{carts: [Cart]}} res.body Body của response
 */
const findByUser = async (req, res) => {
    const userId = req.tokenPayload._id;
    const { filter, order, page, limit } = req.query;

    const criteria = filter && JSON.parse(filter);
    const orderObj = order ? JSON.parse(order) : null;

    cartSv.findAll({ userId: userId, ...(criteria && { productId: criteria.productId, quantity: criteria.quantity }) },
        orderObj, page, limit, (err, carts) => {

            if (err) return res.status(500).json({ message: 'Server error' });
            return res.status(200).json({ carts: carts, message: 'Ok' });
        });
}

/**
 * Tìm sản phẩm giỏ hàng bởi admin
 * @param {Object} req Request từ client
 * @param {{
 * filter: Object,
 * order: Object,
 * page: Number,
 * limit: Number}} req.body Body của request
 *
 * @param {Object} filter Điều kiện lọc giỏ hàng
 * @see cartSv.findAll tham số criteria
 *
 * @param {{key: Number}} order Điều kiện sắp xếp kết quả
 *
 * @param {Object} res Response đến client
 * @param {{carts: [Cart]}} res.body Body của response
 */
const findByAdmin = async (req, res) => {
    const { filter, order, page, limit } = req.query;

    const criteria = filter && JSON.parse(filter);
    const orderObj = order ? JSON.parse(order) : null;

    cartSv.findAll(criteria, orderObj, page, limit, (err, carts) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ carts: carts, message: 'Ok' });
    });
}

/**
 * Cập nhật sản phẩm giỏ hàng
 *
 * @param {Object} req Request từ client
 * @param {{ _id: String, quantity: Number}} req.body Body của request
 *
 * @param {Object} res Response đến client
 * @param {{updated: Cart}} res.body Body của response
 */
const update = async (req, res) => {
    const userId = req.tokenPayload._id;
    const { _id, quantity } = req.body;

    cartSv.update(_id, userId, quantity, (err, cart) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ updated: cart });
    })
}

/**
 * Xoá sản phẩm giỏ hàng
 * @param {Object} req Request từ client
 * @param {{_ids: String | [String]}} req.body Body của request
 *
 * @param {Object} res Response đến client
 * @param {{result: Object}} res.body Body của response
 */
const destroy = async (req, res) => {
    const { _ids } = req.body;
    const userId = req.tokenPayload._id;

    cartSv.destroy(_ids, userId, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ result: result, message: 'Ok' });
    });
}

export default {
    create,
    findByUser,
    findByAdmin,
    update,
    destroy
}