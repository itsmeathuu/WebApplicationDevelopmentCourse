import mysql from "mysql2"
import "dotenv/config"

/** 
* Tạo bể kết nối đến database
* Các thông tin kết nối:
* @param {string} host: tên của máy chủ
* @param {string} user: tên người dùng
* @param {string} database: tên của database
* @param {string} password: mật khẩu
*/
const pool = mysql.createPool({
    host: process.env.DB_CONNECTION_HOST,
    user: process.env.DB_CONNECTION_USER,
    database: process.env.DB_CONNECTION_DATABASE_NAME,
    password: process.env.DB_CONNECTION_PASSWORD
})

export default pool;