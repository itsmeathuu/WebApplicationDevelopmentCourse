import db from '../old-models/index.js';
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
const upsert = async (id, attributes, callback, transaction) => {
    try {
        const { email, phone, fullName, role } = attributes;

        const data = {
            ...(email && { email: email }),
            ...(phone && { phone: phone }),
            ...(fullName && { fullName: fullName }),
            ...(role && { role: role }),
        };

        if (id) {
            const [updatedCount] = await db.User.update(data, {
                where: { id: id }, transaction: transaction
            });
            if (callback) return callback(null, updatedCount);
            return updatedCount;
        }
        else {
            const user = await db.User.create(data, { transaction: transaction });
            if (callback) return callback(null, user);
            return user;
        }
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

const findOne = async (id, exclude, callback) => {
    try {
        const user = await db.User.findByPk(id, {
            attributes: {
                exclude: Array.isArray(exclude) ? [...exclude, 'password'] : [exclude && exclude, 'password']
            }
        });

        if (callback) return callback(null, user);
        return user;
    }
    catch (err) {
        if (callback) return callback(err, null);
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
        const { id, email, phone, fullName, role, createdAt, updatedAt, order } = conditions || {};

        const where = {
            ...(id && (Array.isArray(id) ? (typeof id[1] === 'string' ? { id: { [Op[id[1]]]: id } }
                : { id: { [Op.between]: [id[0], id[1]] } }) : { id: id })),

            ...(email && (Array.isArray(email) ? (email[1] === true ? { email: email[0] }
                : { email: { [Op.and]: [Sequelize.where(Sequelize.fn('search_string', Sequelize.col('email'), email[0]), true)] } })
                : { email: email })),

            ...(phone && (Array.isArray(phone) ? (phone[1] === true ? { phone: phone[0] }
                : { phone: { [Op.and]: [Sequelize.where(Sequelize.fn('search_string', Sequelize.col('phone'), phone[0]), true)] } })
                : { phone: phone })),

            ...(fullName && (Array.isArray(fullName) ? (fullName[1] === true ? { fullName: fullName[0] }
                : { fullName: { [Op.and]: [Sequelize.where(Sequelize.fn('search_string', Sequelize.col('fullName'), fullName[0]), true)] } })
                : { fullName: fullName })),

            ...(role && { role: role }),

            ...(createdAt && (Array.isArray(createdAt) ? (typeof createdAt[1] === 'string'
                ? { createdAt: { [Op[createdAt[1]]]: createdAt } }
                : { createdAt: { [Op.between]: [createdAt[0], createdAt[1]] } }) : { createdAt: createdAt })),

            ...(updatedAt && (Array.isArray(updatedAt) ? (typeof updatedAt[1] === 'string'
                ? { updatedAt: { [Op[updatedAt[1]]]: updatedAt } }
                : { updatedAt: { [Op.between]: [updatedAt[0], updatedAt[1]] } }) : { updatedAt: updatedAt })),
        };

        const users = await db.User.findAll({
            attributes: { exclude: ['password'] }, // Không trả về password
            where: where,
            order: order || [['id', 'ASC']],
            offset: (page - 1) * limit,
            limit: +limit,
            raw: true
        });

        if (callback) callback(null, users);
        return users;
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
const destroy = async (ids, callback, transaction) => {
    try {
        const deleted = await db.User.destroy({
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