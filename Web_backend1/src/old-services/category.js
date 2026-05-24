import db from '../models/index.js';
import { Sequelize, Op } from 'sequelize';

/**
 * 
 * @param {Number} id mã người dùng
 * @param {{email: String?, 
 * phone: String?, fullName: String?, 
 * role: String?, createdAt: Date?, 
 * updatedAt: Date?}} attributes
 * 
 * @param {function(Error?)?} callback (error)  
 */
const add = async (names, callback, transaction) => {
    try {
        const categories = Array.isArray(names) ? names.map(name => ({ name })) : [{ names }];

        await db.Category.bulkCreate(categories, {
            transaction: transaction
        });
        if (callback) return callback(null);
    }
    catch (err) {
        if (callback) return callback(err);
        throw err;
    }
}

/**
 * Tìm người dùng
 * @param {{id: Number | [Number, Boolean], email: String | [String, Boolean], 
 * phone: String ! [String, Boolean], fullName: String | [String, Boolean], 
 * role: String | [String | Boolean], createdAt: Date | [Date, Date], 
 * updatedAt: Date | [Date, Date], order: [{by: String, type: String}]?}} conditions 
 * điều kiện tìm (mặc định là tìm chính xác có thể sử dụng 'key: value' hoặc 'key: [value, true]'). 
 * Tìm gần đúng bằng cách sử dụng 'key :[value, false]'
 * 
 * @param {Number} page số trang
 * @param {Number} limit số lượng bản ghi tối đa trả về
 * @param {function([]?, Error?)?} callback (userInfosList, error)
 * @returns {Promise<[]> | void}
 */
const findAll = async (conditions, page = 1, limit = 10, callback) => {
    try {
        const { id, name } = conditions || {};

        const where = {
            ...(id && (Array.isArray(id) ? (typeof id[1] === 'string' ? { id: { [Op[id[1]]]: id } }
                : { id: { [Op.between]: [id[0], id[1]] } }) : { id: id })),

            ...(name && (Array.isArray(name) ? (name[1] === true ? { name: name[0] }
                : { name: { [Op.and]: [Sequelize.where(Sequelize.fn('search_string', Sequelize.col('name'), name[0]), true)] } })
                : { name: name })),
        };

        const categories = await db.Category.findAll({
            where: where,
            order: order || [['id', 'ASC']],
            offset: (page - 1) * limit,
            limit: +limit,
            raw: true
        });

        if (callback) callback(null, categories);
        return categories;
    }
    catch (err) {
        if (callback) callback(err, null);
        throw err;
    }
}

/**
 * Xoá người dùng hoặc xoá một loạt người dùng
 * @param {[Number] | Number} ids mã của người dùng hoặc danh sách của mã người dùng 
 * @param {function(Error?)} callback
 * @returns {Promise<void> | void} 
 */
const remove = async (idsOrNames, callback, transaction) => {
    try {
        const deleted = await db.User.destroy({
            where: {
                ...(Array.isArray(idsOrNames) ? (typeof idsOrNames[0] === 'number' ? { id: idsOrNames } : { name: idsOrNames })
                    : (typeof idsOrNames === 'number' ? { id: idsOrNames } : { name: idsOrNames }))
            }
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
    add,
    findAll,
    remove
}