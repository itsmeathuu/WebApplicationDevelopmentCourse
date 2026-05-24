import { SoldProduct } from "../models.js";
import mongoose from "mongoose";

const up = async () => {
    const data = [
        {
            productId: '672cf37d408d47bba322d8e6',
            userId: '672d0521d53c3cc9ba4d568e',
            price: 3275000,
            quantity: 4,
            saleDate: new Date(2024, 9, 10, 0, 0, 0)
        },
        {
            productId: '672cf37d408d47bba322d8ea',
            userId: '672d0521d53c3cc9ba4d568e',
            price: 399000,
            quantity: 4,
            saleDate: new Date(new Date(2024, 9, 10, 0, 0, 0).getTime() + 15 * 24 * 60 * 60 * 1000)
        },
        {
            productId: '672cf37d408d47bba322d8e7',
            userId: '672d0521d53c3cc9ba4d568d',
            price: 659000,
            quantity: 5,
            saleDate: new Date(new Date(2024, 9, 10, 0, 0, 0).getTime() + 30 * 24 * 60 * 60 * 1000)
        },
        {
            productId: '672cf37d408d47bba322d8ec',
            userId: '672d0521d53c3cc9ba4d568d',
            price: 834000,
            quantity: 5,
            saleDate: new Date(new Date(2024, 9, 10, 0, 0, 0).getTime() + 45 * 24 * 60 * 60 * 1000)
        },
        {
            productId: '672cf37d408d47bba322d8e8',
            userId: '672d0521d53c3cc9ba4d568f',
            price: 439000,
            quantity: 4,
            saleDate: new Date(new Date(2024, 9, 10, 0, 0, 0).getTime() + 60 * 24 * 60 * 60 * 1000)
        },
        {
            productId: '672cf37d408d47bba322d8ee',
            userId: '672d0521d53c3cc9ba4d568f',
            price: 3018000,
            quantity: 4,
            saleDate: new Date(new Date(2024, 9, 10, 0, 0, 0).getTime() + 75 * 24 * 60 * 60 * 1000)
        },
        {
            productId: '672cf37d408d47bba322d8e9',
            userId: '672d0521d53c3cc9ba4d5691',
            price: 329000,
            quantity: 5,
            saleDate: new Date(new Date(2024, 9, 10, 0, 0, 0).getTime() + 100 * 24 * 60 * 60 * 1000)
        },
        {
            productId: '672cf37d408d47bba322d8f0',
            userId: '672d0521d53c3cc9ba4d5691',
            price: 1279000,
            quantity: 5,
            saleDate: new Date(new Date(2024, 9, 10, 0, 0, 0).getTime() + 125 * 24 * 60 * 60 * 1000)
        }
    ]

    await SoldProduct.create(data);
}

const down = async () => {
    await mongoose.connection.collection('SoldProduct').drop();
}

const update = async () => {
    await down();
    await up();
}

export default { up, down, update };