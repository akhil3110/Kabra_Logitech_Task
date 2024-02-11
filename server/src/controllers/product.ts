import { Response,Request } from "express";
import { Product } from "../models/products.js";
import multer from "multer";
import path from "path";


export const getProducts = async (
    req: Request,
     res: Response
) => {
    try {  
        const products = await Product.find()
        return res.send(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

interface PostProductsData{
    productName: string,
    productImage: any,
    description: string,
    quantity: number,
    unitPrice: number,
}

export const addProducts = async (
    req: Request<{}, {}, PostProductsData>,
     res: Response
) => {
    try {
        const {productName, description,productImage, quantity, unitPrice} = req.body;

        console.log(productImage);


        const product = await Product.create({
            productName,
            productImage,
            description,
            quantity,
            unitPrice
        });
        
        res.status(200).json({message: "Product added successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getParticularProduct = async (
    req: Request<{}, {}, {id: string}>,
    res: Response
) => {
    try {
        const {id} = req.query;

        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        return res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

interface CheckOutData{
    id: string;
    productName: string;
    productImage: string;
    description: string;
    quantity: number;
    unitPrice: number;
    orderQuantity: number;
}

interface RequestCheckOutData {
    cart: CheckOutData[]
}

export const CheckOut = async (
    req: Request<{}, {}, RequestCheckOutData>,
    res: Response
) => {
    try {
        
        const {cart} = req.body;

        cart.map(async (product: CheckOutData) => {
            const productData = await Product.findById(product.id);
            if(!productData){
                return res.status(404).json({message: "Product not found"});
            }
            if(productData.quantity < product.orderQuantity){
                return res.status(400).json({message: "Not enough stock"});
            }

            if(productData.quantity - product.orderQuantity < 0){
                return res.status(400).json({message: "Not enough stock"});
            }

            productData.quantity -= product.orderQuantity;
            await productData.save();
        })

        res.status(200).json({message: "Check out success"});
    } catch (error) {
        console.log("CHECK_OUT",error);
        res.status(500).json({message: "Internal server error"});
    }
}