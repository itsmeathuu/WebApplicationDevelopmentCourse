import bcrypt from 'bcryptjs';
import { User } from "../models.js";
import mongoose from "mongoose";
import 'dotenv/config';

const up = async () => {
    const data = [
        {
            _id: new mongoose.Types.ObjectId('672d0521d53c3cc9ba4d568c'),
            email: 'owner@example.com',
            phone: '9999999999',
            password: await bcrypt.hash('user123', +process.env.SALT_LENGTH),
            fullName: 'Chủ sở hữu',
            role: 'owner'
        },
        {
            _id: new mongoose.Types.ObjectId('672d0521d53c3cc9ba4d5692'),
            email: 'admin1@example.com',
            phone: '8383838383',
            password: await bcrypt.hash('user123', +process.env.SALT_LENGTH),
            fullName: 'Quản trị viên 1',
            role: 'admin'
        },
        {
            _id: new mongoose.Types.ObjectId('672d0521d53c3cc9ba4d5690'),
            email: 'admin2@example.com',
            phone: '8686868686',
            password: await bcrypt.hash('user123', +process.env.SALT_LENGTH),
            fullName: 'Quản trị viên 2',
            role: 'admin'
        },
        {
            _id: new mongoose.Types.ObjectId('672d0521d53c3cc9ba4d568e'),
            email: 'duong@example.com',
            phone: '7979797979',
            password: await bcrypt.hash('user123', +process.env.SALT_LENGTH),
            fullName: 'Trần Hải Dương',
            role: 'user'
        },
        {
            _id: new mongoose.Types.ObjectId('672d0521d53c3cc9ba4d568d'),
            email: 'tu@example.com',
            phone: '3939393939',
            password: await bcrypt.hash('user123', +process.env.SALT_LENGTH),
            fullName: 'Nguyễn Văn Tú',
            role: 'user'
        },
        {
            _id: new mongoose.Types.ObjectId('672d0521d53c3cc9ba4d568f'),
            email: 'nhan@example.com',
            phone: '7878787878',
            password: await bcrypt.hash('user123', +process.env.SALT_LENGTH),
            fullName: 'Mai Xuân Nhân',
            role: 'user'
        },
        {
            _id: new mongoose.Types.ObjectId('672d0521d53c3cc9ba4d5691'),
            email: 'huy@example.com',
            phone: '3838383838',
            password: await bcrypt.hash('user123', +process.env.SALT_LENGTH),
            fullName: 'Nguyễn Hoàng Huy',
            role: 'user'
        }
    ]

    await User.create(data);
}

const down = async () => {
    await mongoose.connection.collection('User').drop();
}

const update = async () => {
    await down();
    await up();
}

export default { up, down, update };