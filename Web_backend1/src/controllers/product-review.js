import productReviewSv from '../services/product-review.js';

/** Tạo đánh giá sản phẩm */
const create = async (req, res) => {
    const userId = req.tokenPayload._id;
    const { attributes } = req.body;

    productReviewSv.create(attributes, (err, cart) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ created: cart, message: 'Ok' })
    });
}

/** Tìm các đánh giá sản phẩm */
const findAll = async (req, res) => {
    const { filter, order, page, limit } = req.query;

    const criteria = filter && JSON.parse(filter);

    productReviewSv.findAll(criteria, order, page, limit, (err, carts) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ carts: carts, message: 'Ok' });
    });
}

/** Cập nhật sản phẩm */
const update = async (req, res) => {
    const userId = req.tokenPayload._id;
    const { _id, quantity } = req.body;

    try {
        const updated = await Cart.updateOne(
            { _id: _id, userId: userId },
            { quantity }
        );
        return res.status(200).json({ updated: updated, messsage: 'Ok' })
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

/** Xoá sản phẩm */
const destroy = async (req, res) => {
    const { _ids } = req.body;
    const { userId: _id, role } = req.tokenPayload;

    const targetUserId = role !== 'admin' && role !== 'owner' && userId;

    productReviewSv.destroy(_ids, targetUserId, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ result: result, message: 'Ok' });
    });
}

export default {
    create,
    findAll,
    update,
    destroy
}