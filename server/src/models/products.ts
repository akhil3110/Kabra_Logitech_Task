import mongoose from 'mongoose';

interface IProduct extends Document{
    productName: string,
    productImage: string,
    description: string,
    quantity: number,
    unitPrice: number,
    createdAt: Date,
    updatedAt: Date
}

const schema  = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
    },
    productImage:{
        type: String,
        required: [true, 'Product image is required']
    },
    description:{
        type: String,
        required: [true, 'Product description is required']
    },
    quantity:{
        type: Number,
        required: [true, 'Product quantity is required']
    },
    unitPrice:{
        type: Number,
        required: [true, 'Product unit price is required']
    },
},{timestamps: true})

export const Product = mongoose.model<IProduct>('Product', schema);