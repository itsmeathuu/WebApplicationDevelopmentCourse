import { ProductReview } from "../models.js";
import mongoose from "mongoose";

const up = async () => {
    // const data = [
    //     {
    //         productId: ,
    //         userId: ,
    //         rating: ,
    //         comment: ,
    //         reviewDate: ,
    //     },
    // ]

    // await ProductReview.create(data);
}

const down = async () => {
    await mongoose.connection.collection('ProductReview').drop();
}

const update = async () => {
    await down();
    await up();
}

export default { up, down, update };