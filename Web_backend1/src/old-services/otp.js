import 'dotenv/config'
import CustomError from './custom-error';
import db from '../models';

/**
 * Tạo mã otp
 * @param {Number} length độ dài của otp
 * @returns {String}
 */
const generateOtp = (length) => {
    const digits = '0123456789';
    let otp = '';

    // Mỗi vòng lặp lựa chọn ngẫu nhiên ký tự trong chuỗi digits
    // sau đó thêm vào sau của chuỗi otp
    for (i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;
}

/**
 * Khởi tạo vòng đời của mã otp
 * @param {String} sendAddress địa chỉ nhận mã otp
 * @param {String} otpCode mã otp
 * @param {function(Error?)?} callback (error)
 */
const generateOtpSession = async (sendAddress, otpCode, callback) => {
    try {
        // Kiểm tra với địa chỉ nhận mã otp có đang được sử dụng không
        const existingRecord = await db.OTP.findOne({
            where: { sendAddress: sendAddress }
        });

        if (existingRecord) {
            const err = new CustomError('ExistingOTPError');
            if (callback) { callback(err); return; }
            else throw err;
        }

        // Tạo bản ghi lưu mã otp
        const otpRecord = await db.OTP.create({
            sendAddress: sendAddress,
            otpCode: otpCode
        });

        // Sau khoảng thời gian tự động xoá mã otp
        setTimeout(async () => {
            await otpRecord.destroy()
        }, +process.env.OTP_AGE);
    }
    catch (err) {
        if (callback) callback(err);
        else throw err;
    }
}

/**
 * Xác thực mã otp
 * @param {String} sendAddress địa chỉ nhận mã otp
 * @param {String} otpCode mã otp
 * @param {function(Error)} callback (error) 
 */
const verifyOtp = async (sendAddress, otpCode, callback) => {
    // Tìm bản ghi đúng với địa chỉ nhận otp và mã otp
    const otpRecord = await db.OTP.findOne({
        where: {
            sendAddress: sendAddress,
            otpCode: otpCode
        }
    }).catch(err => { callback(err); return; });

    if (otpRecord) {
        await otpRecord.destroy()
            .catch(err => console.error(err));
        callback(null);
    }
    else {
        callback(new CustomError('InvalidOTPError'));
    }
}

export default {
    generateOtp,
    generateOtpSession,
    verifyOtp
}