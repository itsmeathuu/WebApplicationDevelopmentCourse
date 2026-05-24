import bcrypt from 'bcryptjs';
import CustomError from './custom-error.js';
import { User } from '../models.js';
import mongoose from 'mongoose';
import validator from 'validator';

/** Xác thực tính hợp lệ của email */
const validateEmail = async (email, callback) => {
    try {
        let err;
        if (!validator.isEmail(email))
            err = new CustomError('InvalidEmailError');

        const count = await User.countDocuments({ email });
        if (count > 0) err = new CustomError('ExistingEmailError');

        if (callback) return callback(err);
        return err === undefined;
    }
    catch (err) {
        if (callback) return callback(err);
        throw err;
    }
}

/** Tính hợp lệ của số điện thoại */
const validatePhone = async (phone, callback) => {
    try {
        let err;
        if (!validator.isMobilePhone(phone, 'any'))
            err = new CustomError('InvalidPhoneError');

        const count = await User.countDocuments({ phone });
        if (count > 0) err = new CustomError('ExistingPhoneError');

        if (callback) return callback(err);
        return err === undefined;
    }
    catch (err) {
        if (callback) return callback(err);
        throw err;
    }
}

/** Tạo người dùng */
const create = async (attributes, callback, session) => {
    try {
        attributes.password = await bcrypt.hash(attributes.password, +process.env.SALT_LENGTH);
        let user = new User(attributes);
        await user.save({ ...(session && { session }) });

        user = user.toObject();
        user._id = user._id.toString();
        delete user.password;
        delete user.__v;

        if (callback) return callback(null, user);
        return user;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/** Cập nhật thông tin người dùng */
const update = async (_id, attributes, callback, session) => {
    try {
        const { password } = attributes;
        if (password) attributes.password = await bcrypt.hash(password, +process.env.SALT_LENGTH);
        const user = await User.findOneAndUpdate(
            { _id: _id },
            { $set: attributes },
            { new: true, ...(session && { session }) }
        ).select('-__v -password');
        user._id = user._id.toString();

        if (callback) return callback(null, user);
        return user;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/** Tìm người dùng bằng mã */
const findOne = async (_id, exclude, callback) => {
    try {
        const user = (await findAll({ _id: _id }, null, exclude))[0];
        if (callback) return callback(null, user);
        return user;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/** Tìm tất cả người dùng */
const findAll = async (criteria, order, exclude, page = 1, limit = 10, callback) => {
    try {
        const { keyword, _id, email, phone, fullName, role } = criteria || {};
        const query = User.find({
            ...(_id && { _id: Array.isArray(_id) ? { $regex: _id[0], $options: _id.length > 1 ? _id[1] : 'i' } : new mongoose.Types.ObjectId(_id) }),
            ...(email && { email: Array.isArray(email) ? { $regex: email[0], $options: email.length > 1 ? email[1] : 'i' } : email }),
            ...(phone && { phone: Array.isArray(phone) ? { $regex: phone[0], $options: phone.length > 1 ? phone[1] : 'i' } : phone }),
            ...(fullName && { fullName: Array.isArray(fullName) ? { $regex: fullName[0], $options: fullName.length > 1 ? fullName[1] : 'i' } : fullName }),
            ...(role && { role: Array.isArray(role) ? { $regex: role[0], $options: role.length > 1 ? role[1] : 'i' } : role }),

            ...(keyword && {
                $text: {
                    $search: keyword,
                    $caseSensitive: false,
                    $diacriticSensitive: false
                }
            })
        })
            .sort(order || { _id: 1 })
            .skip((page - 1) * limit)
            .limit(+limit);

        if (Array.isArray(exclude) && exclude.length > 0) {
            query.select(`-${exclude.join(' -')}`);
        }
        else if (exclude) {
            query.select(`-${exclude}`);
        }
        query.select('-password -__v');

        const users = await query;
        if (callback) return callback(null, users);
        return users;
    }
    catch (err) {
        if (callback) callback(err, null);
        throw err;
    }
}

/** Xoá người dùng */
const destroy = async (ids, callback, session) => {
    try {
        const _ids = Array.isArray(ids) ? ids.map(id => new mongoose.Types.ObjectId(id)) : new mongoose.Types.ObjectId(ids);
        const result = await User.deleteMany({ _id: { $in: _ids } }, { ...(session && { session }) });
        if (callback) return callback(null, result);
        else return result;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

export default {
    validateEmail,
    validatePhone,
    create,
    findOne,
    findAll,
    update,
    destroy
}