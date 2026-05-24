import authSv from '../services/auth.js';
import passwordSv from '../services/password.js';
import tokenSv from '../services/token.js';
import userSv from '../services/user.js';
import CustomError from '../services/custom-error.js';

/**
 * Đăng nhập
 *
 * @param {Object} req Request từ client
 * @param {{
 * email: String,
 * phone: String,
 * password: String }} req.body Body của request
 *
 * @param {Object} res Response đến client
 * @param {{
 * accessToken: String,
 * refreshToken: String }} res.body Body của response
 */
const login = async (req, res) => {
    const { email, phone, password } = req.body;

    if (!email && !phone) return res.status(400).json({ message: 'Missing `email` or `phone`' });
    if (!password) return res.status(400).json({ message: 'Missing password' });

    authSv.login({ email, phone }, password, (err, tokenPair) => {
        if (err) {
            if (err instanceof CustomError && err.name === 'UserNotFoundError')
                return res.status(404).json({ message: `Not existing ${email ? '`email`' : '`phone`'}` });

            if (err instanceof CustomError && err.name === 'IncorrectPasswordError')
                return res.status(401).json({ message: 'Incorrect `password`' });

            return res.status(500).json({ message: 'Server error' });
        }
        return res.status(200).json({ ...tokenPair });
    });
}

/**
 * Đăng xuất
 *
 * @param {Object} req Request từ client
 * @param {{
 * ['x-refresh-token']: String }} req.headers Header của request
 */
const logout = async (req, res) => {
    const refreshToken = req.headers['x-refresh-token'];

    if (!refreshToken) return res.status(400).json({ message: 'Missing `x-refresh-token` in header' });

    authSv.logout(refreshToken, (err) => {
        if (err) {
            if (err instanceof CustomError && err.name === 'UnrevokedLoginTokenError')
                return res.status(400).json({ message: 'The refresh token is unavailable due to the invalid `x-refresh-token` in header' });

            return res.status(500).json({ message: 'Server error' });
        }
        return res.status(200).json({ message: 'Ok' });
    });
}

/**
 * Đăng ký
 *
 * @param {Object} req Request từ client
 * @param {{
 * email: String,
 * phone: String,
 * fullName: String,
 * password: String}} req.body Body của request
 *
 * @param {Object} res Response đến client
 * @param {{created: User}} res.body Body của response
 */
const signup = async (req, res) => {
    const { email, phone, fullName, password } = req.body;

    if (!(await userSv.validateEmail(email))) return res.status(400).json({ message: 'Missing or invalid `email`' });
    if (phone && !(await userSv.validatePhone(phone))) return res.status(400).json({ message: 'Invalid `phone`' });
    if (!passwordSv.isValid(password)) return res.status(400).json({ message: 'Missing or invalid `password`' });

    authSv.signup(email, phone, fullName, password, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        return res.status(200).json({ created: user })
    });
}

/**
 * Đổi mật khẩu
 *
 * @param {Object} req Request từ client
 * @param {{
 * oldPassword: String,
 * newPassword: String}} req.body Body của request
 */
const changePassword = async (req, res) => {
    const userId = req.tokenPayload._id;
    const { oldPassword, newPassword } = req.body;

    if (!passwordSv.isValid(newPassword)) return res.status(400).json({ message: 'Missing or invalid `newPassword`' });

    authSv.changePassword(userId, oldPassword, newPassword, (err) => {
        if (err) {
            if (err instanceof CustomError && err.name === 'IncorrectPasswordError')
                return res.status(401).json({ message: 'Incorrect `oldPassword`' });

            return res.status(500).json({ message: 'Server error' });
        }
        return res.status(200).json({ message: 'Ok' });
    });
}

/**
 * Đổi access token bằng refresh token
 *
 * @param {Object} req Request từ client
 * @param {{
 * ['x-refresh-token']: String }} req.headers Header của request
 *
 * @param {Object} res Response đến client
 * @param {{accessToken: String}} res.body Thân của response
 */
const refreshAccessToken = async (req, res) => {
    const refreshToken = req.headers['x-refresh-token'];

    if (!refreshToken) return res.status(400).json({ message: 'Missing `x-refresh-token` in header' });

    tokenSv.refreshAccessToken(refreshToken, (err, accessToken) => {
        if (err) {
            if (err instanceof CustomError && err.name === 'TokenNotFoundError')
                return res.status(400).json({ message: 'Invalid refresh token' });

            return res.status(500).json({ message: 'Server error' });
        }
        return res.status(200).json({ accessToken });
    });
}

export default {
    login,
    logout,
    signup,
    changePassword,
    refreshAccessToken
}