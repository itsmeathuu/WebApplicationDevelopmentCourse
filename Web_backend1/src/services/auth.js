import CustomError from './custom-error.js';
import 'dotenv/config';
import passwordSv from './password.js';
import tokenSv from './token.js';
import userSv from './user.js';
import { Token, User } from '../models.js';

/** 
 * Đăng nhập
 * @param {{email: String?, phone: String?}} emailOrPhone Email hoặc số điện thoại
 * @param {String} password Mật khẩu
 * @param {function(Error?, {accessToken: String, refreshToken: String}?)} callback
 */
const login = async (emailOrPhone, password, callback) => {
    try {
        const { email, phone } = emailOrPhone;

        // Ít nhất email hoặc phone phải có giá trị
        if (!email && !phone) {
            const err = new CustomError('NotProvidedEmailOrPhoneError');
            if (callback) return callback(err, null);
            throw err;
        }

        // Tìm người dùng phù hợp với email hoặc số điện thoại trong CSDL
        const user = await User.findOne({
            ...(email && { email }),
            ...(phone && { phone })
        });

        // Nếu như người dùng không tồn tại
        if (!user) {
            const err = new CustomError('UserNotFoundError');
            if (callback) return callback(err, null);
            throw err;
        }

        // Tạo phần thân của token
        const payload = { _id: user._id.toString(), role: user.role };

        // Xác thực mật khẩu
        const result = await passwordSv.verify(payload._id, password);
        if (!result) {
            const err = new CustomError('IncorrectPasswordError');
            if (callback) return callback(err, null);
            throw err;
        }

        // Tạo token ghi vào CSDL
        const tokenPair = await tokenSv.generateAndRecord(payload, {
            accessToken: true, refreshToken: true
        });

        if (callback) return callback(null, tokenPair);
        return tokenPair;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/**
 * Đăng xuất
 * @param {String} refreshToken Refresh token
 * @param {function(Error?)} callback 
 */
const logout = async (refreshToken, callback) => {
    try {
        // Xoá bản ghi chứa refresh token
        const result = await Token.deleteOne({
            refreshToken: refreshToken
        });

        // Nếu token chưa được thu hồi
        if (result.deletedCount === 0) {
            const err = new CustomError('UnrevokedLoginTokenError');
            if (callback) return callback(err);
            throw err;
        }

        if (callback) return callback(null);
    }
    catch (err) {
        if (callback) return callback(err);
        throw err;
    }
}

/**
 * Đăng ký
 * @param {String} email Email
 * @param {String} phone Số điện thoại
 * @param {String} fullName Họ tên người dùng
 * @param {String} password Mật khẩu
 * @param {function(Error?, User?)} callback 
 */
const signup = async (email, phone, fullName, password, callback) => {
    try {
        const user = await userSv.create({ email, phone, password, fullName, role: 'user' });
        if (callback) return callback(null, user);
        return user;
    }
    catch (err) {
        if (callback) return callback(err, null)
        throw err;
    }
}

/**
 * Đổi mật khẩu
 * @param {String} userId Mã người dùng
 * @param {String} oldPassword Mật khẩu cũ
 * @param {String} newPassword Mật khẩu mới
 * @param {function(Error?)} callback 
 */
const changePassword = async (userId, oldPassword, newPassword, callback) => {
    try {
        // Xác thực mật khẩu cũ
        const verification = await passwordSv.verify(userId, oldPassword);

        if (!verification) {
            const err = new CustomError('IncorrectPasswordError');
            if (callback) return callback(err);
            throw err;
        }

        // Khởi tạo mật khẩu mới
        await passwordSv.generate(userId, newPassword);
        if (callback) return callback(null);
    }
    catch (err) {
        if (callback) return callback(err);
        throw err;
    }
}

export default {
    login,
    logout,
    signup,
    changePassword
}