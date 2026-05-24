import productImageServices from '../services/product-image.js';

/** Tạo sản phẩm */
const create = async (req, res) => {
    const { productId, order, altText } = req.body;
    const { file } = req;

    productImageServices.upsert(null, { productId, buffer: file.buffer, mimetype: file.mimetype, order, altText }, (err, images) => {
        if (err) return res.status(500).json({ message: 'Can not save images' });
        return res.status(200).json({ createdCount: images.length, message: 'Ok' });
    });
}

/** Tìm hình ảnh sản phẩm */
const find = async (req, res) => {
    const { productId, order } = req.query;

    productImageServices.find(productId, order, (err, images) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ images: images, message: 'Ok' });
    });
}

/** Cập nhật hình ản sản phẩm */
const update = async (req, res) => {
    const { _id, altText } = req.body;
    const { file } = req;

    const attributes = {
        ...(altText && { altText }),
        ...(file && { buffer: file.buffer, mimetype: file.mimetype })
    };

    productImageServices.upsert(_id, attributes, (err, image) => {
        if (err) return res.status(500).json({ message: 'Can not update image' });
        return res.status(200).json({ updated: image, message: 'Ok' });
    });
}

/** Xoá hình ảnh */
const destroy = async (req, res) => {
    const { _ids } = req.body;

    productImageServices.destroy(_ids, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ result: result });
    });
}

export default {
    create,
    find,
    update,
    destroy
}