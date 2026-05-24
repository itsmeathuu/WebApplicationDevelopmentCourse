import db from '../models/index.js';
import { Sequelize, Op } from 'sequelize';

const upsert = async (id, attributes, callback, transaction) => {
    try {
        const { name, description, price, brand, suitableAge, tag, stock, isSale, discount, discountStart, discountEnd } = attributes;

        const data = {
            ...(name && { name: name }),
            ...(description && { description: description }),
            ...(price && { price: price }),
            ...(brand && { brand: brand }),
            ...(suitableAge && { suitableAge: suitableAge }),
            ...(tag !== undefined && { tag: tag }),
        }

        if (!stock || !isSale) data.InventoryProduct = {
            ...(stock && { quantity: stock }),
            ...(isSale && { isSale: isSale })
        }

        if (!discount || !discountStart || !discountEnd) data.Discount = {
            ...(discount !== undefined && { percentage: discount }),
            ...(discountStart !== undefined && { startDate: discountStart }),
            ...(discountEnd !== undefined && { endDate: discountEnd })
        }

        const include = [db.InventoryProduct, db.Discount];

        if (id) {
            const [updatedCount] = await db.Product.update(data, {
                where: { id: id },
                include: include,
                transaction: transaction
            });
            if (callback) return callback(null, updatedCount);
            return updatedCount;
        }
        else {
            const product = await db.Product.create(data, {
                include: include,
                transaction: transaction
            });
            if (callback) return callback(null, product);
            return product;
        }
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/**
 * Lấy danh sách sản phẩm (phân trang)
 * @param {Number} page số trang 
 * @param {Number} limit số lượng bản ghi tối đa trả về
 * @param {function([]?, Error?)?} callback (productsList, error)
 */
const findOne = async (id, exclude, callback) => {
    try {
        const include = [
            {
                // Join với bảng InventoryProduct
                model: db.InventoryProduct,
                attributes: [[Sequelize.col('quantity'), 'stock'], 'isSale'],
                required: false
            },
            {
                model: db.Category,
                attributes: ['id', 'name'],
                through: { attributes: [] },
                required: false
            },
            {
                // Join với bảng Discount
                model: db.Discount,
                attributes: [[Sequelize.col('percentage'), 'saleOff'], 'startDate', 'endDate'],
                required: false
            },
            {
                // Join với bảng ProductImage
                model: db.ProductImage,
                attributes: ['id', 'url', 'order'],
                required: false,
                order: ['order', 'ASC']
            },
            {
                model: db.SoldProduct,
                attributes: [],
                required: false,
            },
            {
                model: db.ProductReview,
                attributes: [],
                required: false,
            }
        ];

        exclude = Array.isArray(exclude) ? exclude : (exclude ? [exclude] : []);
        exclude.push('description');

        // Tìm các sản phẩm
        const product = await db.Product.findByPk(id, {
            attributes: {
                include: [
                    ...(!exclude.includes('revenue') ? [[Sequelize.literal('COALESCE(SUM(SoldProducts.price * SoldProducts.quantity), 0)'), 'revenue']] : []),
                    ...(!exclude.includes('totalSold') ? [[Sequelize.literal('COALESCE(SUM(SoldProducts.quantity), 0)'), 'totalSold']] : []),
                    ...(!exclude.includes('rating') ? [[Sequelize.literal('COALESCE(ROUND(AVG(ProductReviews.rating)), 0)'), 'rating']] : []),
                    ...(!exclude.includes('totalReviews') ? [[Sequelize.literal('COALESCE(COUNT(ProductReviews.id), 0)'), 'totalReviews']] : []),
                ],
                exclude: exclude
            },
            include: include,
            group: ['Product.id', 'Categories.id', 'SoldProducts.id', 'ProductImages.id', 'ProductReviews.id']
        });

        if (callback) return callback(null, product);
        return product;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/**
 * Tìm sản phẩm
 * @param {{id: Number | [Number, Boolean], name: String | [String, Boolean], 
 * price: Number | [Number, Number], stockQuantity: Number | [Number, Number], 
 * brand: String | [String, Boolean], suitableAge: Number | [Number, Number], 
 * tag: String | [String, Boolean], createdAt: Date | [Date, Date], 
 * updatedAt: Date | [Date, Date], discount: Number | [Number, Number], 
 * revenue: Number | [Number, Number], soldQuantity: Number | [Number, Number], 
 * categories: [String], rating: Number | [Number, Number], 
 * order: [{by: String, type: String}]?}} conditions điều kiện tìm
 * 
 * @param {Number} page số trang
 * @param {Number} limit số lượng bản ghi tối đa trả về
 * @param {function([Product]?, Error?)?} callback (products, error)
 * @returns {Promise<[Product]> | void}
 */
const findAll = async (conditions, exclude, page = 1, limit = 10, callback) => {
    try {
        const { id, name, price, brand, suitableAge, tag, createdAt, updatedAt, stock, isSale,
            discount, revenue, totalSold, rating, totalReviews, categories, order } = conditions || {};

        const where = {
            ...(id && (Array.isArray(id) ? (typeof id[1] === 'string' ? { id: { [Op[id[1]]]: id[0] } }
                : { id: { [Op.between]: [id[0], id[1]] } }) : { id: id })),

            ...(name && (Array.isArray(name) ? (name[1] === true ? { name: name[0] }
                : { [Op.and]: [Sequelize.where(Sequelize.fn('search_string', Sequelize.col('name'), name[0]), true)] })
                : { name: name })),

            ...(price && (Array.isArray(price) ? (typeof price[1] === 'string' ? { price: { [Op[price[1]]]: price[0] } }
                : { price: { [Op.between]: [price[0], price[1]] } }) : { price: price })),

            ...(brand && (Array.isArray(brand) ? (brand[1] === true ? { brand: brand[0] }
                : { [Op.and]: [Sequelize.where(Sequelize.fn('search_string', Sequelize.col('brand'), brand[0]), true)] })
                : { brand: brand })),

            ...(suitableAge && (Array.isArray(suitableAge) ? (typeof suitableAge[1] === 'string' ? { suitableAge: { [Op[suitableAge[1]]]: suitableAge[0] } }
                : { suitableAge: { [Op.between]: [suitableAge[0], suitableAge[1]] } }) : { suitableAge: suitableAge })),

            ...(tag && (Array.isArray(tag) ? (tag[1] === true ? { tag: tag[0] }
                : { [Op.and]: [Sequelize.where(Sequelize.fn('search_string', Sequelize.col('tag'), tag[0]), true)] })
                : { tag: tag })),

            ...(createdAt && (Array.isArray(createdAt) ? (typeof createdAt[1] === 'string'
                ? { createdAt: { [Op[createdAt[1]]]: createdAt } }
                : { createdAt: { [Op.between]: [createdAt[0], createdAt[1]] } }) : { createdAt: createdAt })),

            ...(updatedAt && (Array.isArray(updatedAt) ? (typeof updatedAt[1] === 'string'
                ? { updatedAt: { [Op[updatedAt[1]]]: updatedAt } }
                : { updatedAt: { [Op.between]: [updatedAt[0], updatedAt[1]] } }) : { updatedAt: updatedAt })),
        }

        const having = {
            ...(revenue && (Array.isArray(revenue) ? (typeof revenue[1] === 'string' ? { revenue: { [Op[revenue[1]]]: revenue[0] } }
                : { revenue: { [Op.between]: [revenue[0], revenue[1]] } }) : { revenue: revenue })),

            ...(totalSold && (Array.isArray(totalSold) ? (typeof totalSold[1] === 'string' ? { totalSold: { [Op[totalSold[1]]]: totalSold[0] } }
                : { totalSold: { [Op.between]: [totalSold[0], totalSold[1]] } }) : { totalSold: totalSold })),

            ...(rating && (Array.isArray(rating) ? (typeof rating[1] === 'string' ? { rating: { [Op[rating[1]]]: rating[0] } }
                : { rating: { [Op.between]: [rating[0], rating[1]] } }) : { rating: rating })),

            ...(totalReviews && (Array.isArray(totalReviews) ? (typeof totalReviews[1] === 'string' ? { totalReviews: { [Op[totalReviews[1]]]: totalReviews[0] } }
                : { totalReviews: { [Op.between]: [totalReviews[0], totalReviews[1]] } }) : { totalReviews: totalReviews })),
        };

        const include = [
            {
                // Join với bảng InventoryProduct
                model: db.InventoryProduct,
                attributes: [[Sequelize.col('quantity'), 'stock'], 'isSale'],
                required: false,

                ...(stock && (Array.isArray(stock) ? (typeof stock[1] === 'string' ? { stock: { [Op[stock[1]]]: stock[0] } }
                    : { stock: { [Op.between]: [stock[0], stock[1]] } }) : { stock: stock })),

                ...(isSale && { isSale: isSale })
            },
            {
                model: db.Category,
                attributes: ['id', 'name'],
                through: { attributes: [] },
                required: false,

                ...(categories && { where: { [typeof categories[0] === 'number' ? 'id' : 'name']: { [Op.in]: categories } } })
            },
            {
                // Join với bảng Discount
                model: db.Discount,
                attributes: [[Sequelize.col('percentage'), 'saleOff'], 'startDate', 'endDate'],
                required: false,

                ...(discount && (Array.isArray(discount) ? (typeof discount[1] === 'string' ? { percentage: { [Op[discount[1]]]: discount[0] } }
                    : { percentage: { [Op.between]: [discount[0], discount[1]] } }) : { percentage: discount })),
            },
            {
                // Join với bảng ProductImage
                model: db.ProductImage,
                attributes: ['id', 'url'],
                required: false,
                where: { order: 1 }
            },
            {
                model: db.ProductReview,
                attributes: [],
                required: false
            }];

        exclude = Array.isArray(exclude) ? exclude : (exclude ? [exclude] : []);
        exclude.push('description');

        const products = await db.Product.findAll({
            attributes: {
                include: [
                    ...(!exclude.includes('revenue') ? [[Sequelize.literal(`(SELECT COALESCE(SUM(price * quantity), 0) FROM SoldProducts WHERE SoldProducts.productId = Product.id)`), 'revenue']] : []),
                    ...(!exclude.includes('totalSold') ? [[Sequelize.literal(`(SELECT COALESCE(SUM(quantity), 0) FROM SoldProducts WHERE SoldProducts.productId = Product.id)`), 'totalSold']] : []),
                    ...(!exclude.includes('rating') ? [[Sequelize.literal(`(SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM ProductReviews WHERE ProductReviews.productId = Product.id)`), 'rating']] : []),
                ],
                exclude: exclude
            },
            include: include,
            where: where,
            group: ['Product.id'],
            having: having,
            order: order || [['id', 'ASC']],
            offset: (page - 1) * limit,
            limit: +limit
        });

        if (callback) return callback(null, products);
        return products;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/**
 * Xoá sản phẩm hoặc xoá một loạt sản phẩm
 * @param {[Number] | Number} ids mã của sản phẩm hoặc danh sách của mã sản phẩm 
 * @param {function(Error?)} callback (error)
 * @returns {Promise<void> | void} 
 */
const destroy = async (ids, callback, transaction) => {
    try {
        const deleted = await db.Product.destroy({
            where: { id: ids }
        }, { transaction: transaction });

        if (callback) return callback(null, deleted);
        return deleted;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

export default {
    upsert,
    findOne,
    findAll,
    destroy
}