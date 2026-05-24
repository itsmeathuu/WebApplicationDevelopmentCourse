import db from '../models/index.js';

const upsert = async (id, attributes, callback, transaction) => {
    try {
        const { userId, productId, price, quantity } = attributes;

        const data = {
            ...(userId && { userId: userId }),
            ...(productId && { productId: productId }),
            ...(price && { price: price }),
            ...(quantity && { quantity: quantity }),
        }

        if (id) {
            const [updatedCount] = await db.Cart.update(data, {
                where: { id: id },
                transaction: transaction
            });
            if (callback) return callback(null, updatedCount);
            return updatedCount;
        }
        else {
            const cart = await db.Product.create(data, {
                transaction: transaction
            });
            if (callback) return callback(null, cart);
            return cart;
        }
    }
    catch (err) {
        if (err) return callback(err, null);
        throw err;
    }
}

const findOne = async (id, exclude, callback) => {
    try {
        exclude = Array.isArray(exclude) ? exclude : (exclude ? [exclude] : []);

        const cart = await db.Cart.findByPk(id);

        if (callback) return callback(null, cart);
        return cart;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

const findAll = async (conditions, exclude, page = 1, limit = 10, callback) => {
    try {
        const { id, productId, userId, quantity, price } = conditions;

        const where = {
            ...(id && (Array.isArray(id) ? (typeof id[1] === 'string' ? { id: { [Op[id[1]]]: id } }
                : { id: { [Op.between]: [id[0], id[1]] } }) : { id: id })),

            ...(productId && (Array.isArray(productId) ? (typeof productId[1] === 'string' ? { productId: { [Op[productId[1]]]: productId } }
                : { productId: { [Op.between]: [productId[0], productId[1]] } }) : { productId: productId })),

            ...(userId && (Array.isArray(userId) ? (typeof userId[1] === 'string' ? { userId: { [Op[id[1]]]: userId } }
                : { userId: { [Op.between]: [userId[0], userId[1]] } }) : { userId: userId })),

            ...(price && (Array.isArray(price) ? (typeof price[1] === 'string' ? { price: { [Op[price[1]]]: price[0] } }
                : { price: { [Op.between]: [price[0], price[1]] } }) : { price: price })),

            ...(quantity && (Array.isArray(quantity) ? (typeof quantity[1] === 'string' ? { quantity: { [Op[quantity[1]]]: quantity[0] } }
                : { quantity: { [Op.between]: [quantity[0], quantity[1]] } }) : { quantity: quantity }))
        }

        exclude = Array.isArray(exclude) ? exclude : (exclude ? [exclude] : []);

        const carts = await db.Product.findAll({
            attributes: {
                include: [
                    ...(!exclude.includes('revenue') ? [[Sequelize.literal(`(SELECT COALESCE(SUM(price * quantity), 0) FROM SoldProducts WHERE SoldProducts.productId = Product.id)`), 'revenue']] : []),
                    ...(!exclude.includes('totalSold') ? [[Sequelize.literal(`(SELECT COALESCE(SUM(quantity), 0) FROM SoldProducts WHERE SoldProducts.productId = Product.id)`), 'totalSold']] : []),
                    ...(!exclude.includes('rating') ? [[Sequelize.literal(`(SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM ProductReviews WHERE ProductReviews.productId = Product.id)`), 'rating']] : []),
                ],
                exclude: exclude
            },
            where: where,
            order: order || [['id', 'ASC']],
            offset: (page - 1) * limit,
            limit: +limit
        });

        if (callback) return callback(null, carts);
        return carts;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

const destroy = async (ids, callback, transaction) => {
    try {
        const deleted = await db.Cart.destroy({
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