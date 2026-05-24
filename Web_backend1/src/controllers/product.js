import productServices from '../services/product.js';

/** Tạo sản phẩm */
const create = async (req, res) => {
    const { attributes } = req.body;

    productServices.create(attributes, (err, product) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ created: product });
    });
}

/** Tìm một sản phẩm bằng mã sản phẩm */
const findOne = async (req, res) => {
    const { _id } = req.query;
    const { role } = req.tokenPayload || { role: 'any' };

    console.log('Finding product with ID:', _id, 'Role:', role);

    const exclude = (role !== 'owner' && role !== 'admin') && 'revenue';

    productServices.findOne(_id, exclude, (err, product) => {
        if (err) {
            console.error('Product findOne error:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        console.log('Product found:', product ? 'Yes' : 'No');
        return res.status(200).json({ product })
    });
}

/** Tìm tất cả sản phẩm theo điều kiện */
const findAll = async (req, res) => {
    const { filter, order, page, limit } = req.query;
    const { role } = req.tokenPayload || { role: 'any' };

    const criteria = filter && JSON.parse(filter);

    const exclude = (role !== 'owner' && role !== 'admin') && 'revenue';

    productServices.findAll(criteria, order, exclude, page, limit, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json(result)
    });
}

/** Cập nhật sản phẩm */
const update = async (req, res) => {
    const { _id, attributes } = req.body;

    if (!_id) return res.status(400).json({ message: 'Missing _id' });

    productServices.update(_id, attributes, (err, updated) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ message: 'Ok' });
    });
}

/** Xoá sản phẩm */
const destroy = async (req, res) => {
    const { _ids } = req.body;

    productServices.destroy(_ids, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ result: result });
    });
}

export default {
    create: create,
    findAll: findAll,
    findOne: findOne,
    update: update,
    destroy: destroy
}
