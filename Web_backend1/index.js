import express from 'express';
import connectDB from './src/config/db-connection.js';
import cors from 'cors';
import initWebRouters from './src/route/web.js';
import 'dotenv/config';
import seeder from './src/seeders/index.js';

// Khởi tạo ứng dụng bằng express
let app = express();

// // Option1: Development
// Cho phép bất kỳ nguồn nào truy cập đến server
app.use(cors({ origin: '*' }));

// // Option2: Production
// const allowedOrigins = [];
// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) { callback(null, true); }
//         else { callback(new Error('Origin is not allowed!')); }
//     }
// }))

// Middleware để phân tích request body
app.use(express.json()); // Middleware để xử lý json từ client
app.use(express.urlencoded({ extended: true })); // Cấu hình xử lý dữ liệu từ form HTML

initWebRouters(app); // Khởi tạo router

connectDB(); // Kết nối cơ sở dữ liệu

// seeder.update(); // Dùng để refresh dữ liệu database

// Chạy server
app.listen(+process.env.PORT, () => {
    console.log('\x1b[1m\x1b[34m%s\x1b[0m', `Server is running on http://localhost:${process.env.PORT}`);
});