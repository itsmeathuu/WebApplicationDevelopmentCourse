import tokenSv from '../services/token.js';

/** Danh sách quyền truy cập của các vai trò */
const userRoles = {
    admin: ['admin'],
    user: ['user'],
    owner: ['admin', 'owner'],
    registered: ['admin', 'user', 'owner', 'registered']
}

/**
 * Middleware kiểm tra phân quyền của người dùng từ access token.
 * Token cần được gửi từ client qua header 'Authorization' theo định dạng:
 * `Authorization: Bearer <access_token>`
 * 
 *  - Nếu token hợp lệ, middleware sẽ giải mã token và gán thông tin người dùng vào `req.tokenPayload`.
 *  - Nếu token không hợp lệ trả về lỗi 401 (Unauthorized).
 *  - Nếu token không có quyền truy cập trả về lỗi 403 (Access denied).
 */
const checkRole = (role) => async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader?.split(' ')[1];

    if (!accessToken) return res.status(400).json({ message: 'Missing access token, send access token as "Bearer <access_token>" in the `authorization` header' });

    // Xác thực token
    tokenSv.verify({ accessToken: accessToken }, (err, decode) => {
        if (err || !decode) return res.status(401).json({ message: 'Unauthorized' });

        if (!userRoles[role]?.includes(decode.role))
            return res.status(403).json({ message: 'Access denied' });

        // Lưu giải mã của token cho req để sử dụng cho các middleware tiếp theo
        req.tokenPayload = decode;

        next();
    });
}

export default {
    checkUser: checkRole('user'),
    checkAdmin: checkRole('admin'),
    checkOwner: checkRole('owner'),
    checkRegistered: checkRole('registered'),
    userRoles: userRoles
}