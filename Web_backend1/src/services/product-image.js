import { ProductImage } from "../models.js";
import mongoose from 'mongoose';

/**
 * Thêm hình ảnh sản phẩm
 */
const create = async (attributes, callback, session) => {
    try {
        let image = new ProductImage(attributes);
        await image.save({ ...(session && { session }) });

        image = image.toObject();
        image._id = image._id.toString();
        delete image.__v;

        if (callback) return callback(null, image);
        return image;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/** Tìm hình ảnh sản phẩm */
const find = async (productId, order, callback) => {
    try {
        const images = await ProductImage.find({
            productId: productId,
            ...(order && { order: order })
        }).sort({ order: 1 });

        if (callback) return callback(null, images);
        return images;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/** Cập nhật hình ảnh sản phẩm */
const update = async (_id, attributes, callback, session) => {
    try {
        const image = await ProductImage.findOneAndUpdate(
            { _id: _id },
            { $set: attributes },
            { new: true, ...(session && { session }) }
        ).select('-__v');

        if (callback) return callback(null, image);
        return image;
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/** Upsert hình ảnh sản phẩm (tạo mới hoặc cập nhật) */
const upsert = async (_id, attributes, callback, session) => {
    try {
        if (_id) {
            // Cập nhật hình ảnh hiện có
            const image = await update(_id, attributes, null, session);
            if (callback) return callback(null, [image]);
            return [image];
        } else {
            // Tạo hình ảnh mới
            const image = await create(attributes, null, session);
            if (callback) return callback(null, [image]);
            return [image];
        }
    }
    catch (err) {
        if (callback) return callback(err, null);
        throw err;
    }
}

/** Xoá hình ảnh sản phẩm */
const destroy = async (ids, callback, session) => {
    try {
        const _ids = Array.isArray(ids) ? ids.map(id => new mongoose.Types.ObjectId(id)) : new mongoose.Types.ObjectId(ids);
        const result = await ProductImage.deleteMany({ _id: { $in: _ids } }, { ...(session && { session }) });
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
    update,
    upsert,
    destroy
}