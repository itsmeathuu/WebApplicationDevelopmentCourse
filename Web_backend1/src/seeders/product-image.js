import mongoose from "mongoose";
import { ProductImage } from "../models.js";
import { promises as fs } from 'fs';
import path from 'path';

const imagesPath = 'C:/Users/tranh/Downloads/product-images';

const up = async () => {
    const data = [
        {
            productId: '672cf21818c76bacb3ae7440',
            buffer: await fs.readFile(path.join(imagesPath, '1-1.png')),
            mimetype: 'image/png',
            order: 1,
            altText: null
        },
        {
            productId: '672cf21818c76bacb3ae7440',
            buffer: await fs.readFile(path.join(imagesPath, '1-2.png')),
            mimetype: 'image/png',
            order: 2,
            altText: null
        },
        {
            productId: '672cf21818c76bacb3ae7440',
            buffer: await fs.readFile(path.join(imagesPath, '1-3.png')),
            mimetype: 'image/png',
            order: 3,
            altText: null
        },
        {
            productId: '672cf21818c76bacb3ae7440',
            buffer: await fs.readFile(path.join(imagesPath, '1-4.png')),
            mimetype: 'image/png',
            order: 4,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e4',
            buffer: await fs.readFile(path.join(imagesPath, '2-1.png')),
            mimetype: 'image/png',
            order: 1,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e4',
            buffer: await fs.readFile(path.join(imagesPath, '2-2.png')),
            mimetype: 'image/png',
            order: 2,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e4',
            buffer: await fs.readFile(path.join(imagesPath, '2-3.png')),
            mimetype: 'image/png',
            order: 3,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e5',
            buffer: await fs.readFile(path.join(imagesPath, '3-1.png')),
            mimetype: 'image/png',
            order: 1,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e5',
            buffer: await fs.readFile(path.join(imagesPath, '3-2.png')),
            mimetype: 'image/png',
            order: 2,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e5',
            buffer: await fs.readFile(path.join(imagesPath, '3-3.png')),
            mimetype: 'image/png',
            order: 3,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e5',
            buffer: await fs.readFile(path.join(imagesPath, '3-4.png')),
            mimetype: 'image/png',
            order: 4,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e5',
            buffer: await fs.readFile(path.join(imagesPath, '3-5.png')),
            mimetype: 'image/png',
            order: 5,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e5',
            buffer: await fs.readFile(path.join(imagesPath, '3-6.png')),
            mimetype: 'image/png',
            order: 6,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e5',
            buffer: await fs.readFile(path.join(imagesPath, '3-7.png')),
            mimetype: 'image/png',
            order: 7,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e6',
            buffer: await fs.readFile(path.join(imagesPath, '4-1.png')),
            mimetype: 'image/png',
            order: 1,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e6',
            buffer: await fs.readFile(path.join(imagesPath, '4-2.png')),
            mimetype: 'image/png',
            order: 2,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e6',
            buffer: await fs.readFile(path.join(imagesPath, '4-3.png')),
            mimetype: 'image/png',
            order: 3,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e6',
            buffer: await fs.readFile(path.join(imagesPath, '4-4.png')),
            mimetype: 'image/png',
            order: 4,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e6',
            buffer: await fs.readFile(path.join(imagesPath, '4-5.png')),
            mimetype: 'image/png',
            order: 5,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e6',
            buffer: await fs.readFile(path.join(imagesPath, '4-6.png')),
            mimetype: 'image/png',
            order: 6,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e7',
            buffer: await fs.readFile(path.join(imagesPath, '5-1.png')),
            mimetype: 'image/png',
            order: 1,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e7',
            buffer: await fs.readFile(path.join(imagesPath, '5-2.png')),
            mimetype: 'image/png',
            order: 2,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e7',
            buffer: await fs.readFile(path.join(imagesPath, '5-3.png')),
            mimetype: 'image/png',
            order: 3,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e7',
            buffer: await fs.readFile(path.join(imagesPath, '5-4.png')),
            mimetype: 'image/png',
            order: 4,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e7',
            buffer: await fs.readFile(path.join(imagesPath, '5-5.png')),
            mimetype: 'image/png',
            order: 5,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e7',
            buffer: await fs.readFile(path.join(imagesPath, '5-6.png')),
            mimetype: 'image/png',
            order: 6,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e8',
            buffer: await fs.readFile(path.join(imagesPath, '6-1.png')),
            mimetype: 'image/png',
            order: 1,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e8',
            buffer: await fs.readFile(path.join(imagesPath, '6-2.png')),
            mimetype: 'image/png',
            order: 2,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e8',
            buffer: await fs.readFile(path.join(imagesPath, '6-3.png')),
            mimetype: 'image/png',
            order: 3,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e8',
            buffer: await fs.readFile(path.join(imagesPath, '6-4.png')),
            mimetype: 'image/png',
            order: 4,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e9',
            buffer: await fs.readFile(path.join(imagesPath, '7-1.png')),
            mimetype: 'image/png',
            order: 1,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8e9',
            buffer: await fs.readFile(path.join(imagesPath, '7-2.png')),
            mimetype: 'image/png',
            order: 2,
            altText: null
        },
        {
            productId: '672cf37d408d47bba322d8ea',
            buffer: await fs.readFile(path.join(imagesPath, '8-1.png')),
            mimetype: 'image/png',
            order: 1,
            altText: null
        },
        
    ]
    await ProductImage.create(data);
}

const down = async () => {
    await mongoose.connection.collection('ProductImage').drop();
}

const update = async () => {
    await down();
    await up();
}

export default { up, down, update };