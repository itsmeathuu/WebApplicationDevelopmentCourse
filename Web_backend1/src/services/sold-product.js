import { SoldProduct } from '../models.js';
import mongoose from 'mongoose';
import toQueryOperatorObject from './mongoose-query-operator-object.js'

/**
 * Tạo đơn hàng (sold products)
 * @param {Array} items Danh sách sản phẩm [{productId, price, quantity}]
 * @param {String} userId Mã người dùng
 * @param {function(Error?, [SoldProduct]?)} callback
 * @param {ClientSession} session Giao dịch (Transaction)
 */
const createOrder = async (items, userId, callback, session) => {
    try {
        const saleDate = new Date();
        const soldProducts = items.map(item => ({
            productId: item.productId,
            userId: userId,
            price: item.price,
            quantity: item.quantity,
            saleDate: saleDate
        }));

        const result = await SoldProduct.insertMany(soldProducts, { session });

        const formattedResult = result.map(item => {
            const obj = item.toObject();
            obj._id = obj._id.toString();
            delete obj.__v;
            return obj;
        });

        if (callback) return callback(null, formattedResult);
        return formattedResult;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/**
 * Tìm đơn hàng của user
 * @param {String} userId Mã người dùng
 * @param {{
 * _id: String | [regex: String, option: String?],
 * productId: String | [regex: String, option: String?],
 * price: Number | [operator: String, value: Number],
 * quantity: Number | [operator: String, value: Number],
 * saleDate: Date | [operator: String, value: Date]}} criteria Điều kiện tìm
 * @param {{ field: type }} order Điều kiện sắp xếp kết quả
 * @param {Number} page Số trang
 * @param {Number} limit Số lượng đối tượng tối đa trong một trang
 * @param {function(Error?, [SoldProduct]?)} callback
 */
const findByUser = async (userId, criteria, order, page = 1, limit = 10, callback) => {
    try {
        const { _id, productId, price, quantity, saleDate } = criteria || {};

        const soldProducts = await SoldProduct.aggregate([
            {
                $match: {
                    userId: userId,
                    ...(_id && { _id: Array.isArray(_id) ? { $regex: _id[0], $options: _id.length > 1 ? _id[1] : 'i' } : new mongoose.Types.ObjectId(_id) }),
                    ...(productId && { productId: Array.isArray(productId) ? { $regex: productId[0], $options: productId.length > 1 ? productId[1] : 'i' } : productId }),
                    ...(price && { price: Array.isArray(price) ? toQueryOperatorObject(price) : price }),
                    ...(quantity && { quantity: Array.isArray(quantity) ? toQueryOperatorObject(quantity) : quantity }),
                    ...(saleDate && { saleDate: Array.isArray(saleDate) ? toQueryOperatorObject(saleDate) : saleDate }),
                }
            },
            {
                // Thêm trường giả để join với Product
                $addFields: {
                    productIdObject: { $convert: { input: '$productId', to: 'objectId', onError: null, onNull: null } }
                }
            },
            {
                // Join với Product để lấy thông tin sản phẩm
                $lookup: {
                    from: 'Product',
                    localField: 'productIdObject',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                // Thêm thông tin sản phẩm
                $addFields: {
                    product: { $arrayElemAt: ['$product', 0] },
                    total: { $multiply: ['$price', '$quantity'] }
                }
            },
            {
                $project: {
                    _id: 1, productId: 1, userId: 1, price: 1, quantity: 1, saleDate: 1, total: 1,
                    'product.name': 1, 'product.category': 1
                }
            },
            { $sort: (order && typeof order === 'object') ? order : { saleDate: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: +limit }
        ]);

        if (callback) return callback(null, soldProducts);
        return soldProducts;
    }
    catch (err) {
        if (callback) callback(err, null);
        throw err;
    }
}

/**
 * Tìm tất cả đơn hàng (admin)
 * @param {{
 * _id: String | [regex: String, option: String?],
 * productId: String | [regex: String, option: String?],
 * userId: String | [regex: String, option: String?],
 * price: Number | [operator: String, value: Number],
 * quantity: Number | [operator: String, value: Number],
 * saleDate: Date | [operator: String, value: Date]}} criteria Điều kiện tìm
 * @param {{ field: type }} order Điều kiện sắp xếp kết quả
 * @param {Number} page Số trang
 * @param {Number} limit Số lượng đối tượng tối đa trong một trang
 * @param {function(Error?, [SoldProduct]?)} callback
 */
const findAll = async (criteria, order, page = 1, limit = 10, callback) => {
    try {
        const { _id, productId, userId, price, quantity, saleDate } = criteria || {};

        const soldProducts = await SoldProduct.aggregate([
            {
                $match: {
                    ...(_id && { _id: Array.isArray(_id) ? { $regex: _id[0], $options: _id.length > 1 ? _id[1] : 'i' } : new mongoose.Types.ObjectId(_id) }),
                    ...(productId && { productId: Array.isArray(productId) ? { $regex: productId[0], $options: productId.length > 1 ? productId[1] : 'i' } : productId }),
                    ...(userId && { userId: Array.isArray(userId) ? { $regex: userId[0], $options: userId.length > 1 ? userId[1] : 'i' } : userId }),
                    ...(price && { price: Array.isArray(price) ? toQueryOperatorObject(price) : price }),
                    ...(quantity && { quantity: Array.isArray(quantity) ? toQueryOperatorObject(quantity) : quantity }),
                    ...(saleDate && { saleDate: Array.isArray(saleDate) ? toQueryOperatorObject(saleDate) : saleDate }),
                }
            },
            {
                // Thêm trường giả để join với Product và User
                $addFields: {
                    productIdObject: { $convert: { input: '$productId', to: 'objectId', onError: null, onNull: null } },
                    userIdObject: { $convert: { input: '$userId', to: 'objectId', onError: null, onNull: null } }
                }
            },
            {
                // Join với Product để lấy thông tin sản phẩm
                $lookup: {
                    from: 'Product',
                    localField: 'productIdObject',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                // Join với User để lấy thông tin người dùng
                $lookup: {
                    from: 'User',
                    localField: 'userIdObject',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                // Thêm thông tin sản phẩm và user
                $addFields: {
                    product: { $arrayElemAt: ['$product', 0] },
                    user: { $arrayElemAt: ['$user', 0] },
                    total: { $multiply: ['$price', '$quantity'] }
                }
            },
            {
                $project: {
                    _id: 1, productId: 1, userId: 1, price: 1, quantity: 1, saleDate: 1, total: 1,
                    'product.name': 1, 'product.category': 1,
                    'user.fullName': 1, 'user.email': 1
                }
            },
            { $sort: (order && typeof order === 'object') ? order : { saleDate: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: +limit }
        ]);

        if (callback) return callback(null, soldProducts);
        return soldProducts;
    }
    catch (err) {
        if (callback) callback(err, null);
        throw err;
    }
}

export default {
    createOrder,
    findByUser,
    findAll
}
