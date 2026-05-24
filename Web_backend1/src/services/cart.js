import { Cart } from '../models.js';
import mongoose from 'mongoose';
import toQueryOperatorObject from './mongoose-query-operator-object.js'

/**
 * Tạo giỏ hàng
 * @param {{productId: String, userId: String, quantity: Number}} attributes Thuộc tính giỏ hàng
 * @param {function(Error?, Cart?)} callback
 * @param {ClientSession} session Giao dịch (Transaction)
 */
const create = async (attributes, callback, session) => {
    try {
        const { productId, userId, quantity } = attributes;

        // Kiểm tra xem đã có sản phẩm này trong giỏ hàng chưa
        const existingCart = await Cart.findOne({ productId, userId });

        if (existingCart) {
            // Nếu đã có, cập nhật quantity
            existingCart.quantity += quantity;
            await existingCart.save({ session });

            const cart = existingCart.toObject();
            cart._id = cart._id.toString();
            delete cart.__v;

            if (callback) return callback(null, cart);
            return cart;
        } else {
            // Nếu chưa có, tạo mới
            let cart = new Cart(attributes);
            await cart.save({ session });

            cart = cart.toObject();
            cart._id = cart._id.toString();
            delete cart.__v;

            if (callback) return callback(null, cart);
            return cart;
        }
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/**
 * Tìm các giỏ hàng
 * @param {String} userId Mã người dùng
 * @param {String} productId Mã sản phẩm
 * @param {function(Error?, [Cart]?)} callback
 */
const find = async (userId, productId, callback) => {
    try {
        const carts = await findAll({ userId, productId });
        if (callback) return callback(null, carts);
        return carts;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/**
 * Tìm các giỏ hàng theo nhiều điều kiện
 * @param {{
 * _id: String | [regex: String, option: String?],
 * productId: String | [regex: String, option: String?],
 * userId: String | [regex: String, option: String?],
 * quantity: Number | [operator: String, value: Number]}} criteria Điều kiện tìm
 *
 * @param {String} regex Chuỗi regex để truy vấn
 * @param {String} option Tuỳ chọn của regex
 *
 * @param {{ field: type }} order Điều kiện sắp xếp kết quả với `field` là thuộc tính muốn sắp xếp,
 * `type` kiểu sắp xếp, tăng dần là 1, giảm dần -1
 *
 * @param {Number} page Số trang trả về các đối tượng
 * @param {Number} limit Số lượng đối tượng tối đa trong một trang
 * @param {function(Error?, [Cart]?)} callback
 */
const findAll = async (criteria, order, page = 1, limit = 10, callback) => {
    try {
        const { _id, productId, userId, quantity } = criteria || {};

        const carts = await Cart.aggregate([
            {
                // So sánh các điều kiện
                $match: {
                    ...(_id && { _id: Array.isArray(_id) ? { $regex: _id[0], $options: _id.length > 1 ? _id[1] : 'i' } : new mongoose.Types.ObjectId(_id) }),
                    ...(productId && { productId: Array.isArray(productId) ? { $regex: productId[0], $options: productId.length > 1 ? productId[1] : 'i' } : productId }),
                    ...(userId && { userId: Array.isArray(userId) ? { $regex: userId[0], $options: userId.length > 1 ? userId[1] : 'i' } : userId }),
                    ...(quantity && { quantity: Array.isArray(quantity) ? toQueryOperatorObject(quantity) : quantity }),
                }
            },
            {
                // Thêm trường giả, giá trị productId có kiểu String chuyển sang ObjectId mới join với _id của Product được
                $addFields: {
                    productIdObject: { $convert: { input: '$productId', to: 'objectId', onError: null, onNull: null } }
                }
            },
            {
                // Join các tài liệu thông qua productId với các _id của Product
                $lookup: {
                    from: 'Product',
                    localField: 'productIdObject',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                // Thêm trường price (giá gốc của sản phẩm), total (thành tiền price * quantity)
                $addFields: {
                    product: { $arrayElemAt: ['$product', 0] },
                    price: { $ifNull: [{ $arrayElemAt: ['$product.price', 0] }, 0] },
                    total: { $multiply: [{ $ifNull: [{ $arrayElemAt: ['$product.price', 0] }, 0] }, '$quantity'] }
                }
            },
            {
                // Trường bằng 1 nghĩa là đối tượng kết quả sẽ có trường đó
                $project: {
                    _id: 1, productId: 1, userId: 1, quantity: 1, price: 1, total: 1
                }
            },
            { $sort: (order && typeof order === 'object') ? order : { _id: 1 } },
            { $skip: (page - 1) * limit },
            { $limit: +limit }
        ]);

        if (callback) return callback(null, carts);
        return carts;
    }
    catch (err) {
        if (callback) callback(err, null);
        throw err;
    }
}

/**
 * Cập nhật sản phẩm giỏ hàng
 * @param {String} _id Mã sản phẩm giỏ hàng
 * @param {Number} quantity Số lượng sản phẩm
 * @param {function(Error?, Cart?)} callback
 * @param {ClientSession} session Giao dịch (transaction)
 */
const update = async (_id, userId, quantity, callback, session) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { _id: _id, userId: userId },
            { quantity },
            { new: true, session }
        ).select('-__v');

        if (callback) return callback(null, cart);
        return cart;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/**
 * Xoá sản phẩm giỏ hàng
 * @param {String | [String]} ids Mã sản phẩm giỏ hàng hoặc danh sách các mã cần xoá
 * @param {String} userId Mã của người dùng sở hữu
 * @param {function(Error?, Object?)} callback
 * @param {ClientSession} session Giao dịch (transaction)
 */
const destroy = async (ids, userId, callback, session) => {
    try {
        const _ids = Array.isArray(ids) ? ids.map(id => new mongoose.Types.ObjectId(id)) : new mongoose.Types.ObjectId(ids);
        const result = await Cart.deleteMany({ _id: { $in: _ids }, ...(userId && { userId }) }, { ...(session && { session }) });
        if (callback) return callback(null, result);
        else return result;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

export default {
    create,
    find,
    findAll,
    update,
    destroy
}