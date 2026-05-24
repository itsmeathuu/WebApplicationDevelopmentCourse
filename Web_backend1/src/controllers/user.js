import userSv from '../services/user.js';
import passport from '../middlewares/passport.js';

/** Tìm một người dùng */
const findOne = async (req, res) => {
    const userId = req.tokenPayload._id;
    const role = req.tokenPayload.role;
    const { _id } = req.query;

    const targetId = (role === 'admin' || role === 'owner') ? (_id || userId) : userId;

    userSv.findOne(targetId, null, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (user.role === 'owner' && role === 'admin' || user.role === 'admin' && user.id != userId)
            return res.status(401).json({ message: 'Access denied' });

        return res.status(200).json({ user });
    });
}

/** Tìm tất cả người dùng */
const findAll = (req, res) => {
    const { filter, page, limit, order } = req.query;
    const conditions = filter && JSON.parse(filter);

    userSv.findAll(conditions, order, null, page, limit, (err, users) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ users })
    });
}

/** Cập nhật thông tin người dùng (admin) */
const update = async (req, res) => {
    const { _id, attributes } = req.body;
    // const userId = req.tokenPayload._id;
    // const { role } = req.tokenPayload;
    const { email, phone } = attributes;

    delete attributes.password;
    delete attributes.role;

    if (email && await userSv.validateEmail(email)) return res.status(400).json({ message: 'Invalid email' });
    if (phone && await userSv.validatePhone(phone)) return res.status(400).json({ message: 'Invalid phone' });

    userSv.update(_id, attributes, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ updated: user })
    });
}

/** Cập nhật thông tin cá nhân (user) */
const updateProfile = async (req, res) => {
    const userId = req.tokenPayload._id;
    const { attributes } = req.body;
    const { email, phone } = attributes;

    // Không cho phép thay đổi password và role qua route này
    delete attributes.password;
    delete attributes.role;

    if (email && await userSv.validateEmail(email)) return res.status(400).json({ message: 'Invalid email' });
    if (phone && await userSv.validatePhone(phone)) return res.status(400).json({ message: 'Invalid phone' });

    userSv.update(userId, attributes, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ updated: user })
    });
}

/** Xoá người dùng */
const destroy = async (req, res) => {
    const { ids } = req.body;

    userSv.destroy(ids, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ result: result });
    });
}

const changeRole = async (req, res) => {
    const { id, role } = req.body;

    if (passport.userRoles[role] === undefined || role === 'registered')
        return res.status(400).json({ message: 'Invalid role' });

    userSv.upsert(id, { role }, (err, updated) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ message: 'Ok' });
    });
}

export default {
    findAll,
    findOne,
    update,
    updateProfile,
    destroy,
    changeRole
}
