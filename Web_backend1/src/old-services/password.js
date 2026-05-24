import bcrypt from 'bcryptjs';
import db from '../old-models/index.js';
import CustomError from './custom-error.js';

/**
 * 
 * @param {Number} userId mã người dùng
 * @param {String} password mật khẩu
 * @param {function(Error?)?} callback 
 * @returns {Promise<void>}
 */
const generate = async (userId, password, callback, transaction) => {
    try {
        if (!password || password === '') {
            const err = new CustomError('EmptyPasswordError',
                ['paramInfo', { variable: 'password' }]);
            if (callback) return callback(err);
            throw err;
        }

        // Băm mật khẩu
        const hashedPass = await bcrypt.hash(password, +process.env.SALT_LENGTH);

        // Cập nhật vào bản ghi
        const [updatedCount] = await db.User.update({
            password: hashedPass
        }, {
            where: { id: userId },
            transaction: transaction
        });

        // Nếu không có bản ghi nào được cập nhật
        if (updatedCount == 0) {
            const err = new CustomError('NoPasswordUpdatedError',
                ['paramInfo', { variable: 'userId' }]);
            if (callback) return callback(err);
            throw err;
        }

        if (callback) return callback(null);
    } catch (err) {
        if (callback) return callback(err);
        throw err;
    }
}

/**
 * Xác thực mật khẩu
 * @param {{id: Number?, email: String?, phone: String?}} userInfo thông tin người dùng
 * @param {String} password mật khẩu chưa băm
 * @param {function({id: Number, email: String, phone: String}?, Error?)?} callback (userInfo, error)
 * @returns {Promise<Boolean> | void}
 */
const verify = async (userId, password, callback) => {
    try {
        const user = await db.User.findByPk(userId);

        // Nếu người dùng không tồn tại
        if (!user) {
            const err = new CustomError('UserNotFoundError',
                ['paramInfo', { variable: 'userId' }]);
            if (callback) return callback(err, null);
            throw err;
        }

        // Kiểm tra mật khẩu
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            // Mật khẩu đúng
            if (callback) return callback(null, true);
            return true;
        }
        else {
            // Mật khẩu sai
            if (callback) return callback(null, false);
            return false;
        }
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

export default {
    generate,
    verify
}