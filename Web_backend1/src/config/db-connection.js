import mongoose from 'mongoose';

/** Kết nối cơ sở dữ liệu */
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.CONNECTION_STRING, {
            serverSelectionTimeoutMS: 20000, // Thời gian tối đa chọn một server để kết nối (ms)
            connectTimeoutMS: 60000,         // Thời gian tối đa thiết lập kết nối giữa ứng dụng và MongoDB (ms)
            socketTimeoutMS: 60000
            // Thời gian tối đa mà socket chờ đợi để tránh các kết nối "treo" khi không có giao tiếp trong một khoảng thời gian dài (ms)
        });
        console.log('\x1b[32m%s\x1b[0m', `[MongoDB] connected: ${con.connection.host}`);
    }
    catch (err) {
        console.error(err);
    }
}

export default connectDB;